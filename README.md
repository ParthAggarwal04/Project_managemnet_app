# Project Management App - Project Tracker
This is simple, Practical web application to manage projects and tasks with role based access. also this app allows teams to collaborate by creating projects, assigning tasks, and tracking progress in real time.

---

## Features
  - User Authentication (Signup/Login)
  - Role Based Acess (Admin/Member)
  - Create and Manage projects
  - Assign tasks to users
  - Update Task status
  - Dashboard for tracking progess

---

## Teck Stack
  - **Backend:** Node.js, Express.js
  - **Database:** MongoDB Atlas
  - **Authentication:** JWT
  - **Frontend:** HTML, CSS, JavaScript
  - **Deployment:** Railway

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Create a `.env` file in the root directory and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run the application

```bash
npm start
```

### 5. Open in browser

```text
http://localhost:5000
```

---

## 🌐 Live Deployment

```text
https://projectmanagementapp-production.up.railway.app
```

---

## 📸 Screenshots

### 🔐 Authentication Page

<img width="1918" height="807" alt="image" src="https://github.com/user-attachments/assets/68ff3c39-9219-4790-a198-d7f3a9be19b6" />


### 📊 Dashboard

_Add your screenshot here_

### 📁 Project Management

_Add your screenshot here_

### ✅ Task Management

_Add your screenshot here_

---

## 📁 Project Structure

```text
server/
  models/
  routes/
  middleware/

public/
  index.html
  css/
  js/

server.js
package.json
package-lock.json
README.md
```

---

## 🔐 Roles & Access

### Admin

- Create and manage projects
- Assign tasks to users
- Manage team members

### Member

- View assigned tasks
- Update task status

---

## 💡 Highlights

- Clean REST API architecture
- Role-based access control implementation
- Secure authentication using JWT
- Cloud deployment using Railway
- Real-world scalable project structure

---

## 📈 Future Improvements

- Enhanced UI/UX design
- Real-time updates using WebSockets
- Notifications and alerts
- Advanced analytics dashboard

---

## 👤 Author

**Parth Aggarwal**

---
