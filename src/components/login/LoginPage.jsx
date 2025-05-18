import './login.css';

import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";

export function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v2/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                console.log("Ошибка авторизации");
            }

            const data = await response.json();
            localStorage.setItem("token", data.token); // сохраняем токен
            navigate("/dashboard"); // переход на защищённую страницу
        } catch (err) {
            setError("Неверный логин или пароль");
        }
    };

    return (
        <div className="login-container">
            <h2>Вход</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Войти</button>
                {error && <p className="error">{error}</p>}
            </form>
            <p>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
        </div>
    );
}
