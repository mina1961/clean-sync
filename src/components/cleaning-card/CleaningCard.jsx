import { Link } from "react-router";
import "./CleaningCard.css";

export default function CleaningCard({ house, cleanings }) {
    return (
        <article className="cleaning-card">
            <div className="cleaning-card-header">
                <span className="cleaning-label mono">
                    UPCOMING CLEANINGS
                </span>
            </div>

            <h2 className="cleaning-house">{house}</h2>

            {cleanings.map((cleaning) => (
                <div className="cleaning-info" key={cleaning.id}>
                    <span>{cleaning.cleaning_date}</span>
                    <strong>
                        {cleaning.cleaning_time?.slice(0, 5)}
                    </strong>

                    <Link
                        to={`/cleanings/${cleaning.id}`}
                        className="cleaning-details-link"
                    >
                        View Details →
                    </Link>

                </div>
            ))}
        </article>
    );
}
