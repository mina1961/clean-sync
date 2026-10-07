import "./Hero.css";

export default function Hero() {
    return (
        <section className="hero">

            <div className="hero-glass glass-a"></div>
            <div className="hero-glass glass-b"></div>
            <div className="hero-glass glass-c"></div>

            <div className="hero-content">
                <p className="hero-label mono">
                    GUEST HOUSE CLEANING MANAGEMENT
                </p>

                <h1 className="hero-title">
                    CLEAN<span>SYNC</span>
                </h1>

                <p className="hero-description">
                    Organize cleaning schedules, houses and team availability
                    in one place.
                </p>
            </div>

        </section>
    );
}