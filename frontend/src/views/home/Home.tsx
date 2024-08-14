import "./Home.scss"
import Works from "../../sections/works/Works.tsx";
import Landing from "../../sections/landing/Landing.tsx";

const Home = () => {
    return (
        <div className="home">
            <div className="home__container">
                <Landing/>
                <Works limit={3} section={true}/>
            </div>
        </div>
    )
}

export default Home