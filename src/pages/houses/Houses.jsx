
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import HouseCard from '../../components/house-card/HouseCard';
import './Houses.css';
export default function Houses() {
    const [houses, setHouses] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchHouses() {
            const { data, error } = await supabase
                .from('houses')
                .select('*');

            if (error) {
                console.error('Error fetching houses:', error.message);
            } else {
                setHouses(data);
            }

            setLoading(false);
        }

        fetchHouses();
    }, []);

    return (
        <section className="houses-page">
            <div className="houses-header">
                <h1>Guest Houses</h1>
                <p>Explore the guest houses managed by CleanSync.</p>
            </div>
            <div className="houses-grid">
                {!loading && houses.map((house) => (
                    <HouseCard key={house.id} house={house} />
                ))}
            </div>
        </section>
    );
}
