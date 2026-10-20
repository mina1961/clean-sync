import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AddCleaningForm({ houseId, onCleaningAdded }) {
    const [cleaningDate, setCleaningDate] = useState("");
    const [cleaningTime, setCleaningTime] = useState("");


    const [adults, setAdults] = useState("");
    const [children, setChildren] = useState("");

    const [welcomePackage, setWelcomePackage] = useState(false);
    const [lateArrival, setLateArrival] = useState(false);
    const [leaveLightsOn, setLeaveLightsOn] = useState(false);


    async function handleSubmit(event) {
        event.preventDefault();

        const { data, error } = await supabase
            .from("cleanings")

            .insert({
                house_id: houseId,
                cleaning_date: cleaningDate,
                cleaning_time: cleaningTime,
                status: "scheduled",
                adults: Number(adults),
                children: Number(children),
                welcome_package: welcomePackage,
                late_arrival: lateArrival,
                leave_lights_on: leaveLightsOn,
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
        setAdults("");
        setChildren("");
        setWelcomePackage(false);
        setLateArrival(false);
        setLeaveLightsOn(false);
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


            {/* Incoming Guests */}
            <h3 className="text-lg font-semibold text-slate-900">
                Incoming Guests
            </h3>

            <label htmlFor="adults">Adults</label>
            <input
                id="adults"
                type="number"
                min="0"
                required
                value={adults}
                onChange={(event) => setAdults(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900"
            />

            <label htmlFor="children">Children</label>
            <input
                id="children"
                type="number"
                min="0"
                required
                value={children}
                onChange={(event) => setChildren(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900"
            />

            {/* Special Requirements */}
            <h3 className="text-lg font-semibold text-slate-900">
                Special Requirements
            </h3>

            <label className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={welcomePackage}
                    onChange={(event) => setWelcomePackage(event.target.checked)}
                />
                Welcome Package
            </label>

            <label className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={lateArrival}
                    onChange={(event) => setLateArrival(event.target.checked)}
                />
                Late Arrival
            </label>

            <label className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={leaveLightsOn}
                    onChange={(event) => setLeaveLightsOn(event.target.checked)}
                />
                Leave Lights On
            </label>


            <button
                type="submit"
                className="mt-2 w-full rounded-lg bg-slate-950 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-lime-400 hover:text-slate-950"
            >
                Save Cleaning
            </button>
        </form>
    );
}