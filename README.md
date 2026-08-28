# 🌱 FarmVerse

### Precision Agriculture Management Platform

> **FarmVerse** is a full-stack web application designed to help farmers digitally manage their farms, crops, irrigation, fertilizers, weather information, reports, and other agricultural activities through a centralized platform.

The platform also includes **AI-based crop recommendation, profit estimation, email notifications, OTP verification, and secure user authentication**.

---

## 📖 About The Project

**FarmVerse – Precision Agriculture Management Platform** provides a centralized dashboard for managing agricultural activities digitally.

The application allows farmers to:

* 🌾 Manage farms and crops
* 💧 Track irrigation activities
* 🧪 Manage fertilizer information
* 🌦️ View weather information
* 📄 Generate and view reports
* 📧 Receive email notifications and OTPs
* 🤖 Get AI-based crop recommendations
* 💰 Estimate agricultural profit
* 👤 Manage their user profile securely

### 🏗️ Technology Overview

FarmVerse is built using:

* **Frontend:** React.js, Vite, JavaScript, Tailwind CSS
* **Backend:** Java, Spring Boot, Spring Security
* **Database:** MySQL
* **Authentication:** JWT
* **Machine Learning:** Python, Random Forest
* **Weather Services:** Open-Meteo API
* **Email Services:** SMTP
* **API Testing:** Postman

---

# 🚀 Features

## 🔐 User Authentication

FarmVerse provides secure authentication and user-specific access.

* 📝 User Registration
* 🔑 User Login
* 🔐 JWT-based Authentication
* 🛡️ Spring Security
* 🔒 Protected Routes and APIs
* 👤 User-specific Data Access

---

## 📊 Dashboard

The dashboard provides an overview of the farmer's agricultural activities.

### Dashboard Includes

* 🌾 Farm Overview
* 🌱 Crop Information
* 📋 Agricultural Activity Summary
* ⚡ Quick Access to Major Modules
* 👤 User-specific Information

---

## 🌾 Farm Management

Farmers can manage their farm information through complete **CRUD operations**.

| Operation  | Description                |
| ---------- | -------------------------- |
| ➕ Add      | Add a new farm             |
| 👁️ View   | View existing farms        |
| ✏️ Update  | Update farm information    |
| 🗑️ Delete | Delete a farm              |
| 💾 Store   | Store farm details         |
| 👤 Manage  | Manage user-specific farms |

---

## 🌱 Crop Management

Farmers can manage crops associated with their farms.

| Operation    | Description                |
| ------------ | -------------------------- |
| ➕ Add        | Add a new crop             |
| 👁️ View     | View existing crops        |
| ✏️ Update    | Update crop information    |
| 🗑️ Delete   | Delete a crop              |
| 💾 Store     | Store crop information     |
| 🔗 Associate | Associate crops with farms |

---

## 💧 Irrigation Management

The Irrigation module helps farmers manage irrigation-related activities.

* ➕ Add irrigation records
* 👁️ View irrigation records
* ✏️ Update irrigation records
* 🗑️ Delete irrigation records
* 💧 Manage irrigation activities

---

## 🧪 Fertilizer Management

The Fertilizer module allows farmers to manage fertilizer-related information.

* ➕ Add fertilizer records
* 👁️ View fertilizer records
* ✏️ Update fertilizer records
* 🗑️ Delete fertilizer records
* 🧪 Manage fertilizer activities

---

# 🌦️ Weather Information

FarmVerse integrates the **Open-Meteo API** to provide weather information.

## 🌡️ Weather Data

The application provides:

* 📍 Location Information
* 🌡️ Current Temperature
* 💧 Humidity
* 💨 Wind Speed
* 🌧️ Current Precipitation
* ☁️ Weather Condition
* 📅 Seven-day Weather Forecast
* 🔺 Maximum Temperature
* 🔻 Minimum Temperature
* 🌧️ Precipitation Probability
* 💦 Precipitation Amount

### 🌾 Farming Insights

FarmVerse generates farming-related insights based on:

* 💧 Humidity
* 🌧️ Rainfall
* 🌡️ Temperature

For example, the application can provide warnings regarding:

* High humidity
* Rainfall conditions
* High temperatures

### 🔗 APIs Used

* **Open-Meteo Geocoding API**
* **Open-Meteo Forecast API**

---

# 🤖 AI Crop Recommendation

FarmVerse includes an **AI-based crop recommendation system**.

The machine learning model is trained using agricultural and environmental parameters to recommend a suitable crop.

## 📥 Input Parameters

The model uses the following parameters:

| Parameter       | Description               |
| --------------- | ------------------------- |
| 🌱 N            | Nitrogen                  |
| 🌱 P            | Phosphorus                |
| 🌱 K            | Potassium                 |
| 🌡️ Temperature | Environmental temperature |
| 💧 Humidity     | Environmental humidity    |
| 🧪 Soil pH      | Soil acidity/alkalinity   |
| 🌧️ Rainfall    | Rainfall amount           |

## 🧠 Machine Learning Model

* **Algorithm:** Random Forest Classifier
* **Language:** Python
* **Libraries:** pandas, scikit-learn
* **Model Serialization:** joblib

