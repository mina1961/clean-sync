
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import { useAuth } from "../../contexts/AuthContext";


export default function CleaningResponses({ cleaningId }) {

    const { user } = useAuth();

    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const [availability, setAvailability] = useState("");
    const [comment, setComment] = useState("");
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);


    useEffect(() => {
        async function fetchResponses() {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from("cleaning_responses")
                .select("*")
                .eq("cleaning_id", cleaningId)
                .order("created_at", { ascending: true });


            if (error) {
                setError(error.message);
            } else {
                const fetchedResponses = data ?? [];
                setResponses(fetchedResponses);

                const myResponse = fetchedResponses.find(
                    (response) => response.user_id === user?.id
                );

                if (myResponse) {
                    setAvailability(
                        myResponse.is_available ? "available" : "unavailable"
                    );
                    setComment(myResponse.comment ?? "");
                } else {
                    setAvailability("");
                    setComment("");
                }
            }


            setLoading(false);
        }

        if (cleaningId) {
            fetchResponses();
        }
    }, [cleaningId, user?.id]);


    async function handleSubmit(e) {
        e.preventDefault();

        if (!user || !availability || saving) return;

        setSaving(true);
        setSaveError(null);

        const isAvailable = availability === "available";


        const existingResponse = responses.find(
            (response) => response.user_id === user.id
        );

        const responseData = {
            is_available: isAvailable,
            comment: comment.trim() || null,
        };

        let query;

        if (existingResponse) {
            query = supabase
                .from("cleaning_responses")
                .update(responseData)
                .eq("id", existingResponse.id)
                .eq("user_id", user.id);
        } else {
            query = supabase
                .from("cleaning_responses")
                .insert({
                    ...responseData,
                    cleaning_id: cleaningId,
                    user_id: user.id,
                });
        }

        const { data, error } = await query.select().single();


        if (error) {
            setSaveError(error.message);
        } else {
            setResponses((previous) => {
                const others = previous.filter(
                    (response) => response.user_id !== user.id
                );

                return [...others, data].sort(
                    (a, b) =>
                        new Date(a.created_at) - new Date(b.created_at)
                );
            });
        }

        setSaving(false);
    }


    if (loading) {
        return <p className="mt-6">Loading responses...</p>;
    }

    if (error) {
        return <p className="mt-6 text-red-600">{error}</p>;
    }

    return (
        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold">
                Availability & Comments
            </h2>


            <form onSubmit={handleSubmit} className="mb-6 space-y-4">
                <fieldset>
                    <legend className="mb-2 font-medium">
                        Can you participate in this cleaning?
                    </legend>

                    <div className="flex gap-6">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="availability"
                                value="available"
                                checked={availability === "available"}
                                onChange={(e) => setAvailability(e.target.value)}
                            />
                            Available
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="availability"
                                value="unavailable"
                                checked={availability === "unavailable"}
                                onChange={(e) => setAvailability(e.target.value)}
                            />
                            Unavailable
                        </label>
                    </div>
                </fieldset>

                <div>
                    <label htmlFor="response-comment" className="mb-2 block font-medium">
                        Comment (optional)
                    </label>

                    <textarea
                        id="response-comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={3}
                        placeholder="Add a comment..."
                        className="w-full rounded-lg border border-slate-300 p-3"
                    />
                </div>

                <button
                    type="submit"
                    disabled={!availability || saving}
                    className="rounded-lg bg-blue-600 px-5 py-2 text-white disabled:opacity-50"
                >
                    Submit Response
                </button>

                {saveError && (
                    <p className="text-red-600">{saveError}</p>
                )}
            </form>



            {responses.length === 0 ? (
                <p className="text-slate-500">No responses yet.</p>
            ) : (
                <div className="space-y-3">
                    <h3 className="font-semibold">
                        Team Responses ({responses.length})
                    </h3>

                    {responses.map((response) => (
                        <div
                            key={response.id}
                            className="rounded-lg border border-slate-200 p-4"
                        >
                            <p className="font-medium">
                                {response.user_id === user?.id
                                    ? "You"
                                    : "Team member"}
                            </p>

                            <p
                                className={
                                    response.is_available
                                        ? "text-green-600"
                                        : "text-red-600"
                                }
                            >
                                {response.is_available
                                    ? "✓ Available"
                                    : "✗ Unavailable"}
                            </p>

                            {response.comment && (
                                <p className="mt-2 text-slate-600">
                                    {response.comment}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}

        </section>
    );
}
