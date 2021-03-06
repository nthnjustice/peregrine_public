import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';

import { useGlobalValue } from '../Global';

const useStyles = makeStyles({
  wrapper: {
    marginTop: '1rem'
  }
});

export default function Flights() {
  const styles = useStyles();
  const [{flights}] = useGlobalValue();
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    let element = document.querySelector('#table-wrapper div');

    if (element) {
      element.classList.remove('MuiPaper-elevation2');
    }
  });

  useEffect(() => {
    if (flights) {
      if (flights.features) {
        if (flights.features.length > 0) {
          let arr = []

          flights.features.map(feature => {
            arr.push(feature.properties);
          })

          setData(arr);

          let array = [];

          Object.keys(flights.features[0].properties).map(property => {
            let obj = {
              title: property,
              field: property
            }

            if (property != 'geometry' && property != 'linestring') {
              array.push(obj);
            }
          });
          console.log(array)
          setColumns(array)
        }
      }
    }
  }, []);

  return(
    <Grid container className={styles.wrapper}>
      <Grid item id="table-wrapper" xs={12}>
        <MaterialTable
          title=""
          data={data}
          columns={columns}
          options={{
            exportButton: true,
            exportFileName: 'flights'
          }}
        />
      </Grid>
    </Grid>
  )
}