// components/Alarms.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Alarms = ({ userId }) => {
    const [alarms, setAlarms] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAlarms = async () => {
            try {
                const response = await axios.get(`https://meditalker-backend.onrender.com/api/alarms/${userId}`);
                setAlarms(response.data);
            } catch (error) {
                console.error('Error fetching alarms:', error);
                setError('Failed to load alarms.');
            }
        };

        fetchAlarms();
    }, [userId]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/alarms/${id}`);
            setAlarms((prevAlarms) => prevAlarms.filter((alarm) => alarm._id !== id));
        } catch (error) {
            console.error('Error deleting alarm:', error);
            setError('Failed to delete alarm.');
        }
    };

    return (
        <div className="alarms">
            <h2>Your Alarms</h2>
            {error && <p className="error-message">{error}</p>}
            <ul>
                {alarms.map((alarm) => (
                    <li key={alarm._id}>
                        {alarm.medicineName} - {new Date(alarm.alarmTime).toLocaleString()}
                        <button onClick={() => handleDelete(alarm._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Alarms;
