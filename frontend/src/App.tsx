import './style/App.scss'
import {Route, Routes} from "react-router-dom";
import Home from "./views/home/Home.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import Login from "./views/auth/Login.tsx";
import {useSelector} from "react-redux";
import {RootState} from "./redux/store.ts";
import {useEffect} from "react";

function App() {
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        if (token) {
            console.log("Token: ", token);
        }
    }, [token]);

    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path={"*"} element={<h1>Oups ! Page introuvable - Erreur 404</h1>}/>
            </Route>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    )
}

export default App
