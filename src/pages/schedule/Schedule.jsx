import "./Schedule.css";
import CleaningCard from "../../components/cleaning-card/CleaningCard";
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from "../../contexts/AuthContext";
import VillaCard from "../../components/villa-card/VillaCard";

const cleanings = []

export default function Schedule() {

    const { isAuthenticated, loading: authLoading } = useAuth();
    const [cleanings, setCleanings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [villas, setVillas] = useState([]);


    useEffect(() => {
        if (authLoading) return;

        if (!isAuthenticated) {
            setCleanings([]);
            setLoading(false);
            return;
        }

        async function fetchCleanings() {
            setLoading(true);

            const { data, error } = await supabase
                .from('cleanings')
                .select(`
                id,
                house_id,
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
    }, [isAuthenticated, authLoading]);


    useEffect(() => {
        if (authLoading || isAuthenticated) return;

        async function fetchVillas() {
            const { data, error } = await supabase
                .from("houses")
                .select("*")
                .order("name", { ascending: true });

            if (error) {
                console.error("Error fetching villas:", error.message);
            } else {
                setVillas(data);
            }
        }

        fetchVillas();
    }, [authLoading, isAuthenticated]);



    const groupedCleanings = Object.groupBy(
        cleanings,
        (cleaning) => cleaning.house_id
    );


    if (authLoading) {
        return <p>Checking your session...</p>;
    }

    if (!isAuthenticated) {
        return (
            <main className="schedule-page">
                <div className="schedule-heading">
                    <p className="mono">DISCOVER / OUR VILLAS</p>
                    <h1>Explore Our Villas</h1>
                    <span>Beautiful holiday villas in Polis, Cyprus</span>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {villas.map((villa) => (
                        <VillaCard key={villa.id} villa={villa} />
                    ))}
                </div>
            </main>
        );
    }


    return (
        <main className="schedule-page">
            <div className="schedule-heading">
                <p className="mono">OPERATIONS / SCHEDULE</p>
                <h1>Cleaning Schedule</h1>
                <span>Upcoming guest house cleanings</span>
            </div>
            <div className="cleaning-grid">
                {Object.entries(groupedCleanings).map(([houseId, houseCleanings]) => (
                    <CleaningCard
                        key={houseId}
                        house={houseCleanings[0].houses?.name}
                        cleanings={houseCleanings}
                    />
                ))}
            </div>
        </main>
    );
}