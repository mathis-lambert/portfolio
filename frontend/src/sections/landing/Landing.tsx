import {GitHub, Linkedin} from "react-feather";
import "./Landing.scss"

function getAge(birthDate: Date) {
    const today = new Date()
    const diff = today.getTime() - birthDate.getTime()
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
}


const Landing = () => {
    return (
        <div className="landing">
            <div className="landing__container">
                <div className="landing__left">
                    <div className="status_title">
                        <span>Apprentice Engineer at Free PRO</span>
                    </div>

                    <div className="landing__content">
                        <h1 className={"landing__content__title"}>I'm Mathis LAMBERT</h1>
                        <p className={"landing__content__description"}>
                            I'm a {getAge(new Date(2003, 4, 29))} years old french developer based in Marseille.
                            I'm
                            Currently studying computer engineering at <a href="https://cpe.fr/"
                                                                          target={"_blank"}>CPE
                            Lyon</a> and
                            working at <a
                            href="https://www.freepro.fr/" target={"_blank"}>Free PRO</a> as an apprentice
                            engineer
                            in
                            the R&D department
                            especially
                            in the AI team.
                        </p>
                    </div>

                    <div className="landing__socials">
                        <a href="https://www.linkedin.com/in/mathis-lambert/"
                           className="landing__socials__link" target={"_blank"}><Linkedin/></a>
                        <a href="https://www.github.com/mathis-lambert" className="landing__socials__link"
                           target={"_blank"}><GitHub/></a>
                    </div>
                </div>
                <div className="landing__right">
                    <div className="image__container">
                        <div className="landing__right__image">
                            <img src="/images/memoji.png" alt="Mathis LAMBERT"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing

