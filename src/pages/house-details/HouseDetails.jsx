import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import AddCleaningForm from "../../components/add-cleaning-form/AddCleaningForm";
import { useAuth } from "../../contexts/AuthContext";
import EditCleaningForm from "../../components/edit-cleaning-form/EditCleaningForm";
import "./HouseDetails.css";

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
                .maybeSingle();

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
        return (
            <div className="max-w-4xl mx-auto px-6 py-12">
                <h2 className="text-2xl font-bold mb-4">
                    {error}
                </h2>

                <Link
                    to="/houses"
                    className="text-blue-600 hover:underline"
                >
                    ← Back to Houses
                </Link>
            </div>
        );
    }

    if (!house) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-12">
                <h2 className="text-2xl font-bold mb-4">
                    House not found.
                </h2>

                <Link
                    to="/houses"
                    className="text-blue-600 hover:underline"
                >
                    ← Back to Houses
                </Link>
            </div>
        );
    }

    return (
        <main className="house-details-page">
            <div className="house-details-heading">
                <p className="mono">GUEST HOUSES / DETAILS</p>
                <h1>{house.name}</h1>
                <p className="house-details-location">
                    {house.location}
                </p>
            </div>

            {house.image_url && (
                <div className="mt-8 mb-12 overflow-hidden rounded-2xl">
                    <img
                        src={house.image_url}
                        alt={house.name}
                        className="w-full h-80 object-cover md:h-[480px]"
                    />
                </div>
            )}

            <div className="house-details-stats">
                <div className="house-stat">
                    <span className="house-stat-number">
                        {house.bedrooms}
                    </span>
                    <span>Bedrooms</span>
                </div>

                <div className="house-stat">
                    <span className="house-stat-number">
                        {house.bathrooms}
                    </span>
                    <span>Bathrooms</span>
                </div>
            </div>

            <h2 className="mb-6 text-3xl font-bold text-slate-950">
                Cleaning Schedule
            </h2>
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
                    <div key={cleaning.id}
                        className="mb-6 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm"
                    >
                        <p>Date: {cleaning.cleaning_date}</p>
                        <p>Time: {cleaning.cleaning_time?.slice(0, 5)}</p>
                        <p>Status: {cleaning.status}</p>

                        {cleaning.created_by === user?.id && (
                            <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">

                                <button
                                    type="button"
                                    className="rounded-lg bg-slate-950 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-lime-400 hover:text-slate-950"
                                    onClick={() => setEditingCleaning(cleaning)}
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    className="rounded-lg border border-red-200 px-5 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
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