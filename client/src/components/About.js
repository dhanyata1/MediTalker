import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState } from 'react';
import '../styles/AboutUs.css';

const AboutUs = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);

    const handleSpeak = () => {
        const text = `
            
            
            How It Works:
            1. Scan the medicine packet using the camera.
            2. The app captures the image and extracts the text from the medicine packet.
            3. It provides comprehensive information about the medicine, including substitutes, side effects, and therapeutic class.
            4. The information is read out loud, making it accessible to visually impaired users.

            Meditalker is here to ensure that everyone can access essential medication information easily and independently. With its user-friendly interface and powerful features, it brings a new level of convenience and safety to managing health.
        `;
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = 'en-US';

        speech.onstart = () => {
            setIsSpeaking(true);
        };

        speech.onend = () => {
            setIsSpeaking(false);
        };

        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }

        window.speechSynthesis.speak(speech);
    };

    const handleStop = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    return (
        <div className="about-us-container">
            <div className="about-us-header">
                <h1>
                    About Meditalker
                    <button className="sound-icon" onClick={isSpeaking ? handleStop : handleSpeak}>
                        <i className={`bi ${isSpeaking ? 'bi-stop' : 'bi-volume-up'}`}></i>
                    </button>
                </h1>
            </div>
            <div className="about-us-content">
                <p>
                    Meditalker is a cutting-edge application designed to assist visually impaired individuals in identifying and understanding their medications. By simply scanning a medicine packet, Meditalker provides detailed information about the medicine, including its name, possible substitutes, side effects, and uses. The application converts the scanned text into speech, ensuring that the information is accessible to everyone.
                </p>

                <div className="medicine-info-example">
                    <h2>How It Works:</h2>
                    <ul>
                        <li>Scan the medicine packet using the camera.</li>
                        <li>The app captures the image and extracts the text from the medicine packet.</li>
                        <li>It provides comprehensive information about the medicine, including substitutes, side effects, and therapeutic class.</li>
                        <li>The information is read out loud, making it accessible to visually impaired users.</li>
                    </ul>
                </div>

                <div className="about-us-footer">
                    <p>Meditalker is here to ensure that everyone can access essential medication information easily and independently. With its user-friendly interface and powerful features, it brings a new level of convenience and safety to managing health.</p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
