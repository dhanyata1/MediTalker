// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { FaTimes } from 'react-icons/fa'; // Font Awesome close icon
// import '../styles/UpdateProfileModal.css'; // Import CSS for styling
// import axios from 'axios'; // Import axios for making HTTP requests

// const UpdateProfileModal = ({ user, onClose, onUpdate }) => {
//     const [formData, setFormData] = useState({
//         firstName: user.firstName || '',
//         lastName: user.lastName || '',
//         email: user.email || '',
//         phoneNumber: user.phoneNumber || '',
//         address: user.address || '',
//         dateOfBirth: user.dateOfBirth || '',
//         gender: user.gender || '',
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             // Make a PUT request to update user profile
//             const response = await axios.put(`/api/users/${user._id}`, formData);

//             // Call the onUpdate function with the updated user data
//             onUpdate(response.data);

//             // Close the modal after updating
//             onClose();
//         } catch (error) {
//             console.error('Error updating profile:', error);
//             alert('An error occurred while updating the profile. Please try again.'); // Display error message
//         }
//     };

//     return (
//         <div className="modal">
//             <div className="modal-content">
//                 <button className="btn-close" onClick={onClose}>
//                     <FaTimes />
//                 </button>
//                 <h2>Update</h2>
//                 <form onSubmit={handleSubmit}>
//                     <label>
//                         First Name:
//                         <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
//                     </label>
//                     <label>
//                         Last Name:
//                         <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
//                     </label>
//                     <label>
//                         Email:
//                         <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//                     </label>
//                     <label>
//                         Mobile Number:
//                         <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
//                     </label>
//                     <label>
//                         Address:
//                         <input type="text" name="address" value={formData.address} onChange={handleChange} required />
//                     </label>
//                     <label>
//                         Date of Birth:
//                         <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
//                     </label>
//                     <label>
//                         Gender:
//                         <select name="gender" value={formData.gender} onChange={handleChange} required>
//                             <option value="">Select</option>
//                             <option value="male">Male</option>
//                             <option value="female">Female</option>
//                             <option value="other">Other</option>
//                         </select>
//                     </label>
//                     <button type="submit" className="btn btn-primary">Save Changes</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// // Prop types for UpdateProfileModal
// UpdateProfileModal.propTypes = {
//     user: PropTypes.object.isRequired,
//     onClose: PropTypes.func.isRequired,
//     onUpdate: PropTypes.func.isRequired,
// };

// export default UpdateProfileModal;






import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa'; // Font Awesome close icon
import '../styles/UpdateProfileModal.css'; // Import CSS for styling
import axios from 'axios'; 

const UpdateProfileModal = ({ user, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        address: user.address || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || '',
    });

    // Handle changes to form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Log the user object and the request URL for debugging
        const userId = user.id || user._id;
        if (!userId) {
            alert('User ID is missing. Cannot update profile.');
            return;
        }

        console.log(`Sending PUT request to: /api/users/${userId}`);
        console.log('User object:', user);

        try {
            // Make a PUT request to update user profile
            const response = await axios.put(`/api/users/${userId}`, formData);

            // Call the onUpdate function with the updated user data
            onUpdate(response.data);

            // Close the modal after updating
            onClose();
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating the profile. Please try again.');
        }
    };


    return (
        <div className="modal">
            <div className="modal-content">
                <button className="btn-close" onClick={onClose}>
                    <FaTimes />
                </button>
                <h2>Update Profile</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        First Name:
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Mobile Number:
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Address:
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Date of Birth:
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Gender:
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                    <button type="submit" className="btn btn-primary">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

// Define prop types for UpdateProfileModal component
UpdateProfileModal.propTypes = {
    user: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default UpdateProfileModal; // Export the component
