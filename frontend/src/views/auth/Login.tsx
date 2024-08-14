import React, { useState } from "react";
import "./Login.scss";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/authSlice"; // Assurez-vous que ce chemin est correct
import {useNavigate} from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import Button from "../../components/buttons/Button";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error('Nom d\'utilisateur ou mot de passe incorrect');
            }

            const data = await response.json();
            const token = data.token;

            // Stocker le token dans Redux
            dispatch(setToken(token));

            // Optionnel: stocker le token dans localStorage pour persistance
            // localStorage.setItem('token', token);

            navigate('/dashboard');

            // Redirection ou autres actions après connexion
            console.log('Logged in successfully!');
        } catch (err) {
            setError('Nom d\'utilisateur ou mot de passe incorrect');
            console.error('Error logging in:', err);
        }
    };

    return (
        <div className="login">
            <div className="login__container">
                <h1>Connexion</h1>
                <form className="login__form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nom d'utilisateur"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="login__error">{error}</p>}
                    <Button className="button02" type="submit">Se connecter</Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
