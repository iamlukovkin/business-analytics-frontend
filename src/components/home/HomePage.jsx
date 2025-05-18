import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { fetchData } from "../../static/js/http";
import "./home.css";

export function HomePage() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(`${process.env.REACT_APP_BACKEND_URL}/api/v2/products`)
            .then(setProducts)
            .catch(console.error);
    }, []);

    const handleProductClick = (productId) => {
        navigate(`/products`);
    };

    return (
        <div className="homepage-container">
            <h1>Добро пожаловать в Map Analyser</h1>
            <p>
                Наш сервис помогает анализировать геопространственные данные,
                визуализировать информацию и принимать решения на основе карт и данных.
            </p>

            <h2>Доступные продукты</h2>
            <ul className="products-list">
                {products.map((product) => (
                    <li
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => { if (e.key === 'Enter') handleProductClick(product.id); }}
                    >
                        <div className="product-name">{product.fullName}</div>
                        <div className="product-description">{product.description}</div>
                    </li>
                ))}
            </ul>

            <div className="buttons-group">
                <Link to="/login" style={{ textDecoration: "none" }}>
                    <button>Войти</button>
                </Link>
                <Link to="/register" style={{ textDecoration: "none" }}>
                    <button>Регистрация</button>
                </Link>
            </div>
        </div>
    );
}
