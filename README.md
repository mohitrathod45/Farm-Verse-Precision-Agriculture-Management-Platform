# 🌱 FarmVerse – Precision Agriculture Management Platform

FarmVerse is a full-stack web application designed to help farmers manage their farms, crops, irrigation, fertilizers, weather information, reports, and other agricultural activities through a centralized platform.

The platform also includes AI-based crop recommendation, profit estimation, email notifications, and secure user authentication.

---

## 📖 About

FarmVerse – Precision Agriculture Management Platform provides a centralized dashboard for managing agricultural activities digitally.

The application allows farmers to:

- Manage farms and crops
- Track irrigation activities
- Manage fertilizer information
- View weather information
- Generate and view reports
- Receive email notifications and OTPs
- Get AI-based crop recommendations
- Estimate agricultural profit
- Manage their user profile securely

The application uses a React.js frontend, Spring Boot backend, MySQL database, external weather APIs, SMTP email services, and a Python-based machine learning model.

---

# 🚀 Features

## 🔐 User Authentication

- User Registration
- User Login
- JWT-based Authentication
- Spring Security
- Protected routes and APIs
- User-specific data access

---

## 📊 Dashboard

The dashboard provides an overview of the farmer's agricultural activities.

- Farm overview
- Crop information
- Agricultural activity summary
- Quick access to major modules
- User-specific information

---

## 🌾 Farm Management

Farmers can manage their farm information through CRUD operations.

- Add Farm
- View Farms
- Update Farm
- Delete Farm
- Store farm details
- Manage user-specific farms

---

## 🌱 Crop Management

Farmers can manage crops associated with their farms.

- Add Crop
- View Crops
- Update Crop
- Delete Crop
- Store crop information
- Associate crops with farms

---

## 💧 Irrigation Management

The Irrigation module helps farmers manage irrigation-related activities.

- Add irrigation records
- View irrigation records
- Update irrigation records
- Delete irrigation records
- Manage irrigation activities

---

## 🧪 Fertilizer Management

The Fertilizer module allows farmers to manage fertilizer-related information.

- Add fertilizer records
- View fertilizer records
- Update fertilizer records
- Delete fertilizer records
- Manage fertilizer activities

---

## 🌦️ Weather Information

FarmVerse integrates the **Open-Meteo API** to provide weather information.

### Weather Data

The application provides:

- Location information
- Current temperature
- Humidity
- Wind speed
- Current precipitation
- Weather condition
- Seven-day weather forecast
- Maximum temperature
- Minimum temperature
- Precipitation probability
- Precipitation amount

### Farming Insights

The application generates farming-related insights based on:

- Humidity
- Rainfall
- Temperature

For example, it can provide warnings regarding high humidity, rainfall conditions, and high temperatures.

### APIs Used

- Open-Meteo Geocoding API
- Open-Meteo Forecast API

---

## 🤖 AI Crop Recommendation

FarmVerse includes an AI-based crop recommendation system.

The machine learning model is trained using agricultural and environmental parameters to recommend a suitable crop.

### Input Parameters

The model uses:

- Nitrogen (N)
- Phosphorus (P)
- Potassium (K)
- Temperature
- Humidity
- Soil pH
- Rainfall

### Machine Learning Model

- Random Forest Classifier
- Python
- pandas
- scikit-learn
- joblib

The trained model is saved and loaded during prediction to generate crop recommendations.

### Prediction Flow

N, P, K
Temperature
Humidity
pH
Rainfall
       ↓
Random Forest Model
       ↓
Recommended Crop

💰 Profit Estimation

FarmVerse provides a profit-estimation feature to help farmers understand the expected profitability of their agricultural activities.

The feature allows users to provide relevant agricultural information and obtain an estimated profit based on the provided inputs.

📧 Email & OTP Notifications

FarmVerse supports email-based OTP and notification functionality.

Features
OTP generation
OTP verification
Email notifications
SMTP server integration
Email-based user verification

The application uses an SMTP server to send OTPs and notifications to users.

📄 Reports

The Reports module provides structured agricultural information for users.

View farm-related information
Organize agricultural data
Generate and access reports
Support farm activity analysis

👤 User Profile

The Profile module allows authenticated users to view and manage their profile information.

🛠️ Technology Stack
Frontend
React.js
Vite
JavaScript
Tailwind CSS
React Router
React Icons
Axios / Fetch API
Backend
Java
Spring Boot
Spring MVC
Spring Security
Spring Data JPA
Hibernate
REST APIs
JWT Authentication
Maven
Database
MySQL
JPA / Hibernate
Artificial Intelligence
Python
pandas
scikit-learn
Random Forest Classifier
joblib
External Services
Weather
Open-Meteo Geocoding API
Open-Meteo Forecast API
Email
SMTP Server
Email / OTP Service
Development & Testing Tools
Git
GitHub
Postman
IntelliJ IDEA
Visual Studio Code
Maven

