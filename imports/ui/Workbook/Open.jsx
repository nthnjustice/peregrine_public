import React, { useState, useEffect, useReducer } from 'react';
import { Meteor } from 'meteor/meteor';
import { useSubscription, useTracker } from 'react-meteor-hooks';
import moment from 'moment-timezone';
import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useGlobalValue } from '../Global';
import Mapbox from '../Mapbox';

import { Workbooks } from '../../api/workbooks';

function formatDate(rowData) {
  return(
    <span>
      {rowData.fromEpoch} (UTC)
      <br></br>
      {moment.utc(rowData.fromEpoch).format('MMMM Do, YYYY hh:mm a')} (GMT)
    </span>
  );
}

function formatArray(array) {
  if (!Array.isArray(array)) {
    return array;
  } else {
    let text = '';

    array.map(elem => {
      text += `${elem}, `;
    });

    return text.substring(0, text.length - 2);
  }
}

const dbState = {
  ready: false,
  error: false
};

const dbReducer = (state, action) => {
  switch(action.type) {
    case 'updateError':
      return {...state, error: action.error};
    case 'updateReady':
      return {...state, ready: action.ready};
    default:
      return state;
  }
};

const useStyles = makeStyles({
  wrapper: {
    marginTop: '1rem'
  },
  loading: {
    marginTop: '2rem',
    marginBottom: '2rem'
  },
  progress: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem'
  },
  detailPanel: {
    padding: '1rem'
  },
  panelHeader: {
    marginRight: '1rem',
    fontWeight: 'bold',
    display: 'inline'
  },
  inline: {
    display: 'inline'
  },
  errorWrapper: {
    color: '#B71C1C',
    fontStyle: 'italic',
    marginTop: '2rem',
    marginBottom: '2rem'
  }
});

