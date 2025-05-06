# 🚀 Task Management System

A feature-rich Task Management System built with the MERN stack (MongoDB, Express, React, Node.js). Designed for small teams to create, assign, track, and manage tasks effectively.

## 🌐 Live Demo

🔗 [Live Application](https://your-deployed-app-link.com)

## 🧉 Tech Stack

* **Frontend:** React (Vite)
* **Backend:** Node.js with Express
* **Database:** MongoDB Atlas
* **State Management:** React Context API
* **Styling:** Tailwind CSS
* **Authentication:** JWT-based
* **Deployment:** Frontend on Vercel | Backend on Render/Railway

---

## 📂 Features

### 🔐 Authentication

* Secure registration and login
* JWT-based token authentication
* Passwords hashed with bcrypt

### 📂 Task Management

* Create, read, update, and delete tasks (Admin only)
* Each task includes:

  * Title
  * Description
  * Due Date
  * Priority (Low, Medium, High)
  * Status (Pending, Completed)

### 👥 Team Collaboration

* Admin can assign tasks to any user
* Members can view tasks assigned to them and update their status

### 📊 Dashboard

* Admin Dashboard:

  * All created tasks
  * All assigned tasks
  * Overdue tasks
* Member Dashboard:

  * Tasks assigned to them
  * Tasks they’ve created (if applicable)
  * Overdue tasks

> Note: Members have restricted access because they cannot create or modify tasks — only view and update the status of assigned tasks.

### 🔍 Search & Filter

* Search tasks by title or description
* Filter by:

  * Status
  * Priority
  * Due Date

### 🤝 Role-Based Access

* **Admin:**

  * Full control: create, assign, update, delete tasks
  * Can view all users and all tasks
* **Member:**

  * Can view and update the status of assigned tasks only
  * Cannot create, assign, or delete tasks

---

## ⚙️ Installation & Setup

### Prerequisites

* Node.js
* MongoDB Atlas (cloud-hosted)

### Clone the Repository

```bash
git clone https://github.com/yourusername/task-management-app.git
cd task-management-app
```

### Backend Setup

```bash
cd backend
npm install
# Add your MongoDB Atlas URI and JWT secret in a `.env` file
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

> No need to deploy MongoDB separately — MongoDB Atlas handles database hosting in the cloud.

---

## 📝 Assumptions & Decisions

* Skipped WebSocket-based notifications since real-time data is reflected through state updates and re-fetching logic.
* Built with MERN instead of Next.js as allowed.
* Used React Context API for global state management.
* Role-based access and authorization handled via middleware and frontend checks.
* Focused on delivering core functionality with a clean UI and proper access control.

---

## 📄 Deployment Links

* **Frontend:** [Vercel Link](https://your-frontend-link.com)
* **Backend:** [Render Link](https://your-backend-link.com)

---

## 🤖 How AI Helped

* Used AI to generate optimized code snippets, component structures, and error-handling logic
* AI assisted in writing clean, reusable logic and integrating JWT properly
* Helped brainstorm architecture decisions and edge-case handling

---

## 📃 License

This project is open-source and available under the [MIT License](LICENSE).
