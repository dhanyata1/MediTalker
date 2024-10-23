// src/components/Signup.js

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Signup.css';

const Signup = ({ closeModal }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        address: '',
        dateOfBirth: '',
        gender: '',
        profilePicture: null,
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    

    const validate = () => {
        let tempErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;

        if (!formData.firstName.trim()) tempErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) tempErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) {
            tempErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            tempErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
            tempErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            tempErrors.password = 'Password must be at least 6 characters';
        }
        if (!formData.confirmPassword) {
            tempErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            tempErrors.confirmPassword = 'Passwords do not match';
        }
        if (!formData.phoneNumber.trim()) {
            tempErrors.phoneNumber = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phoneNumber)) {
            tempErrors.phoneNumber = 'Phone number is invalid';
        }
        if (!formData.address.trim()) tempErrors.address = 'Address is required';
        if (!formData.dateOfBirth) tempErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.gender) tempErrors.gender = 'Gender is required';
        // Profile picture is optional but you can uncomment below line to make it required
        // if (!formData.profilePicture) tempErrors.profilePicture = 'Profile picture is required';

        return tempErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tempErrors = validate();
        if (Object.keys(tempErrors).length === 0) {
            setErrors({});
            setIsSubmitting(true);
            const data = new FormData();
            for (let key in formData) {
                data.append(key, formData[key]);
            }
            try {
                const response = await axios.post('http://localhost:5000/api/auth/signup', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setMessage('Signup successful! You can now log in.');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    phoneNumber: '',
                    address: '',
                    dateOfBirth: '',
                    gender: '',
                    profilePicture: null,
                });
                // Optionally close the modal or redirect the user
                if (closeModal) closeModal();
            } catch (error) {
                console.error('Error during signup:', error);
                if (error.response && error.response.data && error.response.data.message) {
                    setMessage(error.response.data.message);
                } else {
                    setMessage('An error occurred during signup. Please try again later.');
                }
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setErrors(tempErrors);
        }
    };

    const handleCancel = () => {
       
        if (closeModal) closeModal(); 
    };


    return (
        <div className="signup-form-container">
            <center>
                <h2>Sign Up</h2>
            </center>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="firstName">First Name<span className="required">*</span></label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={errors.firstName ? 'error-input' : ''}
                    />
                    {errors.firstName && <small className="error-text">{errors.firstName}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name<span className="required">*</span></label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={errors.lastName ? 'error-input' : ''}
                    />
                    {errors.lastName && <small className="error-text">{errors.lastName}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email<span className="required">*</span></label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error-input' : ''}
                    />
                    {errors.email && <small className="error-text">{errors.email}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password<span className="required">*</span></label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? 'error-input' : ''}
                    />
                    {errors.password && <small className="error-text">{errors.password}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password<span className="required">*</span></label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={errors.confirmPassword ? 'error-input' : ''}
                    />
                    {errors.confirmPassword && <small className="error-text">{errors.confirmPassword}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number<span className="required">*</span></label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className={errors.phoneNumber ? 'error-input' : ''}
                    />
                    {errors.phoneNumber && <small className="error-text">{errors.phoneNumber}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address<span className="required">*</span></label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={errors.address ? 'error-input' : ''}
                    />
                    {errors.address && <small className="error-text">{errors.address}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth<span className="required">*</span></label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className={errors.dateOfBirth ? 'error-input' : ''}
                    />
                    {errors.dateOfBirth && <small className="error-text">{errors.dateOfBirth}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender<span className="required">*</span></label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={errors.gender ? 'error-input' : ''}
                    >
                        <option value="">--Select Gender--</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer_not_to_say">Prefer not to say</option>
                    </select>
                    {errors.gender && <small className="error-text">{errors.gender}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="profilePicture">Profile Picture</label>
                    <input
                        type="file"
                        id="profilePicture"
                        name="profilePicture"
                        accept="image/*"
                        onChange={handleChange}
                        className={errors.profilePicture ? 'error-input' : ''}
                    />
                    {errors.profilePicture && <small className="error-text">{errors.profilePicture}</small>}
                </div>
                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Sign Up'}
                </button>
                <button type="button" className="btn-cancel" onClick={handleCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default Signup;
