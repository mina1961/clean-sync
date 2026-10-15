
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { supabase } from '../../lib/supabase';
import '../register/Register.css';

export default function Login() {

const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    function changeHandler(e) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function submitHandler(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (error) throw error;

            // След успешен вход засега отиваме на Home.
            navigate('/dashboard', { replace: true });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="register-page">
            <div className="register-card">
                <h1 className="register-title">Welcome Back</h1>

                <p className="register-subtitle">
                    Sign in to your CleanSync account
                </p>

                <form className="register-form" onSubmit={submitHandler} autoComplete="off">
                    <div className="register-field">
                        <label htmlFor="login-email">Email</label>
                        <input
                            id="login-email"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={changeHandler}
                            required
                        />
                    </div>

                    <div className="register-field">
                        <label htmlFor="login-password">Password</label>
                        <input
                            id="login-password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={changeHandler}
                            required
                        />
                    </div>

                    {error && (
                        <p className="register-error" role="alert">
                            {error}
                        </p>
                    )}

                    <button
                        className="register-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In →'}
                    </button>
                </form>

                <p className="register-footer">
                    Don't have an account?{' '}
                    <Link to="/register">Create Account</Link>
                </p>
            </div>
        </main>
    );
}
