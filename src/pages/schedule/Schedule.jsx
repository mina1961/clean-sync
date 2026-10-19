import "./Schedule.css";
import CleaningCard from "../../components/cleaning-card/CleaningCard";
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const cleanings = []

export default function Schedule() {

    const [cleanings, setCleanings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCleanings() {
            const { data, error } = await supabase
                .from('cleanings')
                .select(`
                id,
                cleaning_date,
                cleaning_time,
                status,
                houses(name)
            `)
                .order('cleaning_date', { ascending: true });

            if (error) {
                console.error('Error fetching cleanings:', error.message);
            } else {
                setCleanings(data);
            }

            setLoading(false);
        }

        fetchCleanings();
    }, []);

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
                        house={cleaning.houses?.name}
                        date={cleaning.cleaning_date}
                        time={cleaning.cleaning_time?.slice(0, 5)}
                    />
                ))}
            </div>
        </main>
    );
}