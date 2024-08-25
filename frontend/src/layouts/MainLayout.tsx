import {Outlet} from "react-router-dom";
import Navbar from "../components/navbar/Navbar.tsx";
import Container from "../components/container/Container.tsx";
import Footer from "../sections/footer/Footer.tsx";

const MainLayout = () => {
    return (
        <div className={"main-layout"}>
            <Navbar/>
            <Container>
                <Outlet/>
            </Container>
            <Footer/>
        </div>
    );
}

export default MainLayout;