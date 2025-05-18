import { BrowserRouter, Routes, Route } from "react-router-dom";
import {LoginPage} from "./components/login/LoginPage";
import {PrivateRoute} from "./components/login/PrivateRoute";
import MapConfigurer from "./components/map-configurer/MapConfigurer";
import {RegisterPage} from "./components/register/RegisterPage";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/map" element={
                    <PrivateRoute>
                        <MapConfigurer />
                    </PrivateRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}


export default App;
