import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function HouseDetails() {
    const { houseId } = useParams();

    const [house, setHouse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchHouse() {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from("houses")
                .select("*")
                .eq("id", houseId)
                .single();

            if (error) {
                setError(error.message);
            } else {
                setHouse(data);
            }

            setLoading(false);
        }

        fetchHouse();
    }, [houseId]);

    if (loading) {
        return <p>Loading house details...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!house) {
        return <p>House not found.</p>;
    }

    return (
        <main className="house-details-page">
            <h1>{house.name}</h1>

            <p>Bedrooms: {house.bedrooms}</p>
            <p>Bathrooms: {house.bathrooms}</p>
            <p>Location: {house.location}</p>

            <h2>Cleaning Schedule</h2>
            <p>No cleanings scheduled yet.</p>
        </main>
    );
}