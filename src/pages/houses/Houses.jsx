
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

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
        <section>
            <h1>Guest Houses</h1>
            {loading && <p>Loading houses...</p>}

            {!loading && houses.map((house) => (
                <p key={house.id}>{house.name}</p>
            ))}
        </section>
    );
}
