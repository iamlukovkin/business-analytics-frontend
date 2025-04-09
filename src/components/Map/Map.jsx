import './map.css';

import { useState } from 'react';
import { Map, Layer, Source } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { defaultCooridinates, defaultZoom } from '../../static/js/defaults.js'; import { cellToBoundary } from "h3-js";
import { getData } from '../../static/js/data';
import { area } from '@turf/area';


export default function MapElement() {

  const [views, setViews] = useState([]);
  const serverData = require('../../data/raw.json');
  const [currentType, setCurrentType] = useState('grocery');

  const [viewState, setViewState] = useState({
    latitude: defaultCooridinates.latitude,
    longitude: defaultCooridinates.longitude,
    zoom: defaultZoom,
    bearing: 0,
    pitch: 0
  })

  const onMove = (event) => {
    setViewState(event.viewState);
  }

  const onLoad = () => {
    const data = serverData.data[currentType];
    const convertedHexagons = data.map((areaInformation) => {
      const hexIndex = areaInformation.h3;
      const value = areaInformation.value;
      const style = getStyle(value, serverData.statistics[currentType]);
      console.log(style, areaInformation)
      return {
        type: "Feature",
        properties: {
          // color: style.color,
          color: "#8800DD",
          opacity: 0.3 +  areaInformation.opacity / 255,
          id: hexIndex,
        },
        geometry: {
          type: "Polygon",
          coordinates: [cellToBoundary(hexIndex, true)]
        },
      }
    });

    setViews(convertedHexagons);
  }

  const getStyle = (value, statistics) => {

    const part = value / statistics.max;
    const red = Math.round(part * 255) || 0xFF;
    const stringColor = red.toString(16);

    return {
      color: "#" + stringColor + "00" + stringColor,
      opacity: 0.5 + part
    }
  }

  const layerProperties = {
    id: "polyline-layer",
    type: "fill",
    paint: {
      'fill-outline-color': 'white',
      "fill-color": ["get", "color"],
      "fill-opacity": ["get", "opacity"],
    },
  };

  return (<Map {...viewState}
    style={{ width: '100vw', height: '100vh' }}
    onMove={event => { onMove(event) }}
    mapStyle={process.env.REACT_APP_MAP_API_URL}
    onLoad={onLoad}
  >
        <Source
          type="geojson"
          data={{
            type: "FeatureCollection",
            features: views 
          }}
        >
          <Layer {...layerProperties} />
        </Source>
  </Map>);
}

