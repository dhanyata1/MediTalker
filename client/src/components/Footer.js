import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Footer.css'; // Ensure this CSS file contains the updated styles

export default function Footer() {
    return (
        <footer className="text-center text-lg-start">
            <div className="container p-2">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <h5 className="text-uppercase">About Us</h5>
                        <p className="small">
                            MediTalker assists visually impaired individuals by converting text on medicine packets into speech through advanced OCR and synthesis technologies.
                        </p>
                    </div>

                    <div className="col-md-4 mb-3">
                        <h5 className="text-uppercase">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About Us</Link></li> {/* Updated link */}
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/feedback">Feedback</Link></li> {/* Updated link */}
                        </ul>
                    </div>

                    <div className="col-md-4 mb-3">
                        <h5 className="text-uppercase">Follow Us</h5>
                        <a href="https://www.facebook.com" className="me-2" aria-label="Facebook">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://www.twitter.com" className="me-2" aria-label="Twitter">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://www.instagram.com" className="me-2" aria-label="Instagram">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://www.linkedin.com" aria-label="LinkedIn">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div className="text-center p-2 ft">
                <small>
                    © 2024 MediTalker. All Rights Reserved.
                </small>
            </div>
        </footer>
    );
}
