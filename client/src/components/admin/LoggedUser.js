import React, { useEffect, useState } from 'react';
import '../../styles/LoggedUser.css';

function LoggedUser() {
    const [loginData, setLoginData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchLoginData() {
            try {
                const response = await fetch('http://localhost:5000/api/users/login');
                const contentType = response.headers.get('content-type');

                console.log('Response status:', response.status);
                console.log('Content-Type:', contentType);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    setLoginData(data);
                } else {
                    throw new Error('Received non-JSON response');
                }
            } catch (err) {
                console.error('Failed to fetch login data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchLoginData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/login/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Failed to delete item with ID: ${id}`);
            }

            // Update state to remove the deleted item from the UI
            setLoginData(loginData.filter(item => item._id !== id));
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    if (loading) {
        return <p className="loading">Loading...</p>;
    }

    if (error) {
        return <p className="error">Error: {error}</p>;
    }

    return (
        <div className="logged-user">
            <h2>Logged User Data</h2>
            {loginData.length > 0 ? (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Login Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loginData.map((item) => (
                            <tr key={item._id}>
                                <td>{item._id}</td>
                                <td>{item.userId ? item.userId._id : 'N/A'}</td>
                                <td>{item.userId ? `${item.userId.firstName} ${item.userId.lastName}` : 'N/A'}</td>
                                <td>{item.email}</td>
                                <td>{new Date(item.loginTime).toLocaleString()}</td>
                                <td>
                                    <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No login data available.</p>
            )}
        </div>
    );
}

export default LoggedUser;
