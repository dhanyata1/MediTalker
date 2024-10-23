// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useScreenshots } from './AppContext';
// import '../styles/CapturedScreenshots.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faVolumeUp, faStop } from '@fortawesome/free-solid-svg-icons';

// const CapturedScreenshots = () => {
//     const { screenshots, setScreenshots } = useScreenshots();
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [selectedText, setSelectedText] = useState('');
//     const [error, setError] = useState('');
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [alarmTime, setAlarmTime] = useState('');

//     useEffect(() => {
//         axios.get('http://localhost:5000/api/screenshot')
//             .then(response => {
//                 setScreenshots(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching screenshots:', error);
//             });
//     }, [setScreenshots]);

//     const handleDelete = (index) => {
//         const imageSrc = screenshots[index].imageSrc;

//         axios.delete('http://localhost:5000/api/screenshot', { data: { imageSrc } })
//             .then(response => {
//                 console.log(response.data.message);
//                 setScreenshots(screenshots.filter((_, i) => i !== index));
//             })
//             .catch(error => {
//                 console.error('Error deleting screenshot:', error);
//                 setError('Error deleting screenshot. Please try again.');
//             });
//     };

//     const handleSetAlarm = () => {
//         if (!alarmTime) {
//             alert('Please set a valid alarm time.');
//             return;
//         }

//         const alarmInMs = new Date(alarmTime) - new Date();

//         if (alarmInMs > 0) {
//             setTimeout(() => {
//                 alert('Time to take your medicine!');
//                 handlePlayText();
//             }, alarmInMs);
//             alert(`Alarm set for ${new Date(alarmTime).toLocaleTimeString()}`);
//         } else {
//             alert('Please set a future time for the alarm.');
//         }
//     };

//     const handleViewMore = (index) => {
//         const { imageSrc, text } = screenshots[index];
//         setSelectedImage(imageSrc);
//         setSelectedText(text);
//     };

//     const handleCloseModal = () => {
//         setSelectedImage(null);
//         setSelectedText('');
//         setError('');
//     };

//     const handlePlayText = () => {
//         if ('speechSynthesis' in window) {
//             if (isPlaying) {
//                 speechSynthesis.cancel();
//                 setIsPlaying(false);
//             } else {
//                 const utterance = new SpeechSynthesisUtterance(selectedText);
//                 utterance.voice = speechSynthesis.getVoices().find(voice => voice.name.includes('Female')) || speechSynthesis.getVoices()[0];

//                 utterance.onstart = () => setIsPlaying(true);
//                 utterance.onend = () => setIsPlaying(false);

//                 speechSynthesis.speak(utterance);
//             }
//         } else {
//             setError('Speech Synthesis not supported in this browser.');
//         }
//     };

//     return (
//         <div className="captured-screenshots">
//             <h2>Captured Screenshots</h2>
//             <div className="screenshots-container">
//                 {screenshots.map(({ imageSrc, text }, index) => (
//                     <div key={index} className="screenshot-item">
//                         <img src={imageSrc} alt={`Screenshot ${index + 1}`} className="screenshot-img" />
//                         <div className="actions">
//                             <button onClick={() => handleViewMore(index)}>View More</button>
//                             <button onClick={() => handleDelete(index)}>Delete</button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             {selectedImage && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <span className="close" onClick={handleCloseModal}>&times;</span>
//                         <div className="modal-body">
//                             <img src={selectedImage} alt="Selected Screenshot" className="modal-img" />
//                             <textarea
//                                 value={selectedText}
//                                 readOnly
//                                 className="medicine-info"
//                                 rows="10"
//                             />
//                         </div>
//                         <div className="modal-footer">
//                             <input
//                                 type="datetime-local"
//                                 value={alarmTime}
//                                 onChange={(e) => setAlarmTime(e.target.value)}
//                                 className="alarm-input"
//                             />
//                             <button className="set-alarm-button" onClick={handleSetAlarm}>Set Alarm</button>

//                             <button className="sound-icon" onClick={handlePlayText}>
//                                 <FontAwesomeIcon icon={isPlaying ? faStop : faVolumeUp} size="2x" />
//                             </button>
//                         </div>
//                         {error && <p className="error-message">{error}</p>}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CapturedScreenshots;







import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useScreenshots } from './AppContext';
import '../styles/CapturedScreenshots.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faStop } from '@fortawesome/free-solid-svg-icons';

