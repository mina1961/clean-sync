import "./Schedule.css";
import CleaningCard from "../../components/cleaning-card/CleaningCard";

const cleanings = [
    {
        id: 1,
        house: "Villa Aurora",
        date: "12 October",
        time: "10:00",
    },
    {
        id: 2,
        house: "Villa Marina",
        date: "14 October",
        time: "11:30",
    },
    {
        id: 3,
        house: "Villa Sunset",
        date: "16 October",
        time: "09:00",
    },
];
export default function Schedule() {
    return (
    <main className="schedule-page">

        <div className="schedule-heading">
            <p className="mono">OPERATIONS / SCHEDULE</p>
            <h1>Cleaning Schedule</h1>
            <span>Upcoming guest house cleanings</span>
        </div>

        <div className="cleaning-grid">
            {cleanings.map((cleaning) => (
                <CleaningCard
                    key={cleaning.id}
                    house={cleaning.house}
                    date={cleaning.date}
                    time={cleaning.time}
                />
            ))}
        </div>

    </main>
);
}