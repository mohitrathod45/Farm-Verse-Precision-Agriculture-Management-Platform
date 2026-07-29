# 🌱 FarmVerse - Precision Agriculture Management Platform

## 📖 About

FarmVerse is a full-stack web application that helps farmers manage farms, crops, irrigation, fertilizers, and reports through a single dashboard.

---

## 🚀 Features

- User Authentication (JWT)
- Dashboard
- Farm Management
- Crop Management
- Irrigation Management
- Fertilizer Management
- Reports
- User Profile

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS

### Backend
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT Authentication

### Database
- MySQL (Railway)

---
# ▶️ Execution Steps

## 1. Clone the Repository

```bash
git clone https://github.com/mohitrathod45/Farm-Verse-Precision-Agriculture-Management-Platform.git
cd Farm-Verse-Precision-Agriculture-Management-Platform
```

---

## 2. Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

The frontend will start at:

```
http://localhost:5173
```

---

## 3. Backend Setup

Open a new terminal.

```bash
cd farmverse-backend/farmverse-backend
mvn clean install
mvn spring-boot:run
```

The backend will start at:

```
http://localhost:8080
```

---

## 4. Database Configuration

Update the database configuration in:

```
src/main/resources/application.properties
```

Configure:

- Database URL
- Username
- Password

Then restart the Spring Boot application.

---

## 5. Login

Use a registered account or create a new account using the Register page.

---

## 6. Access the Application

Open your browser and visit:

```
http://localhost:5173
```

You can now access:

- Dashboard
- Farm Management
- Crop Management
- Irrigation
- Fertilizers
- Reports
- Profile