▶️ Execution Steps

1. Clone the Repository
git clone https://github.com/mohitrathod45/Farm-Verse-Precision-Agriculture-Management-Platform.git

cd Farm-Verse-Precision-Agriculture-Management-Platform
2. Frontend Setup

Navigate to the frontend directory:

cd Frontend

Install the dependencies:

npm install

Start the development server:

npm run dev

The frontend will normally start at:

http://localhost:5173
3. Backend Setup

Open a new terminal and navigate to the backend directory:

cd farmverse-backend

Build the Spring Boot application:

mvn clean install

Start the backend:

mvn spring-boot:run

The backend will normally start at:

http://localhost:8080
4. Database Configuration

FarmVerse uses MySQL for storing application data.

Configure the database settings in:

farmverse-backend/src/main/resources/application.properties

Configure the required:

Database URL
Database username
Database password

After configuring the database, restart the Spring Boot application.

Do not commit database passwords or other sensitive credentials to GitHub.

5. Email / SMTP Configuration

Email functionality requires SMTP configuration.

Configure the required SMTP settings and credentials in the backend configuration.

The SMTP service is used for:

OTP emails
User verification
Email notifications

Do not expose SMTP passwords or other sensitive credentials in the source code.

6. AI Model Setup

The AI crop recommendation functionality uses a trained Random Forest model.

The AI-related files include:

Crop_recommendation.csv
app.py
predict.py
crop_recommendation_model.pkl

The model is trained using:

N
P
K
Temperature
Humidity
pH
Rainfall

The trained model is loaded during prediction to recommend a suitable crop.

7. Login

Start both the frontend and backend.

Open:

http://localhost:5173

Create a new account using the Registration page or use an existing account.

After successful authentication, the user can access the protected FarmVerse modules.

8. Access the Application

After logging in, users can access:

Dashboard
Farm Management
Crop Management
Irrigation
Fertilizer
Weather
AI Crop Recommendation
Profit Estimation
Reports
Notifications
User Profile
🔄 Application Workflow
Landing Page
     ↓
Register / Login
     ↓
JWT Authentication
     ↓
Dashboard
     ↓
Farm & Crop Management
     ↓
Irrigation & Fertilizer Management
     ↓
Weather Information
     ↓
AI Crop Recommendation
     ↓
Profit Estimation
     ↓
Reports & Notifications
🧪 API Testing

Backend REST APIs can be tested using Postman.

Testing includes:

User Registration
User Login
JWT Authentication
Protected APIs
Farm APIs
Crop APIs
Irrigation APIs
Fertilizer APIs
Crop Recommendation APIs
Profit Estimation APIs

For debugging API-related issues, the following can be checked:

Browser Console
Browser Network tab
Backend logs
API responses
Database records
Postman requests and responses
🔐 Security

FarmVerse uses several security mechanisms:

Spring Security
JWT Authentication
Protected REST APIs
Authenticated user access
User-specific data handling

Sensitive information such as:

Database passwords
SMTP credentials
JWT secrets
API keys

should be stored securely using environment variables or deployment secrets.

🚀 Deployment

FarmVerse consists of a frontend, backend, database, AI functionality, weather integration, and email services.

Before deployment, configure:

Database connection
Backend API URL
Frontend environment variables
JWT configuration
SMTP configuration
AI service configuration

The MySQL database can be hosted using Railway depending on the deployment environment.

📌 Project Highlights

FarmVerse combines agricultural management with modern full-stack technologies and intelligent features.

Agricultural Management
🌾 Farm Management
🌱 Crop Management
💧 Irrigation Management
🧪 Fertilizer Management
📄 Reports
👤 User Profile
Intelligent Features
🌦️ Weather Information
🤖 AI Crop Recommendation
💰 Profit Estimation
📧 Email / OTP Notifications
Technical Highlights
🔐 JWT Authentication
🛡️ Spring Security
🗄️ MySQL Database
🔗 REST APIs
🧠 Random Forest Machine Learning
🌐 Open-Meteo API Integration
📨 SMTP Email Integration
🧪 Postman API Testing
🔄 Git & GitHub Collaboration
👥 Team

FarmVerse – Precision Agriculture Management Platform

Madhumitha G
Mohit Rathod
Mungara Naga Venkata Rama Chandram
P Koushal
Partheepan Sree Kavya
Yamuna
