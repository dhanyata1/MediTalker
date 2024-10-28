import React, { useEffect, useState } from 'react';

export default function Feedback() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await fetch('https://meditalker-backend.onrender.com/api/feedback/all');
                if (response.ok) {
                    const data = await response.json();
                    setFeedbacks(data);
                } else {
                    throw new Error('Error fetching feedback');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    const handleDelete = async (id) => {
        console.log("Deleting feedback with ID:", id); // Log the ID for debugging
        const confirmDelete = window.confirm("Are you sure you want to delete this feedback?");
        if (confirmDelete) {
            try {
                const response = await fetch(`https://meditalker-backend.onrender.com/api/feedback/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setFeedbacks(feedbacks.filter(feedback => feedback._id !== id));
                    alert('Feedback deleted successfully');
                } else {
                    const errorText = await response.text(); // Get the error message from the response
                    console.error('Error response status:', response.status);
                    console.error('Error response text:', errorText);
                    throw new Error('Error deleting feedback');
                }
            } catch (error) {
                alert(error.message);
            }
        }
    };


    if (loading) {
        return <p>Loading feedback...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="feedback-list">
            <h2>User Feedback</h2>
            {feedbacks.length === 0 ? (
                <p>No feedback available.</p>
            ) : (
                <table className="feedback-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Feedback</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map((feedback) => (
                            <tr key={feedback._id}>
                                <td>{feedback.name}</td>
                                <td>{feedback.text}</td>
                                <td>{feedback.rating}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(feedback._id)}
                                        style={{
                                            backgroundColor: '#FF4C4C', // Red background
                                            color: '#FFFFFF',            // White text
                                            border: 'none',              // No border
                                            padding: '8px 12px',         // Padding
                                            borderRadius: '4px',         // Rounded corners
                                            cursor: 'pointer',           // Pointer cursor on hover
                                            transition: 'background-color 0.3s', // Smooth transition
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D43F3F'} // Darker red on hover
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF4C4C'} // Reset on leave
                                    >
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
