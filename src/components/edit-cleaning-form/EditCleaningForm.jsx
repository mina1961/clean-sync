import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function EditCleaningForm({
    cleaning,
    onCancel,
    onUpdated,
}) {
    const [cleaningDate, setCleaningDate] = useState(
        cleaning.cleaning_date
    );

    const [cleaningTime, setCleaningTime] = useState(
        cleaning.cleaning_time.slice(0, 5)
    );

    async function handleSubmit(event) {
        event.preventDefault();

        const { data, error } = await supabase
            .from("cleanings")
            .update({
                cleaning_date: cleaningDate,
                cleaning_time: cleaningTime,
            })
            .eq("id", cleaning.id)
            .select()
            .single();

        if (error) {
            alert("Error updating cleaning: " + error.message);
            return;
        }

        onUpdated(data);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-8 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
        >
            <h3 className="mb-2 text-2xl font-bold text-slate-950">
                Edit Cleaning
            </h3>

            <label htmlFor="edit-cleaning-date">
                Cleaning Date
            </label>
            <input
                id="edit-cleaning-date"
                type="date"
                value={cleaningDate}
                onChange={(event) =>
                    setCleaningDate(event.target.value)
                }
                required
            />

            <label htmlFor="edit-cleaning-time">
                Cleaning Time
            </label>
            <input
                id="edit-cleaning-time"
                type="time"
                value={cleaningTime}
                onChange={(event) =>
                    setCleaningTime(event.target.value)
                }
                required
            />

            <div className="flex items-center gap-4 pt-4">
                <button
                    type="submit"
                    className="rounded-lg bg-lime-400 px-6 py-3 font-semibold text-slate-950 transition-colors hover:bg-lime-500"
                >
                    Save Changes
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg border border-slate-200 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                >
                    Cancel
                </button>
            </div>

            {/* <button type="submit">Save Changes</button>

            <button type="button" onClick={onCancel}>
                Cancel
            </button> */}
        </form>
    );
}