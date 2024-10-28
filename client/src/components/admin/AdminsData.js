import React, { useEffect, useState } from 'react';
import '../../styles/AdminDashboard.css';

export default function AdminsData() {
    const [admins, setAdmins] = useState([]);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [updatedPassword, setUpdatedPassword] = useState(''); // New state for password

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await fetch('https://meditalker-backend.onrender.com/api/admin/get-admins');
                const data = await response.json();
                setAdmins(data);
            } catch (error) {
                console.error('Error fetching admin data:', error);
            }
        };

        fetchAdmins();
    }, []);

    const handleSelectAdmin = (admin) => {
        setSelectedAdmin(admin);
        setUpdatedName(admin.name);
        setUpdatedEmail(admin.email);
        setUpdatedPassword(''); // Reset password input on selection
    };

    const handleUpdateAdmin = async (id) => {
        console.log('Updating Admin with ID:', id);

        try {
            const response = await fetch(`http://localhost:5000/api/admin/update-admin/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: updatedName,
                    email: updatedEmail,
                    password: updatedPassword // Include password in update
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server Error:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedAdmin = await response.json();
            setAdmins((prevAdmins) =>
                prevAdmins.map((admin) => (admin._id === id ? updatedAdmin : admin))
            );
            setSelectedAdmin(null); // Close the form after update
        } catch (error) {
            console.error('Error updating admin:', error);
        }
    };

    return (
        <div className="admins-data">
            {admins.map((admin, index) => (
                <div key={index} className="card">
                    <h2>{admin.name}</h2>
                    <p>{admin.email}</p>
                    <button className="update-admin-button" onClick={() => handleSelectAdmin(admin)}>Update Admin</button>
                </div>
            ))}

            {selectedAdmin && (
                <>
                    <div className="modal-overlay" onClick={() => setSelectedAdmin(null)}></div>
                    <div className="update-form">
                        <h3>Update Admin</h3>
                        <input
                            type="text"
                            value={updatedName}
                            placeholder="Name"
                            onChange={(e) => setUpdatedName(e.target.value)}
                        />
                        <input
                            type="email"
                            value={updatedEmail}
                            placeholder="Email"
                            onChange={(e) => setUpdatedEmail(e.target.value)}
                        />
                        <input
                            type="password" 
                            value={updatedPassword}
                            placeholder="New Password"
                            onChange={(e) => setUpdatedPassword(e.target.value)}
                        />
                        <button onClick={() => handleUpdateAdmin(selectedAdmin._id)}>
                            Update
                        </button>
                        <button onClick={() => setSelectedAdmin(null)}>Cancel</button>
                    </div>
                </>
            )}
        </div>
    );
}
