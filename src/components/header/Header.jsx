import { Link } from "react-router-dom";
import "./header.css";
import {LogoSvg} from "../LogoSvg";

export function Header() {
    return (
        <header className="header">
            <div className="logo-svg">
                <LogoSvg />
            </div>
            <h1>Map analyser</h1>
            <nav className="header-nav">
                <Link to="/" className="header-link">Главная</Link>
                <Link to="/products" className="header-link">Продукты</Link>
            </nav>
        </header>
    );
}
