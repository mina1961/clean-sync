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
        <form onSubmit={handleSubmit}>
            <h3>Add Cleaning</h3>

            <label htmlFor="cleaning-date">Cleaning Date</label>
            <input
                id="cleaning-date"
                type="date"
                value={cleaningDate}
                onChange={(event) => setCleaningDate(event.target.value)}
                required
            />

            <label htmlFor="cleaning-time">Cleaning Time</label>
            <input
                id="cleaning-time"
                type="time"
                value={cleaningTime}
                onChange={(event) => setCleaningTime(event.target.value)}
                required
            />

            <button type="submit">Save Cleaning</button>
        </form>
    );
}