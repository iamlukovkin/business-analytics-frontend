import './map.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import {useEffect, useState} from "react";
import {Layer, Map, Source} from '@vis.gl/react-maplibre';
import {cellToBoundary} from "h3-js";

const collectAreasToArray = (areas) => {
    const measurements = areas.map(entry => entry.measurement);
    const max = Math.max(...measurements);
    return areas.map(entry => {
        return {
            type: "Feature",
            properties: {
                id: "hex_" + entry.h3 + "_" + entry.featureId,
                featureId: entry.featureId,
                h3: entry.h3,
                color: "#ad5afd",
                measurement: entry.measurement,
                opacity: 0.1 + (entry.measurement / max) * 0.6,
                year: entry.year
            },
            geometry: {
                type: "Polygon",
                coordinates: [cellToBoundary(entry.h3, true)]
            }
        }
    });
}

export default function MapElement({areas}) {

    const [views, setViews] = useState(false);

    const [viewState, setViewState] = useState({
        latitude: process.env.REACT_APP_MAP_DEFAULT_LATITUDE,
        longitude: process.env.REACT_APP_MAP_DEFAULT_LONGITUDE,
        zoom: process.env.REACT_APP_MAP_DEFAULT_ZOOM,
        bearing: 0,
        pitch: 0
    });

    const layerProperties = {
        id: "area-layer",
        type: "fill",
        paint: {
            'fill-outline-color': 'white',
            'fill-color': ['get', 'color'],
            'fill-opacity': ['get', 'opacity'],
        },
    };

    useEffect(() => {
        let toArray = collectAreasToArray(areas);
        setViews(toArray);
    }, [areas])

    const onMove = (event) => {
        setViewState(event.viewState)
    }

    return (
        <Map
            {...viewState}
            onMove={onMove}
            style={{width: '100%', height: '100%'}}
            mapStyle={process.env.REACT_APP_MAP_API_TOKEN}
        >
            <Source type="geojson" data={{type: 'FeatureCollection', features: views}}>
                <Layer {...layerProperties} />
            </Source>
        </Map>
    );
}
