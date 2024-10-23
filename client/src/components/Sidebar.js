// import React from 'react';
// import '../styles/Sidebar.css';
// import { FaTimes } from 'react-icons/fa'; // Font Awesome close icon
// import PropTypes from 'prop-types'; // Import PropTypes for prop type validation

// export default function Sidebar({ user, onClose, onLogout, onEditProfile }) {
//     return (
//         <div className="sidebar">
//             <button className="btn-close" onClick={onClose}>
//                 <FaTimes /> {/* Font Awesome close icon */}
//             </button>
//             <div className="sidebar-content">
//                 <div className="profile-logo">
                   
//                 </div>
//                 <h2>Your Profile</h2>
//                 <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
//                 <p><strong>Email:</strong> {user.email}</p>
//                 <p><strong>Mobile Number:</strong> {user.phoneNumber}</p>
//                 <p><strong>Address:</strong> {user.address}</p>
//                 <p><strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}</p>
//                 <p><strong>Gender:</strong> {user.gender}</p>

//                 {/* Update Profile Button */}
//                 <button className="btn btn-primary mt-3" onClick={onEditProfile}>
//                     Update Profile
//                 </button>

//                 <button className="btn btn-outline-danger mt-3" onClick={onLogout}>
//                     Logout
//                 </button>
//             </div>
//         </div>
//     );
// }

// // Define prop types for Sidebar component
// Sidebar.propTypes = {
//     user: PropTypes.object.isRequired,
//     onClose: PropTypes.func.isRequired,
//     onLogout: PropTypes.func.isRequired,
//     onEditProfile: PropTypes.func.isRequired,
// };



import React, { useState } from 'react';
import '../styles/Sidebar.css';
import { FaTimes } from 'react-icons/fa'; // Font Awesome close icon
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import UpdateProfileModal from './UpdateProfileModal'; // Import the modal

export default function Sidebar({ user, onClose, onLogout }) {
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    // Function to handle updating the user profile data
    const handleUpdateProfile = (updatedData) => {
        // Handle the update logic here (e.g., send updatedData to the server)
        console.log('Updated Data:', updatedData);

        // Close the modal after updating
        setShowUpdateModal(false);
    };

    return (
        <div className="sidebar">
            <button className="btn-close" onClick={onClose}>
                <FaTimes /> {/* Font Awesome close icon */}
            </button>
            <div className="sidebar-content">
                <div className="profile-logo">
                    {/* Add your profile image here if needed
                    <img
                        src={`public/uploads/${user.profilePicture}`}
                        alt="Profile"
                        className="profile-image"
                    /> */}
                </div>
                <h2>Your Profile</h2>
                <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Mobile Number:</strong> {user.phoneNumber}</p>
                <p><strong>Address:</strong> {user.address}</p>
                <p><strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}</p>
                <p><strong>Gender:</strong> {user.gender}</p>

                {/* Update Profile Button */}
                <button
                    className="btn btn-primary mt-3"
                    onClick={() => setShowUpdateModal(true)}
                >
                    Update Profile
                </button>

                <button
                    className="btn btn-outline-danger mt-3"
                    onClick={onLogout}
                >
                    Logout
                </button>
            </div>

            {/* Render the Update Profile Modal */}
            {showUpdateModal && (
                <UpdateProfileModal
                    user={user} // Pass the user object to the modal
                    onClose={() => setShowUpdateModal(false)} // Function to close the modal
                    onUpdate={handleUpdateProfile} // Callback for handling updates
                />
            )}
        </div>
    );
}

// Define prop types for Sidebar component
Sidebar.propTypes = {
    user: PropTypes.object.isRequired, // User object is required
    onClose: PropTypes.func.isRequired, // onClose function is required
    onLogout: PropTypes.func.isRequired, // onLogout function is required
};
