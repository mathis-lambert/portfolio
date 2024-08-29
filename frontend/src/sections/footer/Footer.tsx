import "./Footer.scss";
import {Link} from "react-router-dom";
import {GitHub, Linkedin} from "react-feather";

const Footer = () => {
    return (
        <footer className="container footer">
            <span>Portfolio de Mathis LAMBERT</span>
            <span>© {new Date().getFullYear()}</span>

            <div className="socials">
                <Link to={"https://github.com/mathis-lambert"} target={'_blank'}><GitHub/></Link>
                <Link to={"https://www.linkedin.com/in/mathis-lambert/"} target={'_blank'}><Linkedin/></Link>
            </div>
        </footer>
    )
}

export default Footer;