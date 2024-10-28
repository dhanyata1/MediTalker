import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';
import axios from 'axios';
import { useScreenshots } from './AppContext';
import '../styles/Scanner.css';

const Scanner = () => {
    const { screenshots, setScreenshots } = useScreenshots();
    const webcamRef = useRef(null);
    const [medicineInfo, setMedicineInfo] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');
    const [searchText, setSearchText] = useState('');
    const [speechSynthesisInstance, setSpeechSynthesisInstance] = useState(null);

    const handleCapture = async () => {
        setIsProcessing(true);
        setError('');
        setMedicineInfo('');

        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
            try {
                // Recognize text from the image
                const { data: { text } } = await Tesseract.recognize(
                    imageSrc,
                    'eng',
                    { logger: (m) => console.log(m), psm: 6 }
                );

                console.log('OCR Result:', text);

                // Extract medicine name and fetch additional information if needed
                const medicineName = extractMedicineName(text);
                let medicineData = '';

                if (medicineName) {
                    medicineData = await fetchMedicineInfo(medicineName);
                } else {
                    medicineData = 'Medicine name could not be extracted.';
                }

                // Send both imageSrc and extracted text to the backend
                await axios.post('https://meditalker-backend.onrender.com/api/screenshot', { imageSrc, text: medicineData });
                console.log('Screenshot and text saved');

                // Update local state
                setScreenshots([...screenshots, { imageSrc, text: medicineData }]);
                setMedicineInfo(medicineData);
            } catch (err) {
                console.error(err);
                setError('Error occurred during processing.');
            } finally {
                setIsProcessing(false);
            }
        } else {
            setError('Failed to capture image from webcam.');
            setIsProcessing(false);
        }
    };

    const handleSearch = async () => {
        if (!searchText.trim()) {
            setError('Please enter a medicine name.');
            return;
        }
        setIsProcessing(true);
        setError('');
        setMedicineInfo('');

        try {
            await fetchMedicineInfo(searchText.trim());
        } catch (err) {
            console.error(err);
            setError('Error occurred during search.');
        } finally {
            setIsProcessing(false);
        }
    };

    const extractMedicineName = (text) => {
        const cleanedText = text
            .replace(/[^a-zA-Z0-9\s]/g, '') // Remove non-alphanumeric characters
            .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
            .trim(); // Trim leading and trailing spaces
        const potentialNames = cleanedText.split(' ').filter(word => word.length >= 3);
        return potentialNames.length > 0 ? potentialNames.join(' ') : null;
    };

    const fetchMedicineInfo = async (name) => {
        if (!name) {
            setMedicineInfo('No valid medicine name provided.');
            return;
        }

        console.log(`Fetching medicine info for: ${name}`); // Debugging line

        try {
            const nlpResponse = await axios.post('https://meditalker-backend.onrender.com/api/nlp/analyze', { text: name });
            const processedText = nlpResponse.data.answer || name;
            console.log('NLP Response:', processedText);

            const response = await axios.get('https://meditalker-backend.onrender.com/api/medicine', {
                params: { name: processedText }
            });

            console.log('API Response:', response); // Debugging line

            if (response.status === 200) {
                const data = response.data;
                if (data) {
                    const info = `
                        Medicine Name: ${data.name}\n
                        Substitutes: ${data.substitutes.join(', ')}\n
                        Side Effects: ${data.sideEffects.join(', ')}\n
                        Uses: ${data.uses.join(', ')}\n
                        Chemical Class: ${data.chemicalClass}\n
                        Habit Forming: ${data.habitForming}\n
                        Therapeutic Class: ${data.therapeuticClass}\n
                        Action Class: ${data.actionClass}
                    `;
                    setMedicineInfo(info);
                    speakText(info);
                    return info;
                } else {
                    setMedicineInfo('Medicine not found. Please try again.');
                    return 'Medicine not found. Please try again.';
                }
            } else {
                setMedicineInfo('Medicine not found. Please try again.');
                return 'Medicine not found. Please try again.';
            }
        } catch (error) {
            console.error('API Error:', error.response ? error.response.data : error.message); // Improved error logging
            setError('Error fetching medicine information. Please try again later.');
            return 'Error fetching medicine information. Please try again later.';
        }
    };

    const speakText = (text) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';

        setSpeechSynthesisInstance(utterance);
        synth.speak(utterance);
    };

    const stopSpeechSynthesis = () => {
        if (speechSynthesisInstance) {
            window.speechSynthesis.cancel();
            setSpeechSynthesisInstance(null);
        }
    };

    return (
        <div className="scanner-container">
            <div className="scanner">
                <h2>Scan Medicine Packet</h2>
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="webcam"
                />
                <button onClick={handleCapture} disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : 'Capture'}
                </button>
            </div>
            <div className="text-box">
                <h2>Medicine Information</h2>
                {isProcessing ? (
                    <p>Processing the image...</p>
                ) : (
                    <textarea
                        value={medicineInfo || error}
                        readOnly
                        className="medicine-info-textarea"
                        rows="10"
                    />
                )}
                <div className="searchc">
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Enter medicine name"
                        className="search-input"
                    />
                    <button onClick={handleSearch} disabled={isProcessing} className="search-button">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
                <div className="controls">
                    <button onClick={() => speakText(medicineInfo)} disabled={!medicineInfo}>
                        <i className="fas fa-play"></i> Start Speech
                    </button>
                    <button onClick={stopSpeechSynthesis} disabled={!speechSynthesisInstance}>
                        <i className="fas fa-stop"></i> Stop Speech
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Scanner;







