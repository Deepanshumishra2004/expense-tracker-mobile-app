# Expense Tracker Application

## Overview

The Expense Tracker App is a simple and intuitive mobile application that helps users track their **income and expenses**, categorize transactions, and manage personal finances efficiently. The app focuses on clean UI, fast performance, and secure authentication.

---

## Features

### 🔐 Authentication

* User **Signup & Signin** using email and password
* Passwords are securely hashed using **bcrypt**
* Authentication handled via **JWT (JSON Web Tokens)**

### 💰 Transactions

* Add **Income** and **Expense** transactions
* Automatically formats amount based on transaction type
* Supports transaction **title, description, amount, and category**

### 🏷 Categories

* Predefined categories (Food, Transport, Shopping, Bills, etc.)
* Category-based visual icons
* Easy category selection UI

### 👤 User Profile

* Fetch logged-in user details
* Secure `/me` endpoint using JWT middleware

### 📱 UI/UX

* Clean and minimal UI
* Responsive layout
* Loading indicators and error alerts

---

## Tech Stack

### Frontend (Mobile)

* **React Native (Expo)**
* **TypeScript**
* **Expo Router** for navigation
* **Ionicons** for icons

### Backend

* **Node.js**
* **Express.js**
* **TypeScript**
* **Prisma ORM**
* **PostgreSQL** (or any Prisma-supported DB)

### Authentication & Security

* **JWT** for auth
* **bcrypt** for password hashing

---

## Backend API Endpoints

### Auth Routes

#### POST `/signup`

Creates a new user account.

**Body:**

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "profileImage": "string (optional)"
}
```

---

#### POST `/signin`

Authenticates a user and returns a JWT.

**Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

---

#### GET `/me`

Returns logged-in user details.

**Headers:**

```
Authorization: Bearer <token>
```

---

## Transaction Flow

1. User logs in / signs up
2. JWT is stored securely on the device
3. User creates a transaction
4. Frontend sends transaction data with JWT
5. Backend verifies JWT and stores transaction
6. Transaction appears in user history

---

## Folder Structure (Simplified)

```
frontend/
 ├─ app/
 ├─ src/
 │  ├─ hooks/
 │  ├─ utils/
 │  ├─ assets/
 │  └─ styles/

backend/
 ├─ routes/
 ├─ controllers/
 ├─ middleware/
 ├─ prisma/
 └─ index.ts
```

---

## Environment Variables

```
DATABASE_URL=...
JWT_SECRET=...
```

---

## Future Improvements

* Monthly & yearly analytics
* Charts & insights
* Recurring transactions
* Budget limits & alerts
* Cloud sync & export

---

## Conclusion

This Expense Tracker App provides a solid foundation for personal finance management with secure authentication, clean UI, and scalable backend architecture.
