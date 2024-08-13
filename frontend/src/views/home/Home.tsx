import "./Home.scss"
import {Linkedin, GitHub} from "react-feather";

function getAge(birthDate: Date) {
    const today = new Date()
    const diff = today.getTime() - birthDate.getTime()
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
}

const Home = () => {
    return (
        <div className="home">
            <div className="home__container">
                <div className="home__left">
                    <div className="status_title">
                        <span>Apprentice Engineer at Free PRO</span>
                    </div>

                    <div className="home__content">
                        <h1 className={"home__content__title"}>I'm Mathis LAMBERT</h1>
                        <p className={"home__content__description"}>
                            I'm a {getAge(new Date(2003, 4, 29))} years old french developer based in Marseille. I'm
                            Currently studying computer engineering at <a href="https://cpe.fr/" target={"_blank"}>CPE
                            Lyon</a> and
                            working at <a
                            href="https://www.freepro.fr/" target={"_blank"}>Free PRO</a> as an apprentice engineer in
                            the R&D department
                            especially
                            in the AI team.
                        </p>
                    </div>

                    <div className="home__socials">
                        <a href="https://www.linkedin.com/in/mathis-lambert/"
                           className="home__socials__link" target={"_blank"}><Linkedin/></a>
                        <a href="https://www.github.com/mathis-lambert" className="home__socials__link"
                            target={"_blank"}><GitHub/></a>
                    </div>
                </div>
                <div className="home__right">
                    <div className="image__container">
                        <div className="home__right__image">
                            <img src="/public/images/memoji.png" alt="Mathis LAMBERT"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home