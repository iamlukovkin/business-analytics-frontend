import '../login/login.css'

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            });

            if (!response.ok) {
                const err = await response.json();
                console.log(err.message || "Ошибка регистрации");
            }

            navigate("/login");
        } catch (err) {
            setError(err.message || "Ошибка регистрации");
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
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
