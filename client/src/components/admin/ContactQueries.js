import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/ContactQueries.css';

export default function ContactQueries() {
    const [queries, setQueries] = useState([]);

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const response = await axios.get('https://meditalker-backend.onrender.com/api/contact/queries');
                setQueries(response.data);
            } catch (err) {
                console.error('Error fetching contact queries:', err);
            }
        };

        fetchQueries();
    }, []);

    const handleDelete = async (id) => {
        console.log('Deleting query with ID:', id); // Log the ID
        try {
            await axios.delete(`https://meditalker-backend.onrender.com/api/contact/queries/${id}`);
            setQueries(queries.filter(query => query._id !== id));
        } catch (err) {
            console.error('Error deleting contact query:', err);
        }
    };

    const handleReply = (email) => {
        const subject = encodeURIComponent('Reply to your query');
        const body = encodeURIComponent('Dear User,\n\nThank you for reaching out. We have received your message and will get back to you shortly.\n\nBest regards,\nYour Team');
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    };

    return (
        <div className="contact-queries">
            <h2>Contact Queries</h2>
            {queries.length > 0 ? (
                <ul>
                    {queries.map((query) => (
                        <li key={query._id}>
                            <p><strong>Name:</strong> {query.name}</p>
                            <p><strong>Email:</strong> {query.email}</p>
                            <p><strong>Subject:</strong> {query.subject}</p>
                            <p><strong>Message:</strong> {query.message}</p>
                            <p><strong>Date:</strong> {new Date(query.date).toLocaleString()}</p>
                            <button className="reply-button" onClick={() => handleReply(query.email)}>Reply</button>
                            <button className="delete-button" onClick={() => handleDelete(query._id)}>Delete</button>
                            <hr />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-queries">No contact queries found.</p>
            )}
        </div>
    );
}