The trained model is saved and loaded during prediction to generate crop recommendations.

## 🔄 Prediction Flow

```text
┌───────────────┐
│ Nitrogen (N)  │
│ Phosphorus(P) │
│ Potassium (K) │
│ Temperature   │
│ Humidity      │
│ Soil pH       │
│ Rainfall      │
└───────┬───────┘
        │
        ▼
┌────────────────────────┐
│   Random Forest Model  │
└───────────┬────────────┘
            │
            ▼
┌────────────────────────┐
│    Recommended Crop    │
└────────────────────────┘
```

---

# 💰 Profit Estimation

FarmVerse provides a **profit-estimation feature** to help farmers understand the expected profitability of their agricultural activities.

The feature allows users to provide relevant agricultural information and obtain an estimated profit based on the provided inputs.

---

# 📧 Email & OTP Notifications

FarmVerse supports email-based OTP and notification functionality.

### Features

* 🔢 OTP Generation
* ✅ OTP Verification
* 📧 Email Notifications
* 📬 SMTP Server Integration
* 👤 Email-based User Verification

The application uses an **SMTP server** to send OTPs and notifications to users.

---

# 📄 Reports

The Reports module provides structured agricultural information for users.

* 📋 View farm-related information
* 🗂️ Organize agricultural data
* 📄 Generate and access reports
* 📊 Support farm activity analysis

---

# 👤 User Profile

The Profile module allows authenticated users to view and manage their profile information.

---

# 🛠️ Technology Stack

## 🎨 Frontend

| Technology           | Purpose                    |
| -------------------- | -------------------------- |
| ⚛️ React.js          | Frontend framework         |
| ⚡ Vite               | Development and build tool |
| 🟨 JavaScript        | Programming language       |
| 🎨 Tailwind CSS      | Styling                    |
| 🧭 React Router      | Application routing        |
| 🎯 React Icons       | Icons                      |
| 🔗 Axios / Fetch API | API communication          |

---

## ⚙️ Backend

| Technology          | Purpose                         |
| ------------------- | ------------------------------- |
| ☕ Java              | Programming language            |
| 🍃 Spring Boot      | Backend framework               |
| 🌐 Spring MVC       | Web layer                       |
| 🛡️ Spring Security | Security                        |
| 🗄️ Spring Data JPA | Data access                     |
| 🔄 Hibernate        | ORM                             |
| 🔗 REST APIs        | Backend communication           |
| 🔐 JWT              | Authentication                  |
| 📦 Maven            | Build and dependency management |

---

## 🗄️ Database

* **MySQL**
* **JPA / Hibernate**

---

## 🤖 Artificial Intelligence

* 🐍 Python
* 🐼 pandas
* 📊 scikit-learn
* 🌲 Random Forest Classifier
* 💾 joblib

---

## 🌐 External Services

### Weather

* 🌦️ Open-Meteo Geocoding API
* 🌦️ Open-Meteo Forecast API

### Email

* 📧 SMTP Server
* ✉️ Email / OTP Service

---

## 🧰 Development & Testing Tools

* 🔧 Git
* 🐙 GitHub
* 🧪 Postman
* 💻 IntelliJ IDEA
* 📝 Visual Studio Code
* 📦 Maven

---

