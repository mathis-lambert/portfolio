import './style/App.scss'
import {Route, Routes} from "react-router-dom";
import Home from "./views/home/Home.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import Login from "./views/auth/Login.tsx";
import {useSelector} from "react-redux";
import {RootState} from "./redux/store.ts";
import {useEffect} from "react";
import Works from "./sections/works/Works.tsx";
import Work from "./views/work/Work.tsx";

function App() {
    const token = useSelector((state: RootState) => state.auth.token);
    const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);


    useEffect(() => {
        if (token) {
            // Faire quelque chose avec le token, par exemple le stocker dans localStorage
            // localStorage.setItem('token', token);
        }
    }, [token]);

    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/works" element={<Works limit={null} section={false}/>}/>
                <Route path="/works/:id" element={<Work/>}/>
                {loggedIn && <Route path="/dashboard" element={<h1>Dashboard</h1>}/>}
                <Route path={"*"} element={<h1>Oups ! Page introuvable - Erreur 404</h1>}/>
            </Route>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    )
}

export default App
