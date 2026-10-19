import './HouseCard.css';
import { Link } from "react-router";
export default function HouseCard({ house }) {
    return (
        <article className="house-card">
            <h2>{house.name}</h2>
            <p>Bedrooms: {house.bedrooms}</p>
            <p>Bathrooms: {house.bathrooms}</p>
            <p>Location: {house.location}</p>

            <Link to={`/houses/${house.id}`} className="house-details-btn">
                View Details →
            </Link>

        </article>
    );
}
