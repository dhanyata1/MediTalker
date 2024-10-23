import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import AdminsData from './AdminsData';
import User from './User';
import '../../styles/AdminDashboard.css';
import LoggedUser from './LoggedUser';
import ContactQueries from './ContactQueries';
import Feedback from './Feedback';


export default function AdminDashboard() {
    return (
        <div className="admin-dashboard">
            <header className="navbar">
                <div className="navbar-logo">
                    <h2>Meditalker</h2>
                </div>
                <nav>
                    <ul>
                        <li><Link to="/admin/overview">Admins Data</Link></li>
                        <li><Link to="/admin/users">Users</Link></li> {/* Update path to /admin/users */}
                        <li><Link to="/admin/login">Login Data</Link></li>
                        <li><Link to="/admin/queries">Queries</Link></li>
                        <li><Link to="/admin/feedbacks">User Feeedbacks</Link></li>

                    </ul>
                </nav>
            </header>

            <div className="main-content">
                <h1>Welcome to Admin Dashboard</h1>
                <div className="content-body">
                    <Routes>
                        <Route path="overview" element={<AdminsData />} />
                        <Route path="users" element={<User />} />
                        <Route path="login" element={<LoggedUser />}></Route>
                        <Route path="queries" element={<ContactQueries />}></Route>
                        <Route path="feedbacks" element={<Feedback/>}></Route>
                    </Routes>
                </div>
            </div>
        </div>
    );
}
