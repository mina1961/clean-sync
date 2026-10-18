import './HouseCard.css';
export default function HouseCard({ house }) {
    return (
        <article className="house-card">
            <h2>{house.name}</h2>
            <p>Bedrooms: {house.bedrooms}</p>
            <p>Bathrooms: {house.bathrooms}</p>
            <p>Location: {house.location}</p>
        </article>
    );
}
