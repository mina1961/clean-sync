import "./Header.css"
import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { isAuthenticated, loading } = useAuth();

    async function logoutHandler() {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Logout error:', error.message);
            return;
        }

        closeMenu();
    }

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
                        {isAuthenticated ? "Schedule" : "Our Villas"}
                    </NavLink>

                    <NavLink to="/houses" className={getNavLinkClass} onClick={closeMenu}>
                        Houses
                    </NavLink>

                    {!loading && (
                        isAuthenticated
                            ?
                            (
                                <>

                                    <button
                                        type="button"
                                        className="nav-link"
                                        onClick={logoutHandler}
                                    >
                                        Logout
                                    </button>
                                </>
                            )
                            :
                            (
                                <>
                                    <NavLink
                                        to="/login"
                                        className={getNavLinkClass}
                                        onClick={closeMenu}
                                    >
                                        Login
                                    </NavLink>

                                    <NavLink
                                        to="/register"
                                        className={getNavLinkClass}
                                        onClick={closeMenu}
                                    >
                                        Register
                                    </NavLink>
                                </>
                            )
                    )}

                </div>
            </nav>
        </header>
    )
}