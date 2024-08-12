import './Navbar.scss'
import {Link} from "react-router-dom";
import HomeIcon from "../../icons/HomeIcon.tsx";
import UserIcon from "../../icons/UserIcon.tsx";

const Navbar = () => {
    return (
        <nav className={"navbar"}>
            <ul>
                <div className="left">
                    <li><Link to="/"><HomeIcon/></Link></li>
                    <li><Link to="/about"><UserIcon/></Link></li>
                </div>
                <div className="right">
                    <li><Link to="/login">Contact me</Link></li>
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;

