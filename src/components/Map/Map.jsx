import './map.css';
import {useState, useEffect} from 'react';
import {Layer, Map, Source} from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import {defaultCoordinates, defaultZoom} from '../../static/js/defaults.js';
import {cellToBoundary} from "h3-js";

const source = 'http://localhost:8080';

export default function MapElement() {
    const productId = 8;

    const [viewState, setViewState] = useState({
        latitude: defaultCoordinates.latitude,
        longitude: defaultCoordinates.longitude,
        zoom: defaultZoom,
        bearing: 0,
        pitch: 0
    });

    const [layers, setLayers] = useState([]);
    const [selectedLayerId, setSelectedLayerId] = useState(null);
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    const [views, setViews] = useState([]);
    const [selectedLayerFeatures, setSelectedLayerFeatures] = useState([]);
    const [selectedFeatureId, setSelectedFeatureId] = useState(null);
    const hexSize = 8;
    const [loading, setLoading] = useState(false);

    const onMove = (event) => {
        setViewState(event.viewState);
    };

    useEffect(() => {
        const fetchLayers = async () => {
            try {
                setLoading(true);
                const res = await fetch(source + `/api/v2/map/layers?productId=${productId}`);
                if (!res.ok) {
                    console.log("Failed to fetch layers");
                    return;
                }
                const data = await res.json();
                setLayers(data);

                if (data.length > 0) {
                    setSelectedLayerId(data[0].id);
                    setSelectedLayerFeatures(data[0].features || []);
                }
            } catch (err) {
                console.error("Error fetching layers:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLayers().catch((_) => {
            setLoading(false);
        });
    }, [productId]);

    useEffect(() => {
        const layer = layers.find(l => l.id === selectedLayerId);
        setSelectedLayerFeatures(layer?.features || []);
    }, [selectedLayerId, layers]);

    useEffect(() => {
        if (!selectedLayerId) return;

        const fetchMapData = async () => {
            try {
                setLoading(true);
                let requestString = source + `/api/v2/map/areas?layerId=${selectedLayerId}&hexSize=${hexSize}`;
                const res = await fetch(requestString);
                if (!res.ok) {
                    console.log("Failed to fetch layers");
                    return;
                }

                const rawData = await res.json();

                const extracted = [];

                const collectedYears = new Set();

                for (const [h3, featureMap] of Object.entries(rawData)) {
                    for (const [featureId, yearMap] of Object.entries(featureMap)) {
                        for (const [year, measurement] of Object.entries(yearMap)) {
                            const y = Number(year);
                            collectedYears.add(y);
                            const id = Number(featureId);
                            if ((selectedFeatureId && id !== selectedFeatureId) || (selectedYear && y !== selectedYear)) {
                                continue;
                            }

                            extracted.push({
                                h3,
                                feature_id: id,
                                year: y,
                                feature_measurement: measurement
                            });
                        }
                    }
                }

                const sortedYears = Array.from(collectedYears).sort((a, b) => a - b);
                setYears(sortedYears);
                if (!selectedYear && sortedYears.length > 0) setSelectedYear(sortedYears[0]);

                const measurements = extracted.map(entry => entry.feature_measurement);
                const min = Math.min(...measurements);
                const max = Math.max(...measurements);

                const geoJsonFeatures = extracted.map(entry => {
                    const opacity = min !== max
                        ? ((entry.feature_measurement - min) / (max - min)) * 0.7 + 0.3 : 0.3;
                    return {
                        type: "Feature",
                        properties: {
                            id: entry.feature_id,
                            color: "#009DC5",
                            opacity,
                            year: entry.year
                        },
                        geometry: {
                            type: "Polygon",
                            coordinates: [cellToBoundary(entry.h3, true)]
                        }
                    };
                });

                setViews(geoJsonFeatures);
            } catch (err) {
                console.error("Error loading map data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMapData().catch(() => setLoading(false));
    }, [selectedLayerId, selectedYear, selectedFeatureId, hexSize])

    const layerProperties = {
        id: "area-layer", type: "fill", paint: {
            'fill-outline-color': 'white', 'fill-color': ['get', 'color'], 'fill-opacity': ['get', 'opacity'],
        },
    };

    return (<>
        {loading && (<div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '24px',
            background: 'rgba(0, 0, 0, 0.5)',
            padding: '20px',
            borderRadius: '8px'
        }}>
            Загрузка данных...
        </div>)}

        <div style={{
            position: 'absolute',
            zIndex: 10,
            margin: '12px',
            padding: '10px',
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: '8px',
            color: 'white'
        }}>
            <h1 style={{padding: '0'}}>Выбор слоев</h1>

            <div style={{marginBottom: '10px'}}>
                <label style={{marginRight: '8px'}}>Выбранный слой:</label>
                <select
                    value={selectedLayerId ?? ''}
                    onChange={e => setSelectedLayerId(Number(e.target.value))}>
                    {layers.map(layer => (<option key={layer.id} value={layer.id}>{layer.full_name}</option>))}
                </select>
            </div>

            <select
                value={selectedFeatureId ?? ''}
                onChange={
                    (e) => setSelectedFeatureId(
                        e.target.value === '' ? null : Number(e.target.value))}
            >
                <option value="">Все опции</option>
                {selectedLayerFeatures.map(feature => (
                    <option key={feature.id} value={feature.id}>{feature.located_name}</option>))}
            </select>

            <div>
                {years.length > 0 && (<div>
                    <label style={{marginRight: '8px'}}>Год: {selectedYear}</label>
                    <input
                        type="range"
                        min={0}
                        max={years.length - 1}
                        value={years.indexOf(selectedYear)}
                        onChange={(e) => setSelectedYear(
                            years[Number(e.target.value)])}
                        step={1}
                    />
                </div>)}
            </div>
        </div>

        <Map
            {...viewState}
            style={{width: '100vw', height: '100vh'}}
            onMove={onMove}
            mapStyle={process.env.REACT_APP_MAP_API_URL}
        >
            <Source
                type="geojson"
                data={{
                    type: "FeatureCollection", features: views,
                }}
            >
                <Layer {...layerProperties} />
            </Source>
        </Map>
    </>);
}
