import "./Header.css"
import { useState } from 'react'
import { Link, NavLink } from 'react-router'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const getNavLinkClass = ({ isActive }) => {
        return isActive ? "nav-link active" : "nav-link";
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="site-header">
            <nav className="navbar">

                <Link to="/" className="logo">
                    CleanSync
                </Link>

                <button
                    className="menu-toggle"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle navigation"
                >
                    ☰
                </button>

                <div className={`nav-menu ${isMenuOpen ? "open" : ""}`}>
                    <NavLink to="/" end className={getNavLinkClass} onClick={closeMenu}>
                        Home
                    </NavLink>
                    <NavLink to="/schedule" className={getNavLinkClass} onClick={closeMenu}>
                        Schedule
                    </NavLink>
                    <NavLink to="/houses" className={getNavLinkClass} onClick={closeMenu}>
                        Houses
                    </NavLink>
                    <NavLink to="/login" className={getNavLinkClass} onClick={closeMenu}>
                        Login
                    </NavLink>

                    <NavLink to="/register" className={getNavLinkClass} onClick={closeMenu}>
                        Register
                    </NavLink>
                </div>
            </nav>
        </header>
    )
}