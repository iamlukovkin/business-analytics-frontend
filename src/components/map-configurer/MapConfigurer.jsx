import './map-configurer.css';
import {useEffect, useMemo, useState} from "react";
import {useLocation} from "react-router-dom";
import {fetchData} from "../../static/js/http";
import MapElement from "../Map/MapElement";
import {FeatureList} from "./FeatureList";
import {LayerList} from "./LayerList";
import {YearSlider} from "./YearSlider";

const extractAreas = (areas) => {
    const extractedStructure = [];
    Object.entries(areas).forEach(([hexIndex, features]) => {
        Object.entries(features).forEach(([featureIdString, informationOfFeatureByYear]) => {
            Object.entries(informationOfFeatureByYear).forEach(([yearString, measurementString]) => {
                extractedStructure.push({
                    h3: hexIndex,
                    year: Number(yearString),
                    measurement: Number(measurementString),
                    featureId: Number(featureIdString),
                });
            });
        })
    })
    return extractedStructure;
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function MapConfigurer() {
    const query = useQuery();
    const product = query.get("product");

    const [layerProperties, setLayerProperties] = useState([]);
    const [rawAreas, setRawAreas] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [selectedLayerId, setSelectedLayerId] = useState(null);
    const [selectedFeatureId, setSelectedFeatureId] = useState(null);
    const areas = useMemo(() => extractAreas(rawAreas), [rawAreas]);
    const [selectedYear, setSelectedYear] = useState(null);

    const availableYears = useMemo(() => {
        const yearsSet = new Set(areas.filter(a => a.featureId === selectedFeatureId).map(a => a.year));
        return Array.from(yearsSet).sort((a, b) => a - b);
    }, [areas, selectedFeatureId]);

    useEffect(() => {
        if (availableYears.length) {
            setSelectedYear(availableYears[0]);
        } else {
            setSelectedYear(null);
        }
    }, [availableYears]);

    const filteredAreas = useMemo(() => {
        return areas.filter(area =>
            area.featureId === selectedFeatureId &&
            area.year === selectedYear
        );
    }, [areas, selectedFeatureId, selectedYear]);

    useEffect(() => {
        if (availableYears.length) {
            setSelectedYear(availableYears[0]);
        }
    }, [selectedFeatureId]);

    useEffect(() => {
        if (!product) return;

        setIsLoading(true);
        const requestUrl = `${
            process.env.REACT_APP_BACKEND_URL}/api/v2/map/layers?product=${product}&hex_size=8`;
        fetchData(requestUrl, {method: "GET", headers: {Accept: "*/*"}})
            .then((response) => {
                if (response != null) {
                    if (response.layers) setLayerProperties(response.layers);
                    if (response.areas) setRawAreas(response.areas);
                }
            })
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
    }, [product]);

    useEffect(() => {
        if (layerProperties.length && !selectedLayerId) {
            setSelectedLayerId(layerProperties[0].id);
        }
    }, [layerProperties]);

    useEffect(() => {
        const selectedLayer = layerProperties.find(layer => layer.id === selectedLayerId);
        if (selectedLayer && selectedLayer.features?.length) {
            setSelectedFeatureId(selectedLayer.features[0].id);
        } else {
            setSelectedFeatureId(null);
        }
    }, [selectedLayerId, layerProperties]);

    const selectedLayer = layerProperties.find(layer => layer.id === selectedLayerId);
    const layerId = selectedLayer?.id;
    const features = selectedLayer?.features || [];

    return (
        <div className={"map-details-container"}>
            <div className={"map-container"}>
                <MapElement areas={filteredAreas}/>
            </div>
            {isLoading
                ? (<div className="loading-message">Загрузка данных...</div>)
                : (<div className={"properties-container"}>
                    <h1>Категории</h1>
                    <LayerList layers={layerProperties}
                               selectedLayerId={selectedLayerId}
                               onSelectLayer={setSelectedLayerId}/>
                    {availableYears.length > 1 && (<YearSlider years={availableYears}
                                                               selectedYear={selectedYear}
                                                               onChange={setSelectedYear}/>)}

                    {layerId && (<>
                        <h2>Слои</h2>
                        {features && (
                            <FeatureList features={features}
                                         selectedFeatureId={selectedFeatureId}
                                         onSelectFeature={setSelectedFeatureId}/>
                        )}
                    </>)}
                </div>)}
        </div>
    );
}
