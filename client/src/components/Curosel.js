import React, { useEffect, useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';

import slider1 from '../images/slider1.png';
import slider2 from '../images/slider2.png';
import slider3 from '../images/slider3.png';

import firstImage from '../images/first.png';
import secondImage from '../images/second.png';
import thirdImage from '../images/third.png';
import '../styles/Curosel.css';
import Contact from './Contact';
import AboutUs from './About';

const images = [
    { src: slider1, alt: 'slide 1', cardTitle: 'Card 1', cardText: 'This is an example card to display some content.' },
    { src: slider2, alt: 'slide 2', cardTitle: 'Card 2', cardText: 'This is an example card to display some content.' },
    { src: slider3, alt: 'slide 3', cardTitle: 'Card 3', cardText: 'This is an example card to display some content.' }
];

export default function Curosel() {
    const [testimonials, setTestimonials] = useState([]);

    // Fetch feedback from backend
    const fetchFeedback = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/feedback/all`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTestimonials(data);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        }
    };

    useEffect(() => {
        fetchFeedback();
        const interval = setInterval(() => {
            const nextButton = document.querySelector('#carouselExample .carousel-control-next');
            if (nextButton) {
                nextButton.click();
            }
        }, 3000); // 3 seconds interval

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, []);

    // Function to render star ratings
    function renderStars(rating) {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<i key={i} className="fa fa-star" aria-hidden="true"></i>); // filled star
            } else {
                stars.push(<i key={i} className="fa fa-star-o" aria-hidden="true"></i>); // empty star
            }
        }
        return stars;
    }



    return (
        <div>
            {/* Carousel Section */}
            <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {images.map((image, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <img src={image.src} className="d-block w-100" alt={image.alt} />
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* About Us Section */}
            <AboutUs />

                   {/* Showcase Section */}
            <section className="showcase">
                <h2>How It Works</h2>
                <div className="showcase-images">
                    <div className="showcase-card">
                        <img src={firstImage} alt="Step 1" />
                        <h3 className="showcase-card-title">Step 1: Scan Medicine</h3>
                        <p>Scan the medicine packet to capture its details quickly and accurately.</p>
                    </div>
                    <div className="showcase-card">
                        <img src={secondImage} alt="Step 2" />
                        <h3 className="showcase-card-title">Step 2: View Stored Results</h3>
                        <p>Access stored results for easy reference to past scans and details.</p>
                    </div>
                    <div className="showcase-card">
                        <img src={thirdImage} alt="Step 3" />
                        <h3 className="showcase-card-title">Step 3: Detailed Information</h3>
                        <p>Get detailed information about each scanned medicine, including usage and dosage.</p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials">
                <h2>Voices of Satisfaction</h2>
                <div className="marquee-container">
                    {/* Left to Right */}
                    <div className="marquee-left">
                        <div className="testimonial-row">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="testimonial-card">
                                    <p>{testimonial.text}</p>
                                    <h4>- {testimonial.name}</h4>
                                    <div className="star-rating">
                                        {renderStars(testimonial.rating)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Right to Left */}
                    <div className="marquee-right">
                        <div className="testimonial-row">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="testimonial-card">
                                    <p>{testimonial.text}</p>
                                    <h4>- {testimonial.name}</h4>
                                    <div className="star-rating">
                                        {renderStars(testimonial.rating)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <Contact />
        </div>
    );
}