# ▶️ Execution Steps

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/mohitrathod45/Farm-Verse-Precision-Agriculture-Management-Platform.git
```

```bash
cd Farm-Verse-Precision-Agriculture-Management-Platform
```

---

## 2️⃣ Frontend Setup

Navigate to the frontend directory:

```bash
cd Frontend
```

Install the required dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally start at:

```text
http://localhost:5173
```

---

## 3️⃣ Backend Setup

Open a new terminal and navigate to the backend directory:

```bash
cd farmverse-backend
```

Build the Spring Boot application:

```bash
mvn clean install
```

Start the backend:

```bash
mvn spring-boot:run
```

The backend will normally start at:

```text
http://localhost:8080
```

---

## 4️⃣ Database Configuration

FarmVerse uses **MySQL** for storing application data.

Configure the database settings in:

```text
farmverse-backend/src/main/resources/application.properties
```

Configure the required:

* Database URL
* Database Username
* Database Password

After configuring the database, restart the Spring Boot application.

> ⚠️ **Security Note:** Never commit database passwords or other sensitive credentials to GitHub.

---

## 5️⃣ Email / SMTP Configuration

Email functionality requires SMTP configuration.

Configure the required SMTP settings and credentials in the backend configuration.

The SMTP service is used for:

* 📧 OTP Emails
* ✅ User Verification
* 🔔 Email Notifications

> ⚠️ **Security Note:** Do not expose SMTP passwords or other sensitive credentials in the source code.

---

## 6️⃣ AI Model Setup

The AI crop recommendation functionality uses a trained **Random Forest model**.

### AI-related Files

```text
Crop_recommendation.csv
app.py
predict.py
crop_recommendation_model.pkl
```

### Model Parameters

The model is trained using:

* Nitrogen (N)
* Phosphorus (P)
* Potassium (K)
* Temperature
* Humidity
* Soil pH
* Rainfall

The trained model is loaded during prediction to recommend a suitable crop.

---

## 7️⃣ Login

Start both the frontend and backend.

Open:

```text
http://localhost:5173
```

Create a new account using the **Registration** page or use an existing account.

After successful authentication, the user can access the protected FarmVerse modules.

---

## 8️⃣ Access the Application

After logging in, users can access:

* 📊 Dashboard
* 🌾 Farm Management
* 🌱 Crop Management
* 💧 Irrigation
* 🧪 Fertilizer
* 🌦️ Weather
* 🤖 AI Crop Recommendation
* 💰 Profit Estimation
* 📄 Reports
* 📧 Notifications
* 👤 User Profile

---

# 🔄 Application Workflow

```text
                    ┌───────────────┐
                    │  Landing Page │
                    └───────┬───────┘
                            │
                            ▼
                 ┌────────────────────┐
                 │ Register / Login   │
                 └─────────┬──────────┘
                           │
                           ▼
                 ┌────────────────────┐
                 │ JWT Authentication │
                 └─────────┬──────────┘
                           │
                           ▼
                 ┌────────────────────┐
                 │     Dashboard      │
                 └─────────┬──────────┘
                           │
                           ▼
             ┌────────────────────────────┐
             │ Farm & Crop Management     │
             └────────────┬───────────────┘
                          │
                          ▼
             ┌────────────────────────────┐
             │ Irrigation & Fertilizer    │
             │ Management                 │
             └────────────┬───────────────┘
                          │
                          ▼
                 ┌────────────────────┐
                 │ Weather Information│
                 └─────────┬──────────┘
                           │
                           ▼
              ┌─────────────────────────┐
              │ AI Crop Recommendation  │
              └────────────┬────────────┘
                           │
                           ▼
                 ┌────────────────────┐
                 │ Profit Estimation  │
                 └─────────┬──────────┘
                           │
                           ▼
              ┌─────────────────────────┐
              │ Reports & Notifications │
              └─────────────────────────┘
```

---

# 🧪 API Testing

Backend REST APIs can be tested using **Postman**.

### Testing Includes

* 👤 User Registration
* 🔑 User Login
* 🔐 JWT Authentication
* 🛡️ Protected APIs
* 🌾 Farm APIs
* 🌱 Crop APIs
* 💧 Irrigation APIs
* 🧪 Fertilizer APIs
* 🤖 Crop Recommendation APIs
* 💰 Profit Estimation APIs

### 🔍 Debugging

For debugging API-related issues, check:

* 🌐 Browser Console
* 🔗 Browser Network Tab
* ⚙️ Backend Logs
* 📡 API Responses
* 🗄️ Database Records
* 🧪 Postman Requests and Responses

---

# 🔐 Security

FarmVerse uses several security mechanisms:

* 🛡️ Spring Security
* 🔐 JWT Authentication
* 🔒 Protected REST APIs
* 👤 Authenticated User Access
* 🗂️ User-specific Data Handling

### 🔑 Sensitive Information

The following information should **never be exposed publicly**:

* Database Passwords
* SMTP Credentials
* JWT Secrets
* API Keys

These values should be stored securely using:

* Environment Variables
* Deployment Secrets

---

# 🚀 Deployment

FarmVerse consists of:

```text
Frontend
   +
Backend
   +
MySQL Database
   +
AI Functionality
   +
Weather Integration
   +
Email Services
```

Before deployment, configure:

* 🗄️ Database Connection
* 🔗 Backend API URL
* 🌐 Frontend Environment Variables
* 🔐 JWT Configuration
* 📧 SMTP Configuration
* 🤖 AI Service Configuration

The MySQL database can be hosted using **Railway**, depending on the deployment environment.

---

# 📌 Project Highlights

FarmVerse combines **agricultural management** with modern **full-stack technologies** and **intelligent features**.

## 🌾 Agricultural Management

* 🌾 Farm Management
* 🌱 Crop Management
* 💧 Irrigation Management
* 🧪 Fertilizer Management
* 📄 Reports
* 👤 User Profile

## 🧠 Intelligent Features

* 🌦️ Weather Information
* 🤖 AI Crop Recommendation
* 💰 Profit Estimation
* 📧 Email / OTP Notifications

## ⚙️ Technical Highlights

* 🔐 JWT Authentication
* 🛡️ Spring Security
* 🗄️ MySQL Database
* 🔗 REST APIs
* 🧠 Random Forest Machine Learning
* 🌐 Open-Meteo API Integration
* 📨 SMTP Email Integration
* 🧪 Postman API Testing
* 🔄 Git & GitHub Collaboration

---

# 👥 Team

### 🌱 FarmVerse – Precision Agriculture Management Platform

|  # | Team Member                            |
| -: | -------------------------------------- |
|  1 | **Madhumitha G**                       |
|  2 | **Mohit Rathod**                       |
|  3 | **Mungara Naga Venkata Rama Chandram** |
|  4 | **P Koushal**                          |
|  5 | **Partheepan Sree Kavya**              |
|  6 | **Yamuna**                             |

---
