import {Outlet} from "react-router-dom";
import Navbar from "../components/navbar/Navbar.tsx";
import Container from "../components/container/Container.tsx";

const MainLayout = () => {
    return (
        <div className={"main-layout"}>
            <Navbar/>
            <Container>
                <Outlet/>
            </Container>
        </div>
    );
}

export default MainLayout;