const CapturedScreenshots = () => {
    const { screenshots, setScreenshots } = useScreenshots();
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedText, setSelectedText] = useState('');
    const [error, setError] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [alarmTime, setAlarmTime] = useState('');
    const [selectedRingtone, setSelectedRingtone] = useState('');

    // List of available ringtones
    const ringtones = [
        'ring1.mp3',
        'ring2.mp3',
        'ring3.mp3',
    ];

    // Request notification permission and fetch screenshots when the component mounts
    useEffect(() => {
        const requestNotificationPermission = async () => {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                console.error('Notification permission denied.');
            }
        };

        requestNotificationPermission();

        const fetchScreenshots = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/screenshot');
                setScreenshots(response.data);
            } catch (error) {
                console.error('Error fetching screenshots:', error);
            }
        };

        fetchScreenshots();
    }, [setScreenshots]);

    const handleDelete = async (index) => {
        const imageSrc = screenshots[index].imageSrc;

        try {
            const response = await axios.delete('http://localhost:5000/api/screenshot', { data: { imageSrc } });
            console.log(response.data.message);
            setScreenshots((prev) => prev.filter((_, i) => i !== index));
        } catch (error) {
            console.error('Error deleting screenshot:', error);
            setError('Error deleting screenshot. Please try again.');
        }
    };

    const handleSetAlarm = () => {
        if (!alarmTime) {
            alert('Please set a valid alarm time.');
            return;
        }

        const alarmInMs = new Date(alarmTime) - new Date();

        if (alarmInMs > 0) {
            setTimeout(() => {
                showNotification(selectedText);
                handlePlayRingtone(); // Play the selected ringtone when the alarm rings
            }, alarmInMs);
            alert(`Alarm set for ${new Date(alarmTime).toLocaleTimeString()}`);
        } else {
            alert('Please set a future time for the alarm.');
        }
    };

    const handleViewMore = (index) => {
        const { imageSrc, text } = screenshots[index];
        setSelectedImage(imageSrc);
        setSelectedText(text);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
        setSelectedText('');
        setError('');
        setAlarmTime(''); // Reset alarm time when closing modal
        setSelectedRingtone(''); // Reset ringtone when closing modal
    };

    const handlePlayText = () => {
        if ('speechSynthesis' in window) {
            if (isPlaying) {
                speechSynthesis.cancel();
                setIsPlaying(false);
            } else {
                const utterance = new SpeechSynthesisUtterance(selectedText);
                utterance.voice = speechSynthesis.getVoices().find(voice => voice.name.includes('Female')) || speechSynthesis.getVoices()[0];

                utterance.onstart = () => setIsPlaying(true);
                utterance.onend = () => setIsPlaying(false);

                speechSynthesis.speak(utterance);
            }
        } else {
            setError('Speech Synthesis not supported in this browser.');
        }
    };

    const handlePlayRingtone = () => {
        if (selectedRingtone) {
            const audioUrl = `${process.env.PUBLIC_URL}/uploads/${selectedRingtone}`; // Ensure the correct path
            console.log('Audio URL:', audioUrl); // Log the audio URL
            const audio = new Audio(audioUrl);
            audio.play().catch(error => {
                console.error('Error playing audio:', error);
            });
        } else {
            console.error('No ringtone selected.');
        }
    };

    // Show notification
    const showNotification = (medicineName) => {
        const notification = new Notification('Medicine Reminder', {
            body: `Time to take your medicine: ${medicineName}`,
        });
    };

    return (
        <div className="captured-screenshots">
            <h2>Captured Screenshots</h2>
            <div className="screenshots-container">
                {screenshots.map(({ imageSrc, text }, index) => (
                    <div key={index} className="screenshot-item">
                        <img src={imageSrc} alt={`Screenshot ${index + 1}`} className="screenshot-img" />
                        <div className="actions">
                            <button onClick={() => handleViewMore(index)}>View More</button>
                            <button onClick={() => handleDelete(index)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedImage && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <div className="modal-body">
                            <img src={selectedImage} alt="Selected Screenshot" className="modal-img" />
                            <textarea
                                value={selectedText}
                                readOnly
                                className="medicine-info"
                                rows="10"
                            />
                        </div>
                        <div className="modal-footer">
                            <input
                                type="datetime-local"
                                value={alarmTime}
                                onChange={(e) => setAlarmTime(e.target.value)}
                                className="alarm-input"
                            />
                            <select
                                value={selectedRingtone}
                                onChange={(e) => setSelectedRingtone(e.target.value)}
                                className="ringtone-select"
                            >
                                <option value="">Select Ringtone</option>
                                {ringtones.map((ringtone, index) => (
                                    <option key={index} value={ringtone}>{ringtone}</option>
                                ))}
                            </select>
                            <button className="set-alarm-button" onClick={handleSetAlarm}>Set Alarm</button>

                            <button className="sound-icon" onClick={handlePlayText}>
                                <FontAwesomeIcon icon={isPlaying ? faStop : faVolumeUp} size="2x" />
                            </button>
                        </div>
                        {error && <p className="error-message">{error}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CapturedScreenshots;
