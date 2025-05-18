import './map-configurer.css';

import {useEffect, useState} from "react";
import {fetchData} from "../../static/js/http";
import MapElement from "../Map/MapElement";

export default function MapConfigurer() {

    const [layerProperties, setLayerProperties] = useState([]);
    const [areas, setAreas] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        let requestUrl = `${process.env.REACT_APP_BACKEND_URL}/api/v2/map/layers?product=8&hex_size=8`;
        fetchData(requestUrl, {method: "GET", headers: {"Accept": "*/*"}})
            .then(response => {
                if (response != null) {
                    if (response.layers) setLayerProperties(response.layers);
                    if (response.areas) setAreas(response.areas);
                }
            })
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        console.log("areas:", areas);
        console.log("layerProperties:", layerProperties)
    }, [areas, layerProperties]);

    return (
        <div className={"map-details-container"}>
            <div className={"properties-container"}>
                <h1>{isLoading ? "loading" : "ready"}</h1>
            </div>
            <div className={"map-container"}>
                <MapElement/>
            </div>
        </div>
    );
}