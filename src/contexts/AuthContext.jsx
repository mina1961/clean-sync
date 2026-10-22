
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        supabase.auth.getSession().then(({ data, error }) => {
            if (error) {
                console.error('Session error:', error.message);
            }

            setUser(data?.session?.user ?? null);
            setLoading(false);
        });

        
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const value = {
        user,
        loading,
        isAuthenticated: Boolean(user),
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (context === null) {
        throw new Error(
            'useAuth must be used inside AuthProvider'
        );
    }

    return context;
}