// import React, { useState, useRef, useEffect } from 'react';
// import Webcam from 'react-webcam';
// import Tesseract from 'tesseract.js';
// import axios from 'axios';
// import { useScreenshots } from './AppContext';
// import '../styles/Scanner.css';

// const Scanner = () => {
//     const { setScreenshots } = useScreenshots();
//     const webcamRef = useRef(null);
//     const [medicineInfo, setMedicineInfo] = useState('');
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [error, setError] = useState('');
//     const [searchText, setSearchText] = useState('');
//     const captureIntervalRef = useRef(null);
//     const [isSpeaking, setIsSpeaking] = useState(false); // Track speaking state
//     const [isAutoScanning, setIsAutoScanning] = useState(true); // Control auto-scanning state
//     const [isLoading, setIsLoading] = useState(false);

//     const handleCapture = async () => {
//         if (isProcessing || isSpeaking || !isAutoScanning) return; // Prevent capturing while processing, speaking, or auto-scan is disabled
//         setIsProcessing(true);
//         setError('');
//         setMedicineInfo('');

//         const imageSrc = webcamRef.current.getScreenshot();
//         if (imageSrc) {
//             try {
//                 const { data: { text } } = await Tesseract.recognize(
//                     imageSrc,
//                     'eng',
//                     { logger: (m) => console.log(m), psm: 6 }
//                 );

//                 console.log('OCR Result:', text);
//                 const medicineName = extractMedicineName(text);
//                 let medicineData = '';

//                 if (medicineName) {
//                     medicineData = await fetchMedicineInfo(medicineName);
//                 } else {
//                     medicineData = 'Medicine name could not be extracted.';
//                 }

//                 if (medicineData && !medicineData.includes('not found') && !medicineData.includes('Error')) {
//                     // Save screenshot and medicine information only if the medicine is found
//                     await axios.post('http://localhost:5000/api/screenshot', { imageSrc, text: medicineData });
//                     console.log('Screenshot and text saved');
//                     setScreenshots((prev) => [...prev, { imageSrc, text: medicineData }]);
//                     setMedicineInfo(medicineData);
//                 } else {
//                     setMedicineInfo(medicineData);
//                 }
//             } catch (err) {
//                 console.error(err);
//                 setError('Error occurred during processing.');
//             } finally {
//                 setIsProcessing(false);
//                 speakText(medicineInfo); // Start speaking the result after processing
//             }
//         } else {
//             setError('Failed to capture image from webcam.');
//             setIsProcessing(false);
//         }
//     };

//     const startAutoScanning = () => {
//         if (!isAutoScanning) return;
//         captureIntervalRef.current = setInterval(() => {
//             if (!isSpeaking) {
//                 handleCapture(); // Only capture if speaking has finished
//             }
//         }, 5000); // Capture every 5 seconds
//     };

//     const stopAutoScanning = () => {
//         if (captureIntervalRef.current) {
//             clearInterval(captureIntervalRef.current);
//         }
//     };

//     const toggleAutoScanning = () => {
//         setIsAutoScanning(!isAutoScanning);
//         if (isAutoScanning) {
//             stopAutoScanning();
//         } else {
//             startAutoScanning();
//         }
//     };

//     useEffect(() => {
//         startAutoScanning(); // Start scanning when the component mounts

