import './style/App.scss'
import {Route, Routes} from "react-router-dom";
import Home from "./views/home/Home.tsx";
import MainLayout from "./layouts/MainLayout.tsx";

function App() {
  return (
    <Routes>
        <Route element={<MainLayout />} >
            <Route path="/" element={<Home />} />
            <Route path={"*"} element={<h1>Oups ! Page introuvable - Erreur 404</h1>} />
        </Route>
    </Routes>
  )
}

export default App
