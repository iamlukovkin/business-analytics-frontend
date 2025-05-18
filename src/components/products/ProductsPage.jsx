import { useNavigate } from "react-router-dom";
import { fetchData } from "../../static/js/http";
import { useEffect, useState } from "react";
import './products-page.css';

export function ProductsPage() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(`${process.env.REACT_APP_BACKEND_URL}/api/v2/products`)
            .then(setProducts)
            .catch(console.error);
    }, []);

    const handleSelectProduct = (productId) => {
        navigate(`/map?product=${productId}`);
    };

    return (
        <div className="products-page">
            <h1>Выберите продукт</h1>
            <div className="products-list">
                {products.map(product => (
                    <div
                        key={product.id}
                        className="product-card"
                        onClick={() => handleSelectProduct(product.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => { if (e.key === 'Enter') handleSelectProduct(product.id); }}
                    >
                        <h2 className="product-title">{product.fullName}</h2>
                        <p className="product-description">{product.description}</p>

                        {product.featureLayers && product.featureLayers.length > 0 && (
                            <div className="feature-layers">
                                <h3>Слои</h3>
                                {product.featureLayers.map(layer => (
                                    <div key={layer.id} className="feature-layer">
                                        <strong>{layer.fullName}</strong>
                                        {layer.features && layer.features.length > 0 && (
                                            <ul className="features-list">
                                                {layer.features.map(feature => (
                                                    <li key={feature.id}>
                                                        {feature.locatedName}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                        <p className="product-price">{product.price.toFixed(2)} ₽</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
