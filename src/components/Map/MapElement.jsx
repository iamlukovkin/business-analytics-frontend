import './map.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import {useState} from "react";
import {Map} from '@vis.gl/react-maplibre';


export default function MapElement() {

    const [viewState, setViewState] = useState({
        latitude: process.env.REACT_APP_MAP_DEFAULT_LATITUDE,
        longitude: process.env.REACT_APP_MAP_DEFAULT_LONGITUDE,
        zoom: process.env.REACT_APP_MAP_DEFAULT_ZOOM,
        bearing: 0,
        pitch: 0
    });

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
        </Map>
    );
}
