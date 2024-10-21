# Meditalker

Meditalker is a web application designed to help visually impaired users by converting text on medicine packets into speech. 
Users can scan medicine packets using their device camera, and the website will read out the captured text aloud. 
The application also provides a user-friendly interface for scanning, managing, and listening to the text with voice commands.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)


## Features
- **Text-to-Speech**: Converts the captured text from medicine packets into speech.
- **User Authentication**: Secure user sign-up and login functionality with hashed passwords.
- **Profile Management**: Users can upload and manage their profile details.
- **Admin Panel**: Admin dashboard to manage user data and activities.
- **Responsive Design**: Works on different screen sizes and devices.


## Tech Stack

- **Frontend**: 
  - **React**: The application is built using React for creating a responsive and interactive user interface.
  - **HTML5 & CSS3**: Used for structuring and styling the web pages to enhance the visual appeal and user experience.
  - **JavaScript**: Provides the dynamic behavior for the front-end, enabling real-time interactivity and voice commands.

- **Backend**:
  - **Node.js**: Server-side runtime environment used for handling requests, connecting to the database, and managing APIs.
  - **Express.js**: A web framework for Node.js used to create RESTful APIs and handle routing.

- **Database**:
  - **MongoDB**: NoSQL database for storing user information, including authentication data and profile details.

- **Speech API**:
  - **Web Speech API**: Utilized for implementing text-to-speech conversion and speech recognition, allowing users to interact with the app through voice commands.

- **Authentication**:
  - **JWT (JSON Web Tokens)**: Used for secure user authentication and session management.
  - **Bcrypt**: A library used to hash passwords and securely store user credentials.



## Installation

### Prerequisites

- Node.js installed on your machine
- MongoDB instance or MongoDB Atlas account

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/dhanyata1/MediTalker.git
    ```

2. Navigate to the project directory:

    ```bash
    cd MediTalker
    ```

3. Install the dependencies for both the client and server:

    ```bash
    cd client
    npm install
    
    cd server
    npm install
    ```

4. Create a `.env` file in the root directory and add your environment variables:

    ```bash
    MONGO_URI=<your-mongo-uri>
    JWT_SECRET=<your-jwt-secret>
    ```

5. Start the development server:

    - For backend:

    ```bash
    cd server
    npm start
    ```

    - For frontend:

    ```bash
    cd client
    npm start
    ```

6. Visit `http://localhost:3000` to use the application.

## Usage

- **Sign Up/Login**: Users can register by filling out their details.
- **Scanning**: After logging in, users can click on "Open Scanner" to scan medicine packets.
- **Admin Dashboard**: The admin can log in with specific credentials to manage user data.



