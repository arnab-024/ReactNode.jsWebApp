# Training & Training Need Management System

A MERN stack web application developed as part of a technical internship assignment.

The application is designed to manage employees, departments, training courses, training assignments, and training needs/competency information through a centralized web interface.

---

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- Lucide React
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- REST APIs

---

## Project Structure

```text
React+Node.js web App/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── server.js
│   ├── db.js
│   ├── .env
│   └── package.json
│
└── frontend/
    └── vite-project/
        ├── src/
        │   ├── components/
        │   │   └── Sidebar.jsx
        │   │
        │   ├── pages/
        │   │   ├── Dashboard.jsx
        │   │   ├── Employees.jsx
        │   │   ├── Departments.jsx
        │   │   ├── Trainings.jsx
        │   │   └── TNI.jsx
        │   │
        │   ├── App.jsx
        │   ├── main.jsx
        │   └── index.css
        │
        └── package.json


Features & Implemented Functionality
1. Employee Management

The application provides employee management functionality including:

Employee listing
Search employees
Department filtering
Designation filtering
Status filtering
Add employee
Edit employee
Delete employee
Employee status management
Joining date
Employee rating
Education details
JPPL experience
Total experience
Department association
Manager association
Automatically generated Employee ID
Automatically generated employee email
Employee data fetched dynamically from MongoDB

Employee CRUD operations are connected to the backend REST APIs.

2. Department Management

Department management functionality includes:

Department listing
Add department
Edit department
Delete department
Department name
HOD
Budget
Description
Department ID
Employee count

Department CRUD operations are connected to MongoDB through REST APIs.

3. Training Management

The Training Management section provides:

Training course listing
Search courses
Create training course
Edit training course
Delete training course
Training category
Training duration
Training status
Training description
Active/Draft status
Manage training assignments

The UI is designed based on the structure and visual references provided in the internship assignment.

4. Training Mapping

Training-to-employee mapping functionality has been implemented.

The system supports:

Assigning an employee to a training course
Viewing employees assigned to a course
Tracking training progress
Storing proficiency levels
Removing an employee from a training course
Preventing duplicate employee-training mappings

The mapping system maintains a unique employee and training combination to prevent duplicate assignments.

5. TNI / Competency Mapping

A dedicated TNI (Training Needs / Competency Mapping) section has been included.

The TNI section is designed to support:

Department selection
Employee selection
Year selection
Employee information
Competency matrix
Required competency level
Self-assessment
HOD assessment
Competency gap
Training requirement indication

The TNI functionality is currently a work in progress and requires further backend and frontend implementation.

6. Dashboard

A dashboard section has been included as the main landing page of the application.

The dashboard is intended to provide an overview of organizational information such as:

Employee statistics
Department statistics
Training statistics
Employee distribution
Training activity
Organizational KPIs
Department-level information

The dashboard is currently under development and can be extended with additional analytics, charts and KPIs.

7. Navigation

Client-side navigation has been implemented using React Router DOM.

The application contains navigation for:

Dashboard
Employees
Departments
Training Management
TNI

A sidebar provides navigation between the different sections of the application.

Backend

The backend follows a REST API architecture with separate:

Models
Controllers
Routes
Database connection
Main API modules
/api/employees
/api/departments
/api/trainings
/api/training-mappings

MongoDB is used as the database and Mongoose is used for schema definition and database interaction.

Database Models

The application currently uses the following main data models:

Employee

Stores information such as:

Employee ID
Name
Email
Department
Designation
Manager
Status
Joining Date
Rating
Education
JPPL Experience
Total Experience
Department

Stores:

Department ID
Department Name
HOD
Budget
Description
Training

Stores:

Training ID
Title
Category
Duration
Status
Description
Training Mapping

Stores the relationship between employees and training courses, including:

Employee
Training
Progress
Proficiency
Current Project Status

The project contains a functional MERN stack foundation with several completed management modules.

Working
Employee CRUD
Department CRUD
Training CRUD
Training mapping CRUD
Employee search
Employee filters
Training search
MongoDB database connection
REST APIs
React frontend
React Router navigation
Sidebar navigation
Add/Edit/Delete workflows
Training assignment workflow
Training progress and proficiency data
Responsive UI structure
Reference-inspired UI for the main management pages
Work in Progress

The following areas still require additional development:

Complete TNI backend implementation
Complete TNI frontend workflow
Complete dashboard analytics
Additional dashboard charts and KPIs
Complete integration between TNI and training workflows
Training plans and evaluations
Advanced validation and error handling
Additional UI refinements
More extensive responsive design
Authentication and authorization
Production deployment
Automated testing
Future Improvements

Possible future improvements include:

User authentication
Role-based access control
Admin and HOD permissions
Complete TNI workflow
Training plans
Training evaluations
Department-specific dashboards
Advanced employee analytics
Advanced training analytics
Export functionality
Improved form validation
Centralized error handling
Automated unit and integration testing
Production deployment
Improved mobile responsiveness
Running the Project
Prerequisites

Make sure the following are installed:

Node.js
npm
MongoDB / MongoDB Atlas
Backend Setup

Navigate to the backend directory:

cd backend

Install dependencies:

npm install

Create a .env file and configure the MongoDB connection:

MONGO_URI=your_mongodb_connection_string
PORT=3000

Start the backend development server:

npm run dev

The backend runs on:

http://localhost:3000
Frontend Setup

Open another terminal and navigate to the frontend:

cd frontend/vite-project

Install dependencies:

npm install

Start the Vite development server:

npm run dev

Vite will provide the local development URL in the terminal.

Application Workflow

The main application workflow is:

Dashboard
    │
    ├── Employees
    │      ├── Add Employee
    │      ├── Edit Employee
    │      └── Delete Employee
    │
    ├── Departments
    │      ├── Add Department
    │      ├── Edit Department
    │      └── Delete Department
    │
    ├── Training Management
    │      ├── Create Course
    │      ├── Edit Course
    │      ├── Delete Course
    │      └── Manage / Assign Employees
    │
    └── TNI
           └── Competency Mapping
Development Notes

This project was developed to demonstrate practical implementation of a MERN stack web application.

The project focuses on:

REST API development
MongoDB data modeling
Mongoose schemas
CRUD operations
React component development
React Router navigation
API integration using Axios
Employee and department management
Training course management
Employee-training mapping
Competency and training need management
Dashboard development
Responsive UI design

The application currently has a working foundation for its core management modules, while some advanced functionality remains under development.

Project Status

Status: Functional Prototype / Work in Progress

The core employee, department, training and training-mapping functionality has been implemented and connected to the backend.

The TNI module, advanced dashboard analytics, authentication, production deployment and several additional refinements are planned for future development.
