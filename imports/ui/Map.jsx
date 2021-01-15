import React, { useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import randomColor from 'randomcolor';
import mapboxgl from 'mapbox-gl';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { useGlobalValue } from './Global';
import Mapbox from './Mapbox';

function isMapValid(map) {
  if (!map) {
    return false;
  } else {
    return true;
  }
}

function isDataValid(data) {
  if (!data) {
    return false;
  } else if (!data.features) {
    return false;
  } else if (data.features.length == 0) {
    return false;
  } else {
    return true;
  }
}

function removeAirports(map) {
  if (isMapValid(map)) {
    if (map.getLayer('airport-markers')) {
      map.removeLayer('airport-markers');
    }

    if (map.getSource('airport-markers')) {
      map.removeSource('airport-markers');
    }

    if (map.getLayer('airport-clusters')) {
      map.removeLayer('airport-clusters');
    }

    if (map.getLayer('airport-clusters-markers')) {
      map.removeLayer('airport-clusters-markers');
    }

    if (map.getLayer('airport-clusters-text')) {
      map.removeLayer('airport-clusters-text');
    }

    if (map.getSource('airport-clusters')) {
      map.removeSource('airport-clusters');
    }
  }
}

function addAirportMarkers(map, data) {
  if (isMapValid(map) && isDataValid(data)) {
    removeAirports(map);

    map.addSource('airport-markers', {
      type: 'geojson',
      data
    });

    map.addLayer({
      id: 'airport-markers',
      type: 'circle',
      source: 'airport-markers',
      paint: {
        'circle-color': '#616161',
        'circle-stroke-width': 1,
        'circle-stroke-color': '#212121',
        'circle-opacity': 0.75,
        'circle-radius': 3
      }
    });

    addAirportPopups(map, 'airport-markers');
  }
}

function addAirportClusters(map, data) {
  if (isMapValid(data) && isDataValid(data)) {
    removeAirports(map);

    map.addSource('airport-clusters', {
      type: 'geojson',
      data,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50
    });

    map.addLayer({
      id: 'airport-clusters',
      type: 'circle',
      source: 'airport-clusters',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': '#616161',
        'circle-stroke-width': 1,
        'circle-stroke-color': '#212121',
        'circle-opacity': 0.75,
        'circle-radius': [
          'step', ['get', 'point_count'],
          15, 100,
          25, 200,
          35
        ]
      }
    });

    map.addLayer({
      id: 'airport-clusters-markers',
      type: 'circle',
      source: 'airport-clusters',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#616161',
        'circle-stroke-width': 1,
        'circle-stroke-color': '#212121',
        'circle-opacity': 0.75,
        'circle-radius': 3
      }
    });

    map.addLayer({
      id: 'airport-clusters-text',
      type: 'symbol',
      source: 'airport-clusters',
      filter: ['has', 'point_count'],
      paint: {
        'text-color': '#ffffff'
      },
      layout: {
        'text-field': '{point_count}',
        'text-size': [
          'step', ['get', 'point_count'],
          12, 100,
          14, 200,
          16
        ]
      }
    });

    addAirportPopups(map, 'airport-clusters-markers');
  }
}

function addAirportPopups(map, id) {
  let popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });
        
  map.on('mouseenter', id, event => {
    let description = event.features[0].properties.ident;

    map.getCanvas().style.cursor = 'pointer';
    popup.setLngLat(event.lngLat).setHTML(description).addTo(map);
  });
  
  map.on('mouseleave', id, () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });
}

function removeFlights(map) {
  if (isMapValid(map)) {
    if (map.getLayer('flights')) {
      map.removeLayer('flights');
    }

    if (map.getSource('flights')) {
      map.removeSource('flights');
    }
  }
}

function addFlights(map, data, colors) {
  if (isMapValid(map) && isDataValid(data)) {
    removeFlights(map);

    map.addSource('flights', {
      type: 'geojson',
      data
    });

    map.addLayer({
      id: 'flights',
      type: 'line',
      source: 'flights',
      'paint': {
        'line-color': colors,
        'line-width': 2
      }
    });

    addFlightPopups(map, 'flights');
  }
}

function addFlightPopups(map, id) {
  let popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });
        
  map.on('mouseenter', id, event => {
    let description = event.features[0].properties.fid;

    map.getCanvas().style.cursor = 'pointer';
    popup.setLngLat(event.lngLat).setHTML(description).addTo(map);
  });
  
  map.on('mouseleave', id, () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });
}

