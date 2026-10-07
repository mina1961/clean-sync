import "./CleaningCard.css";

export default function CleaningCard({ house, date, time }) {
    return (
        <article className="cleaning-card">

            <div className="cleaning-card-header">
                <span className="cleaning-label mono">
                    UPCOMING CLEANING
                </span>

                <span className="cleaning-date mono">
                    {date}
                </span>
            </div>

            <h2 className="cleaning-house">
                {house}
            </h2>

            <div className="cleaning-info">
                <span>Cleaning time</span>
                <strong>{time}</strong>
            </div>

        </article>
    );
}
