import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { AppProvider } from './components/AppContext';
import UserLayout from './components/UserLayout';
import AdminLayout from './components/AdminLayout';
import Curosel from './components/Curosel';
import Scanner from './components/Scanner';
import Alarms from './components/Alarms';
import CapturedScreenshots from './components/CapturedScreenshots';
import AdminDashboard from './components/admin/AdminDashboard';
import Contact from './components/Contact';
import AboutUs from './components/About';
import FeedbackForm from './components/FeedbackForm';

function App() {
  return (
    <Router>
      <AppProvider>
        <Routes>
          {/* User Routes */}
          <Route
            path="/"
            element={
              <UserLayout>
                <Curosel />
              </UserLayout>
            }
          />

          <Route
            path="/contact"
            element={
              <UserLayout>                
                <Contact/>
              </UserLayout>
            }
          />
          <Route
            path="/feedback"
            element={
              <UserLayout>
                <FeedbackForm/>
              </UserLayout>
            }
          />
          <Route
            path="/about"
            element={
              <UserLayout>
                <AboutUs />
              </UserLayout>
            }
          />
          <Route
            path="/scanner"
            element={
              <UserLayout>
                <Scanner />
              </UserLayout>
            }
          />
          <Route
            path="/captured"
            element={
              <UserLayout>
                <CapturedScreenshots />
              </UserLayout>
            }
          />
          <Route
            path="/alarms"
            element={
              <UserLayout>
                <Alarms/>
              </UserLayout>
            }
          />

          {/* Admin Route */}
          <Route
            path="/admin/*"
            element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            }
          />
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;
