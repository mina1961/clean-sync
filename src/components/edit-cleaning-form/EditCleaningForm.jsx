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
        <form onSubmit={handleSubmit}>
            <h3>Edit Cleaning</h3>

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

            <button type="submit">Save Changes</button>

            <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
}