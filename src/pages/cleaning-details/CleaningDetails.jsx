
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { supabase } from "../../lib/supabase";

export default function CleaningDetails() {
    const { cleaningId } = useParams();

    const [cleaning, setCleaning] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCleaning() {
            setLoading(true);
            setError(null);
            setCleaning(null);

            const { data, error } = await supabase
                .from("cleanings")

                .select("*, houses(name)")

                .eq("id", cleaningId)
                .single();

            if (error) {
                setError(error.message);
            } else {
                setCleaning(data);
            }

            setLoading(false);
        }

        fetchCleaning();
    }, [cleaningId]);

    if (loading) {
        return (
            <p className="p-8">
                Loading cleaning details...
            </p>
        );
    }

    if (error) {
        return (
            <p className="p-8 text-red-600">
                Error: {error}
            </p>
        );
    }

    if (!cleaning) {
        return (
            <p className="p-8">
                Cleaning not found.
            </p>
        );
    }

    const totalGuests =
        cleaning.adults != null &&
            cleaning.children != null
            ? cleaning.adults + cleaning.children
            : "Not specified";

    function yesOrNo(value) {
        if (value == null) {
            return "Not specified";
        }

        return value ? "Yes" : "No";
    }

    return (
        <main className="mx-auto max-w-4xl p-8">
            <Link
                to="/schedule"
                className="mb-6 inline-block text-slate-600 hover:text-lime-600"
            >
                ← Back to Schedule
            </Link>

            <h1 className="mb-8 text-4xl font-bold">
                Cleaning Details
            </h1>

            <div className="rounded-xl border border-slate-200 bg-white p-8">
                <h2 className="mb-6 text-2xl font-semibold">

                    {cleaning.houses?.name ?? "Villa"} — Cleaning #{cleaning.id}

                </h2>

                <div className="space-y-3">
                    <p>
                        <strong>Date:</strong>{" "}
                        {cleaning.cleaning_date}
                    </p>

                    <p>
                        <strong>Time:</strong>{" "}
                        {cleaning.cleaning_time?.slice(0, 5)}
                    </p>

                    <p>
                        <strong>Status:</strong>{" "}
                        {cleaning.status}
                    </p>
                </div>

                <h3 className="mb-4 mt-8 text-xl font-semibold">
                    Incoming Guests
                </h3>

                <div className="space-y-3">
                    <p>
                        <strong>Adults:</strong>{" "}
                        {cleaning.adults ?? "Not specified"}
                    </p>

                    <p>
                        <strong>Children:</strong>{" "}
                        {cleaning.children ?? "Not specified"}
                    </p>

                    <p>
                        <strong>Total Guests:</strong>{" "}
                        {totalGuests}
                    </p>
                </div>

                <h3 className="mb-4 mt-8 text-xl font-semibold">
                    Special Requirements
                </h3>

                <div className="space-y-3">
                    <p>
                        <strong>Welcome Package:</strong>{" "}
                        {yesOrNo(cleaning.welcome_package)}
                    </p>

                    <p>
                        <strong>Late Arrival:</strong>{" "}
                        {yesOrNo(cleaning.late_arrival)}
                    </p>

                    <p>
                        <strong>Leave Lights On:</strong>{" "}
                        {yesOrNo(cleaning.leave_lights_on)}
                    </p>
                </div>
            </div>
        </main>
    );
}
