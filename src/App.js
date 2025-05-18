import './static/css/app.css';

import MapConfigurer from "./components/map-configurer/MapConfigurer";
import {Header} from "./components/header/Header";

function App() {
    return (<>
        <Header/>
        <div className="app">
            <MapConfigurer/>
        </div>
    </>);
}

export default App;
