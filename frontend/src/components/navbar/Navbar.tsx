import './Navbar.scss'
import {Link} from "react-router-dom";
import HomeIcon from "../../icons/HomeIcon.tsx";
import UserIcon from "../../icons/UserIcon.tsx";
import FolderIcon from "../../icons/FolderIcon.tsx";
import {Copy} from "react-feather";

const Navbar = () => {
    return (
        <nav className={"navbar"}>
            <ul>
                <div className="left">
                    <li><Link to="/"><HomeIcon/></Link></li>
                    <li><Link to="/works"><FolderIcon/></Link></li>
                    <li><Link to="/about"><UserIcon/></Link></li>
                </div>
                <div className="right">
                    <li><Link to="_" onClick={(e) => {
                        // copy mail in clipboard
                        e.preventDefault()
                        navigator.clipboard.writeText("mathis.lambert27@gmail.com")
                    }}><Copy/> &nbsp; Copy Email</Link></li>
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;

