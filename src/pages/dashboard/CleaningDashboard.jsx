import { useEffect } from "react";

export default function Dashboard() {

    useEffect(() => {
        console.log('Hello CleanSync!')
    })

    return (
        <main style={{ padding: '40px' }}>
            <h1>Cleaning Dashboard</h1>
            <p>Welcome to your private workspace!</p>
        </main>
    );
}
