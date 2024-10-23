import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function FeedbackForm({ onSubmitSuccess = () => { } }) {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [rating, setRating] = useState(5);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const feedback = { name, text, rating: Number(rating) }; // Convert rating to number

        try {
            const response = await fetch('http://localhost:5000/api/feedback/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedback),
            });

            if (response.ok) {
                alert('Feedback submitted successfully');
                onSubmitSuccess(); // Callback to refresh feedback display
                setName(''); // Clear name
                setText(''); // Clear feedback text
                setRating(5); // Reset rating to default
            } else {
                const errorText = await response.text();
                console.error('Error response status:', response.status);
                console.error('Error response text:', errorText);
                alert('Error submitting feedback');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting feedback');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="feedback-form">
            <h3>Leave Your Feedback</h3>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Feedback:</label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                ></textarea>
            </div>
            <div>
                <label>Rating:</label>
                <select value={rating} onChange={(e) => setRating(e.target.value)} required>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                </select>
            </div>
            <button type="submit">Submit Feedback</button>
        </form>
    );
}

FeedbackForm.propTypes = {
    onSubmitSuccess: PropTypes.func
};
