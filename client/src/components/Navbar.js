// import React, { useState, useEffect, useCallback } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import logo from '../images/logo.png';
// import Login from './Login';
// import Signup from './Signup';
// import Sidebar from './Sidebar';
// import { useSpeechRecognition } from 'react-speech-recognition';
// import '../styles/Navbar.css';

// export default function Navbar() {
//     const [showLoginModal, setShowLoginModal] = useState(false);
//     const [showSignupModal, setShowSignupModal] = useState(false);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [showSidebar, setShowSidebar] = useState(false);
//     const [user, setUser] = useState({});
//     const navigate = useNavigate();
//     const { transcript } = useSpeechRecognition();

//     // Fetch user data from localStorage
//     useEffect(() => {
//         const storedUser = localStorage.getItem('user');
//         if (storedUser) {
//             setUser(JSON.parse(storedUser));
//             setIsAuthenticated(true);
//         }
//     }, []);

//     // Handle voice commands
//     const handleVoiceCommand = useCallback((command) => {
//         if (command.includes('open scanner')) {
//             navigate('/scanner');
//         } else if (command.includes('open captured')) {
//             navigate('/captured');
//         }
//     }, [navigate]);

//     // Effect to trigger actions based on transcript
//     useEffect(() => {
//         if (transcript) {
//             handleVoiceCommand(transcript.toLowerCase());
//         }
//     }, [transcript, handleVoiceCommand]);

//     // Toggle functions
//     const toggleLoginModal = () => setShowLoginModal(prev => !prev);
//     const toggleSignupModal = () => setShowSignupModal(prev => !prev);
//     const toggleSidebar = () => setShowSidebar(prev => !prev);

//     // Handle logout
//     const handleLogout = () => {
//         if (window.confirm('Are you sure you want to logout?')) {
//             localStorage.removeItem('user');
//             setUser({});
//             setIsAuthenticated(false);
//             navigate('/');
//         }
//     };

//     const getProfilePictureUrl = (filename) => {
//         if (filename) {
//             return `http://localhost:5000/uploads/${filename}`;
//         }
//        return '../../public/person.png';
//     };

//     return (
//         <div>
//             <nav className="navbar navbar-expand-lg bg-body-tertiary">
//                 <div className="container-fluid">
//                     <Link className="navbar-brand" to="/">
//                         <img src={logo} alt="Logo" style={{ height: '40px', borderRadius:'50%' }} />
//                     </Link>
//                     <button
//                         className="navbar-toggler"
//                         type="button"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#navbarSupportedContent"
//                         aria-controls="navbarSupportedContent"
//                         aria-expanded="false"
//                         aria-label="Toggle navigation"
//                     >
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                             <li className="nav-item">
//                                 {/* <FontAwesomeIcon
//                                     icon={faMicrophone}
//                                     style={{ height: '25px', cursor: 'pointer', marginRight: '15px' }}
//                                     onClick={() => {
//                                         if (listening) {
//                                             SpeechRecognition.stopListening();
//                                         } else {
//                                             SpeechRecognition.startListening({ continuous: true });
//                                         }
//                                     }}
//                                     className={listening ? 'listening' : ''}
//                                 /> */}
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link active" aria-current="page" to="/">Home</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/scanner">Scanner</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/captured">Captured</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/alarms">Alarms</Link>
//                             </li>
//                         </ul>

//                         <div className="d-flex">
//                             {isAuthenticated ? (
//                                 <>
//                                     <img
//                                         src={getProfilePictureUrl(user.profilePicture)}
//                                         alt="Profile"
//                                         style={{ height: '40px', cursor: 'pointer', borderRadius: '50%' }}
                                         
//                                         onClick={toggleSidebar}
//                                     />
//                                 </>
//                             ) : (
//                                 <>
//                                     <button className="btn btn-outline-success me-2" type="button" onClick={toggleLoginModal}>
//                                         Login
//                                     </button>
//                                     <button className="btn btn-outline-primary" type="button" onClick={toggleSignupModal}>
//                                         Signup
//                                     </button>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </nav>

//             {showSidebar && isAuthenticated && (
//                 <Sidebar user={user} onClose={toggleSidebar} onLogout={handleLogout} />
//             )}

//             {showLoginModal && (
//                 <>
//                     <div className="modal-backdrop show"></div>
//                     <div className="modal show" style={{ display: 'block' }}>
//                         <div className="modal-dialog">
//                             <div className="modal-content">
//                                 <Login
//                                     closeModal={toggleLoginModal}
//                                     onLoginSuccess={(user) => {
//                                         localStorage.setItem('user', JSON.stringify(user));
//                                         setUser(user);
//                                         setIsAuthenticated(true);
//                                     }}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </>
//             )}

//             {showSignupModal && (
//                 <>
//                     <div className="modal-backdrop show"></div>
//                     <div className="modal show" style={{ display: 'block' }}>
//                         <div className="modal-dialog">
//                             <div className="modal-content">
//                                 <div className="modal-body">
//                                     <Signup closeModal={toggleSignupModal} />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }




import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import Login from './Login';
import Signup from './Signup';
import Sidebar from './Sidebar';
import { useSpeechRecognition } from 'react-speech-recognition';
import '../styles/Navbar.css';

export default function Navbar() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const { transcript } = useSpeechRecognition();

    // Fetch user data from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    // Handle voice commands
    const handleVoiceCommand = useCallback((command) => {
        if (command.includes('open scanner')) {
            navigate('/scanner');
        } else if (command.includes('open captured')) {
            navigate('/captured');
        }
    }, [navigate]);

    // Effect to trigger actions based on transcript
    useEffect(() => {
        if (transcript) {
            handleVoiceCommand(transcript.toLowerCase());
        }
    }, [transcript, handleVoiceCommand]);

    // Toggle functions
    const toggleLoginModal = () => setShowLoginModal(prev => !prev);
    const toggleSignupModal = () => setShowSignupModal(prev => !prev);
    const toggleSidebar = () => setShowSidebar(prev => !prev);

    // Handle logout
    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('user');
            setUser({});
            setIsAuthenticated(false);
            navigate('/');
        }
    };

  

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="Logo" style={{ height: '40px', borderRadius: '50%' }} />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                              
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/scanner">Scanner</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/captured">Captured</Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link" to="/alarms">Alarms</Link>
                            </li> */}
                        </ul>

                        <div className="d-flex">
                            {isAuthenticated ? (
                                <>
                                    <span className="nav-link greeting" onClick={toggleSidebar}>
                                        Hi, {user.firstName || 'User'}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <button className="btn btn-outline-success me-2" type="button" onClick={toggleLoginModal}>
                                        Login
                                    </button>
                                    <button className="btn btn-outline-primary" type="button" onClick={toggleSignupModal}>
                                        Signup
                                    </button>
                                </>
                            )}

                        </div>
                    </div>
                </div>
            </nav>

            {showSidebar && isAuthenticated && (
                <Sidebar user={user} onClose={toggleSidebar} onLogout={handleLogout} />
            )}

            {showLoginModal && (
                <>
                    {/* <div className="modal-backdrop show"></div> */}
                    <div className="modal show" style={{ display: 'block' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <Login
                                    closeModal={toggleLoginModal}
                                    onLoginSuccess={(user) => {
                                        localStorage.setItem('user', JSON.stringify(user));
                                        setUser(user);
                                        setIsAuthenticated(true);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}

            {showSignupModal && (
                <>
                    {/* <div className="modal-backdrop show"></div> */}
                    <div className="modal show" style={{ display: 'block' }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <Signup closeModal={toggleSignupModal} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