function removePings(map) {
  if (isMapValid(map)) {
    if (map.getLayer('pings')) {
      map.removeLayer('pings');
    }

    if (map.getSource('pings')) {
      map.removeSource('pings');
    }
  }
}

function addPings(map, data, colors) {
  if (isMapValid(map) && isDataValid(data)) {
    removePings(map);

    map.addSource('pings', {
      type: 'geojson',
      data
    });

    map.addLayer({
      id: 'pings',
      type: 'circle',
      source: 'pings',
      paint: {
        'circle-color': colors,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#212121',
        'circle-opacity': 0.75,
        'circle-radius': 3
      }
    });

    addPingPopups(map, 'pings');
  }
}

function addPingPopups(map, id) {
  let popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });
        
  map.on('mouseenter', id, event => {
    let description = event.features[0].properties.fid;

    map.getCanvas().style.cursor = 'pointer';
    popup.setLngLat(event.lngLat).setHTML(description).addTo(map);
  });
  
  map.on('mouseleave', id, () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });
}

const useStyles = makeStyles({
  controlPanel: {
    position: 'fixed',
    top: '74px',
    right: '10px'
  },
  paper: {
    backgroundColor: '#ffffff',
    padding: '1rem'
  },
  inputWrapper: {
    marginTop: '1rem'
  }
});

export default function Map(props) {
  const styles = useStyles();
  const [{workbook, airports, flights, pings}] = useGlobalValue();
  const [map, setMap] = useState(null);
  const [basemap, setBasemap] = useState('outdoors');
  const [airportStyle, setAirportStyle] = useState('off');
  const [adsbStyle, setAdsbStyle] = useState('flights');
  const [colors, setColors] = useState('#ffffff');

  // useEffect(() => {
  //   if (!workbook) {
  //     props.history.push('/workbook');
  //   }
  // });

  const addData = () => {
    if (airportStyle === 'off') {
      removeAirports(map);
    } else if (airportStyle === 'clusters') {
      addAirportClusters(map, airports);
    } else if (airportStyle === 'markers') {
      addAirportMarkers(map, airports);
    }

    if (adsbStyle === 'flights') {
      removePings(map);
      addFlights(map, flights, colors);
    } else if (adsbStyle === 'pings') {
      removeFlights(map);
      addPings(map, pings, colors);
    } else if (adsbStyle === 'combo') {
      addFlights(map, flights, colors);
      addPings(map, pings, colors);
    }
  };
  
  useEffect(() => {
    if (map) {
      map.on('load', () => {
        addData();
      });
    }
  });

  useEffect(() => {
    addData();
  }, [airportStyle, adsbStyle]);

  useEffect(() => {
    if (isDataValid(flights)) {
      let array = ['match', ['get', 'fid']];

      flights.features.map(feature => {
        array.push(feature.properties.fid);
        array.push(randomColor());
      });

      array.push(randomColor());
      setColors(array);
    }
  }, [flights]);

  return(
    <>
      <Mapbox
        id="map"
        container={{
          height: window.innerHeight - 64,
          width: window.innerWidth
        }}
        basemap={basemap}
        zoomControl
        scaleControl
        flightPopups
        getMap={map => setMap(map)}
      />
      <Grid container className={styles.controlPanel} justify="flex-end">
        <Grid item xs={2}>
          <Paper className={styles.paper}>
            <TextField
              fullWidth
              select
              label="Basemap"
              value={basemap}
              onChange={event => setBasemap(event.target.value)}
            >
              <MenuItem value="dark">Dark</MenuItem>
              <MenuItem value="light">Light</MenuItem>
              <MenuItem value="outdoors">Outdoors</MenuItem>
              <MenuItem value="satellite">Satellite</MenuItem>
              <MenuItem value="streets">Streets</MenuItem>
            </TextField>
            <TextField
              fullWidth
              select
              className={styles.inputWrapper}
              label="Airports"
              value={airportStyle}
              onChange={event => setAirportStyle(event.target.value)}
            >
              <MenuItem value="off">Off</MenuItem>
              <MenuItem value="clusters">Clusters</MenuItem>
              <MenuItem value="markers">Markers</MenuItem>
            </TextField>
            <TextField
              fullWidth
              select
              className={styles.inputWrapper}
              label="ADSB"
              value={adsbStyle}
              onChange={event => setAdsbStyle(event.target.value)}
            >
              <MenuItem value="flights">Flights</MenuItem>
              <MenuItem value="pings">Pings</MenuItem>
              <MenuItem value="combo">Flights + Pings</MenuItem>
            </TextField>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}