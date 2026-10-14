
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import './Register.css';

export default function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
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
        setMessage('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });

            if (error) throw error;

            if (data.session) {
                setMessage('Registration successful!');
            } else {
                setMessage('Check your email to confirm your account.');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

   
return (
    <main className="register-page">
        <div className="register-card">
            <h2 className="register-title">Create Account</h2>

            <p className="register-subtitle">
                Join your cleaning team
            </p>

            <form className="register-form" onSubmit={submitHandler}>
                <div className="register-field">
                    <label htmlFor="register-email">Email</label>
                    <input
                        id="register-email"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={changeHandler}
                        required
                    />
                </div>

                <div className="register-field">
                    <label htmlFor="register-password">Password</label>
                    <input
                        id="register-password"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={changeHandler}
                        required
                        minLength={6}
                    />
                </div>

                <div className="register-field">
                    <label htmlFor="register-confirm-password">
                        Confirm Password
                    </label>
                    <input
                        id="register-confirm-password"
                        type="password"
                        name="confirmPassword"
                        placeholder="Repeat your password"
                        value={formData.confirmPassword}
                        onChange={changeHandler}
                        required
                    />
                </div>

                {error && (
                    <p className="register-error" role="alert">
                        {error}
                    </p>
                )}

                {message && (
                    <p className="register-success" role="status">
                        {message}
                    </p>
                )}

                <button
                    className="register-button"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Registering...' : 'Create Account →'}
                </button>
            </form>

            <p className="register-footer">
                Already have an account?{' '}
                <a href="/login">Log in</a>
            </p>
        </div>
    </main>
);

}
