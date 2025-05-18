import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {LoginPage} from "./components/login/LoginPage";
import {PrivateRoute} from "./components/login/PrivateRoute";
import MapConfigurer from "./components/map-configurer/MapConfigurer";
import {RegisterPage} from "./components/register/RegisterPage";
import {ProductsPage} from "./components/products/ProductsPage";
import {Header} from "./components/header/Header";

import { HomePage } from "./components/home/HomePage";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/map"
                    element={
                        <PrivateRoute>
                            <MapConfigurer />
                        </PrivateRoute>
                    }
                />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
