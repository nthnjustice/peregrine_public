import React, { useEffect } from 'react';
import moment from 'moment-timezone';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MaterialTable from 'material-table';

import { useGlobalValue } from '../Global';
import Mapbox from '../Mapbox';

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

const useStyles = makeStyles({
  wrapper: {
    marginTop: '1rem'
  },
  emptyWrapper: {
    color: '#757575',
    fontStyle: 'italic',
    marginTop: '4rem',
    marginBottom: '3rem'
  },
  tableWrapper: {
    marginTop: '3rem',
    marginBottom: '3rem'
  },
  panelHeader: {
    marginRight: '1rem',
    fontWeight: 'bold',
    display: 'inline'
  },
  inline: {
    display: 'inline'
  }
});

export default function View() {
  const styles = useStyles();
  const [{workbook}] = useGlobalValue();

  useEffect(() => {
    let element = document.querySelector('#table-wrapper div');

    if (element) {
      element.classList.remove('MuiPaper-elevation2');
    }
  });

  return(
    <Grid container className={styles.wrapper} justify="center" align="center">
      {!workbook &&
        <Grid item xs={12}>
          <Typography className={styles.emptyWrapper} variant="h4">
            No Active Workbook
          </Typography>
        </Grid>
      }
      {workbook &&
        <Grid item id="table-wrapper" className={styles.tableWrapper} xs={12}>
          <MaterialTable
            title=""
            data={[workbook]}
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
            options={{
              paging: false,
              search: false,
              toolbar: false
            }}
          />
        </Grid>
      }
    </Grid>
  );
}