import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';

import { basemaps } from '../data/basemaps';

export default function Mapbox(props) {
  const id = `${props.id}--container`;
  const [container, setContainer] = useState(props.container);
  const [map, setMap] = useState(null);

  useEffect(() => {
    let map = new mapboxgl.Map({
      container: id,
      style: basemaps[props.basemap],
      center: [0, 0],
      zoom: 2,
      bearing: 0,
      pitch: 0,
      attributionControl: false,
      accessToken: Meteor.settings.public.mapbox.accessToken
    });

    if (props.zoomControl) {
      map.addControl(new mapboxgl.NavigationControl(), 'top-left');
    }

    if (props.scaleControl) {
      map.addControl(new mapboxgl.ScaleControl(), 'bottom-right')
    }

    setMap(map);

    return () => map.remove();
  }, [props.basemap]);

  useEffect(() => {
    if (map && props.drawControls) {
      let draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: props.drawControls
      });

      map.addControl(draw);

      if (props.drawings) {
        draw.add(props.drawings);
      }

      const updateDrawings = () => {
        let drawings = draw.getAll();

        if (drawings && props.onDraw) {
          props.onDraw(drawings);
        }
      };

      map.on('draw.create', updateDrawings);
      map.on('draw.delete', updateDrawings);
      map.on('draw.update', updateDrawings);
    }
  }, [map]);

  useEffect(() => {
    if (map && props.geojson) {
      map.on('load', () => {
        map.addLayer(props.geojson);
      });
    }
  });

  useEffect(() => {
    if (map && props.getMap) {
      props.getMap(map);
    }
  });

  useEffect(() => {
    const updateDimensions = () => {
      setContainer(props.container);
    };

    window.addEventListener('resize', updateDimensions);

    if (map) {
      map.resize();
    }

    return () => window.removeEventListener('resize', updateDimensions);
  });

  return <div id={id} style={container}/>;
}