import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';


const UserLayout = ({ children }) => {
    return (
        <div className="UserLayout">
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default UserLayout;
