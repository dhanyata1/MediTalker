import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Adjust the path as needed

const Login = ({ closeModal, onLoginSuccess }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // List of admin emails
    const adminEmails = [
        "dhanyataphule4263@gmail.com",
        "pranjali.s.shinde@gmail.com",
        "shreyasomdale2003@gmail.com",
        "gaikwadrutuja825@gmail.com"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.email) tempErrors.email = 'Email is required';
        if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email is invalid';
        if (!formData.password) tempErrors.password = 'Password is required';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await axios.post('https://meditalker-backend.onrender.com/api/auth/login', formData);
                setMessage(response.data.message);
                if (response.data.success) {
                    // Store user data in local storage
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    onLoginSuccess(response.data.user);

                    // Check if the user is an admin
                    if (adminEmails.includes(response.data.user.email)) {
                        navigate('/admin'); // Redirect to the admin panel
                    } else {
                        navigate('/'); // Redirect to the regular user dashboard or homepage
                    }

                    closeModal();
                }
            } catch (err) {
                setMessage('Invalid email or password');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>

                    {message && <p className="message">{message}</p>}
                    <div className="button-group">
                        <button type="submit" className="login-button">Login</button>
                        <button type="button" className="cancel-button" onClick={closeModal}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
