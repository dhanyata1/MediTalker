// AdminLayout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const adminEmails = [
    "dhanyataphule4263@gmail.com",
    "pranjali.s.shinde@gmail.com",
    "shreyasomdale2003@gmail.com",
    "gaikwadrutuja825@gmail.com"
];

const AdminLayout = ({ children }) => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));
    const isAdmin = user && adminEmails.includes(user.email);

    if (!isAdmin) {
        navigate('/');
        return null;
    }

    return (
        <div className="AdminLayout">
            <main>{children}</main>
        </div>
    );
};

export default AdminLayout;