export default function Open(props) {
  const styles = useStyles();
  const [{airports}, globalDispatch] = useGlobalValue();
  const [selectModal, setSelectModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [airportsDb, setAirportsDb] = useReducer(dbReducer, dbState);
  const [flightsDb, setFlightsDb] = useReducer(dbReducer, dbState);
  const [pingsDb, setPingsDb] = useReducer(dbReducer, dbState);
  const [dataModal, setDataModal] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [dataError, setDataError] = useState(false);

  const loading = useSubscription('workbooks');
  const workbooks = useTracker(() => {
    return Workbooks.find({}, {sort: {'created': -1}}).fetch();
  });

  useEffect(() => {
    let element = document.querySelector('#table-wrapper div');

    if (element) {
      element.classList.remove('MuiPaper-elevation2');
    }
  });

  const handleRowClick = workbook => {
    setSelected(workbook);
    setSelectModal(true);
  };

  const handleClickConfirm = () => {
    setSelectModal(false);
    setDataModal(true);

    if (!airports) {
      Meteor.call('airports.fetch', (error, result) => {
        if (!error) {
          console.log(result)
          globalDispatch({type: 'updateAirports', airports: result});
        } else {
          setAirportsDb({type: 'updateError', error: true});
        }
      });
    }

    setAirportsDb({type: 'updateReady', ready: true}); 

    Meteor.call('flights.fetch', selected, (error, result) => {
      if (!error) {
        globalDispatch({type: 'updateFlights', flights: result});
        fetchPings(result);
      } else {
        setFlightsDb({type: 'updateError', error: true});
      }

      setFlightsDb({type: 'updateReady', ready: true});
    });
  };

  function fetchPings(flights) {
    Meteor.call('pings.fetch', flights, (error, result) => {
      if (!error) {
        globalDispatch({type: 'updatePings', pings: result});
      } else {
        setPingsDb({type: 'updateError', error: true});
      }

      setPingsDb({type: 'updateReady', ready: true});
    });
  }

  useEffect(() => {
    if (airportsDb.ready && flightsDb.ready && pingsDb.ready) {
      setDataReady(true);

      if (airportsDb.error || flightsDb.error || pingsDb.error) {
        setDataError(true);
      } else {
        globalDispatch({type: 'updateWorkbook', workbook: selected});
        setDataModal(false);
        props.onChangeTab(0);
      }
    }
  });

  return(
    <Grid container className={styles.wrapper} align="center">
      {loading &&
        <Grid item className={styles.loading} xs={12}>
          <div className={styles.progress}>
            <CircularProgress size={100}/>
          </div>
          <Typography variant="body1">... fetching workbooks</Typography>
        </Grid>
      }
      {!loading &&
        <Grid item id="table-wrapper" xs={12}>
          <MaterialTable
            title=""
            data={workbooks}
            columns={[
              {
                title:'Title',
                field: 'title'
              },
              {
                title: 'Author',
                field: 'author'
              },
              {
                title:'Details',
                field: 'details'
              },
              {
                title: 'From Date',
                field: 'fromDate',
                render: rowData => formatDate(rowData)      
              },
              {
                title: 'To Date',
                field: 'toDate',
                render: rowData => formatDate(rowData)
              },
              {
                title: 'Created',
                field: 'created',
                render: rowData => moment(rowData.created).local().format('YYYY-M-D hh:mm a') + ' (local)'
              }
            ]}
            editable={{
              onRowDelete: workbook => new Promise(resolve => {
                Meteor.call('workbooks.remove', workbook);
                resolve();
              })
            }}
            onRowClick={(event, rowData) => handleRowClick(rowData)}
            detailPanel={[
              {
                tooltip: 'Show Query Parameters',
                render: rowData => {
                  return(
                    <Grid container className={styles.detailPanel} spacing={1} justify="flex-start">
                      <Grid item xs={12}>
                        <Typography variant="body1" className={styles.panelHeader}>ICAO Watchlist:</Typography>
                        <Typography variant="body1" className={styles.inline}>
                          {formatArray(rowData.icaos)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body1" className={styles.panelHeader}>Areas of Interest:</Typography>
                        <Typography variant="body1" className={styles.inline}>
                          x{rowData.areas ? rowData.areas.features.length : 0}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body1" className={styles.panelHeader}>Sources:</Typography>
                        <Typography variant="body1" className={styles.inline}>
                          {formatArray(rowData.sources)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body1" className={styles.panelHeader}>Destinations:</Typography>
                        <Typography variant="body1" className={styles.inline}>
                          {formatArray(rowData.destinations)}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body1" className={styles.panelHeader}>Created:</Typography>
                        <Typography variant="body1" className={styles.inline}>
                          {moment(rowData.created).local().format('MMMM Do, YYYY hh:mm a')} (local)
                        </Typography>
                      </Grid>
                    </Grid>
                  )
                }
              },
              {
                icon: 'map',
                tooltip: 'Show Areas of Interest',
                render: rowData => {
                  if (rowData.areas) {
                    return(
                      <Grid container className={styles.detailPanel}>
                        <Grid item xs={12}>
                          <Mapbox
                            id={`map-${rowData.title}`}
                            container={{
                              height: 500,
                              width: '100%'
                            }}
                            basemap="satellite"
                            zoomControl
                            scaleControl
                            geojson={{
                              id: `${rowData.title}-areas_of_interest`,
                              type: 'fill',
                              source: {
                                type: 'geojson',
                                data: rowData.areas
                              },
                              paint: {
                                'fill-color': '#088',
                                'fill-opacity': 0.75
                              }
                            }}
                          />
                        </Grid>
                      </Grid>
                    )
                  }
                }
              }
            ]}
          />
        </Grid>
      }
      <Dialog
        open={selectModal}
        fullWidth
        onClose={() => setSelectModal(false)}
      >
        <DialogTitle>Open this workbook?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selected &&
              selected.title
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => setSelectModal(false)}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={handleClickConfirm}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={dataModal} fullWidth>
        <DialogContent>
          <Grid container justify="center" align="center">
            {!dataReady &&
              <Grid item className={styles.loading} xs={12}>
                <div className={styles.progress}>
                  <CircularProgress size={100}/>
                </div>
                <Typography variant="body1">... fetching data</Typography>
              </Grid>
            }
            {dataError &&
              <Grid item className={styles.errorWrapper} xs={12}>
                <Typography variant="h5">Error fetching data</Typography>
                <Button
                  className={styles.wrapper}
                  onClick={() => setDataModal(false)}
                >
                  Close
                </Button>
              </Grid>
            }
          </Grid>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}