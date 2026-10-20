import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AddCleaningForm({ houseId, onCleaningAdded }) {
    const [cleaningDate, setCleaningDate] = useState("");
    const [cleaningTime, setCleaningTime] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        const { data, error } = await supabase
            .from("cleanings")
            .insert({
                house_id: houseId,
                cleaning_date: cleaningDate,
                cleaning_time: cleaningTime,
                status: "scheduled",
            })
            .select()
            .single();

        if (error) {
            console.error("Error saving cleaning:", error.message);
            alert("Error: " + error.message);
            return;
        }

        onCleaningAdded(data);

        setCleaningDate("");
        setCleaningTime("");
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 md:p-8"
        >
            <h3 className="text-2xl font-bold text-slate-900">
                Add Cleaning
            </h3>

            <label htmlFor="cleaning-date">Cleaning Date</label>
            <input
                id="cleaning-date"
                type="date"
                value={cleaningDate}
                onChange={(event) => setCleaningDate(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-lime-400 focus:outline-none"
                required
            />

            <label htmlFor="cleaning-time">Cleaning Time</label>
            <input
                id="cleaning-time"
                type="time"
                value={cleaningTime}
                onChange={(event) => setCleaningTime(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-lime-400 focus:outline-none"
                required
            />

            <button
                type="submit"
                className="mt-2 w-full rounded-lg bg-slate-950 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-lime-400 hover:text-slate-950"
            >
                Save Cleaning
            </button>
        </form>
    );
}