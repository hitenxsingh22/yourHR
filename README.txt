YourHR Job Search Service
YourHR is a job search service designed to help job seekers find ideal job roles based on their qualifications and preferences. This web application allows users to sign up, fill out their personal information, and upload their resumes.

Table of Contents
Project Structure
Prerequisites
Installation
Running the Application
Frontend
Backend
Viewing the Resume


Project Structure
The project is divided into two main folders:

frontend/ - Contains the Next.js frontend code.
backend/ - Contains the Express.js backend code.

Prerequisites
Before running the application, make sure you have the following installed:

Node.js (v14.x or later)
MongoDB (local or cloud instance)

Installation

Install Dependencies

Frontend
npm install

Backend
npm install



Running the Application
Frontend
Navigate to the frontend directory:

cd frontend
Start the frontend development server:
npm run dev
The frontend will be running on http://localhost:3000.



Backend
Navigate to the backend directory:

cd backend
Make sure your MongoDB server is running, and update the .env file with your MongoDB connection string if needed.

Start the backend server:

bash
Copy code
npm start
The backend will be running on http://localhost:5000.


Viewing the Resume
To view a user's uploaded resume:

Ensure the backend is running and connected to your MongoDB database.

Access the API route to view or download a resume:

http://localhost:5000/api/resume/:filename
Replace :filename with the actual filename stored in the database. This will trigger the API to retrieve and stream the resume file from the database.
