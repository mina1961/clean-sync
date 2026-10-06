import "./Header.css"
import { Link, NavLink } from 'react-router'

export default function Header() {

    const getNavLinkClass = ({ isActive }) => {
        return isActive ? "nav-link active" : "nav-link";
    };

    return (
        <header className="site-header">
            <nav className="navbar">

                <Link to="/" className="logo">
                    CleanSync
                </Link>

                <div className="nav-menu">
                    <NavLink to="/" end className={getNavLinkClass}>
                        Home
                    </NavLink>
                    <NavLink to="/schedule" className={getNavLinkClass} >
                        Schedule
                    </NavLink>
                    <NavLink to="/houses" className={getNavLinkClass}>
                        Houses
                    </NavLink>
                    <NavLink to="/login" className={getNavLinkClass}>
                        Login
                    </NavLink>

                    <NavLink to="/register" className={getNavLinkClass}>
                        Register
                    </NavLink>
                </div>
            </nav>
        </header>
    )
}