//         return () => {
//             stopAutoScanning(); // Cleanup on unmount
//         };
//     }, [isAutoScanning, isSpeaking]); // Restart scanning when isSpeaking or auto-scanning state changes

//     const handleSearch = async () => {
//         if (!searchText.trim()) {
//             setError('Please enter a medicine name.');
//             return;
//         }
//         setIsProcessing(true);
//         setError('');
//         setMedicineInfo('');

//         try {
//             await fetchMedicineInfo(searchText.trim());
//         } catch (err) {
//             console.error(err);
//             setError('Error occurred during search.');
//         } finally {
//             setIsProcessing(false);
//         }
//     };

//     const extractMedicineName = (text) => {
//         const cleanedText = text
//             .replace(/[^a-zA-Z0-9\s]/g, '')
//             .replace(/\s+/g, ' ')
//             .trim();
//         const potentialNames = cleanedText.split(' ').filter(word => word.length >= 3);
//         return potentialNames.length > 0 ? potentialNames.join(' ') : null;
//     };

//     const fetchMedicineInfo = async (name) => {
//         if (!name) {
//             setMedicineInfo('No valid medicine name provided.');
//             return;
//         }

//         console.log(`Fetching medicine info for: ${name}`);

//         try {
//             const nlpResponse = await axios.post('http://localhost:5000/api/nlp/analyze', { text: name });
//             const processedText = nlpResponse.data.answer || name;
//             console.log('NLP Response:', processedText);

//             const response = await axios.get('http://localhost:5000/api/medicine', {
//                 params: { name: processedText }
//             });

//             console.log('API Response:', response);

//             if (response.status === 200) {
//                 const data = response.data;
//                 if (data) {
//                     const info = `
//                         Medicine Name: ${data.name}\n
//                         Substitutes: ${data.substitutes.join(', ')}\n
//                         Side Effects: ${data.sideEffects.join(', ')}\n
//                         Uses: ${data.uses.join(', ')}\n
//                         Chemical Class: ${data.chemicalClass}\n
//                         Habit Forming: ${data.habitForming}\n
//                         Therapeutic Class: ${data.therapeuticClass}\n
//                         Action Class: ${data.actionClass}
//                     `;
//                     setMedicineInfo(info);
//                     speakText(info);
//                     return info;
//                 } else {
//                     setMedicineInfo('Medicine not found. Please try again.');
//                     return 'Medicine not found. Please try again.';
//                 }
//             } else {
//                 setMedicineInfo('Medicine not found. Please try again.');
//                 return 'Medicine not found. Please try again.';
//             }
//         } catch (error) {
//             console.error('API Error:', error.response ? error.response.data : error.message);
//             setError('Error fetching medicine information. Please try again later.');
//             return 'Error fetching medicine information. Please try again later.';
//         }
//     };

//     const speakText = (text) => {
//         const synth = window.speechSynthesis;
//         const utterance = new SpeechSynthesisUtterance(text);
//         utterance.lang = 'en-US';
//         utterance.onstart = () => setIsSpeaking(true); // Set speaking state
//         utterance.onend = () => {
//             setIsSpeaking(false); // Reset speaking state after speech ends
//             handleCapture(); // Resume scanning after speaking is finished
//         };
//         synth.speak(utterance);
//     };

//     return (
//         <div className="scanner-container">
//             <div className="scanner">
//                 <h2>Scan Medicine Packet</h2>
//                 <Webcam
//                     audio={false}
//                     ref={webcamRef}
//                     screenshotFormat="image/jpeg"
//                     className="webcam"
//                 />
//                 <button onClick={toggleAutoScanning} className="auto-scan-btn">
//                     {isAutoScanning ? 'Stop Scanning' : 'Start Scanning'}
//                 </button>
//             </div>
//             <div className="text-box">
//                 <h2>Medicine Information</h2>
//                 {isProcessing ? (
//                     <p>Processing the image...</p>
//                 ) : (
//                     <textarea
//                         value={medicineInfo || error}
//                         readOnly
//                         className="medicine-info-textarea"
//                         rows="10"
//                     />
//                 )}
//                 <div className="searchc">
//                     <input
//                         type="text"
//                         value={searchText}
//                         onChange={(e) => setSearchText(e.target.value)}
//                         placeholder="Enter medicine name"
//                         className="search-input"
//                     />
//                     <button onClick={handleSearch} disabled={isProcessing} className="search-btn">Search</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Scanner;
