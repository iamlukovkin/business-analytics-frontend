import '../login/login.css';

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                console.log("Ошибка регистрации");
            }

            // Можно сразу авторизовать, но пока редирект на логин
            navigate("/login");
        } catch (err) {
            setError("Пользователь уже существует или ошибка регистрации");
        }
    };

    return (
        <div className="login-container">
            <h2>Регистрация</h2>
            <form onSubmit={handleRegister}>
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
                <button type="submit">Зарегистрироваться</button>
                {error && <p className="error">{error}</p>}
            </form>
            <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
        </div>
    );
}
