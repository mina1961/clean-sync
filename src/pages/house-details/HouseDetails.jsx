import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import AddCleaningForm from "../../components/add-cleaning-form/AddCleaningForm";
import { useAuth } from "../../contexts/AuthContext";
import EditCleaningForm from "../../components/edit-cleaning-form/EditCleaningForm";

export default function HouseDetails() {
    const { houseId } = useParams();

    const { isAuthenticated, user } = useAuth();

    const [house, setHouse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cleanings, setCleanings] = useState([]);
    const [editingCleaning, setEditingCleaning] = useState(null);

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

    useEffect(() => {
        async function fetchCleanings() {
            const { data, error } = await supabase
                .from("cleanings")
                .select("*")
                .eq("house_id", houseId)
                .order("cleaning_date", { ascending: true });

            if (error) {
                console.error("Error fetching cleanings:", error.message);
            } else {
                setCleanings(data);
            }
        }

        fetchCleanings();
    }, [houseId]);

    async function handleDelete(cleaningId) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this cleaning?"
        );

        if (!confirmed) {
            return;
        }

        const { error } = await supabase
            .from("cleanings")
            .delete()
            .eq("id", cleaningId)
            .eq("created_by", user.id);

        if (error) {
            alert("Error deleting cleaning: " + error.message);
            return;
        }

        setCleanings((prevCleanings) =>
            prevCleanings.filter((cleaning) => cleaning.id !== cleaningId)
        );
    }

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
            {editingCleaning && (
                <EditCleaningForm
                    key={editingCleaning.id}
                    cleaning={editingCleaning}
                    onCancel={() => setEditingCleaning(null)}
                    onUpdated={(updatedCleaning) => {
                        setCleanings((prevCleanings) =>
                            prevCleanings.map((cleaning) =>
                                cleaning.id === updatedCleaning.id
                                    ? updatedCleaning
                                    : cleaning
                            )
                        );

                        setEditingCleaning(null);
                    }}
                />
            )}

            {cleanings.length === 0 ? (
                <p>No cleanings scheduled yet.</p>
            ) : (
                cleanings.map((cleaning) => (
                    <div key={cleaning.id}>
                        <p>Date: {cleaning.cleaning_date}</p>
                        <p>Time: {cleaning.cleaning_time?.slice(0, 5)}</p>
                        <p>Status: {cleaning.status}</p>

                        {cleaning.created_by === user?.id && (
                            <div className="cleaning-actions">
                                <button
                                    type="button"
                                    onClick={() => setEditingCleaning(cleaning)}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(cleaning.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))
            )}

            {isAuthenticated ? (
                <AddCleaningForm
                    houseId={house.id}
                    onCleaningAdded={(newCleaning) => {
                        setCleanings((prevCleanings) =>
                            [...prevCleanings, newCleaning].sort((a, b) =>
                                a.cleaning_date.localeCompare(b.cleaning_date)
                            )
                        );
                    }}
                />
            ) : (
                <p>Please log in to schedule a cleaning.</p>
            )}
        </main>
    );
}