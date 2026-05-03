# Project Management App - Project Flow
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

<img width="1909" height="770" alt="image" src="https://github.com/user-attachments/assets/ca30d913-63de-4368-9f8e-7cd0b7159667" />

### 📊 Dashboard

<img width="1871" height="727" alt="image" src="https://github.com/user-attachments/assets/3108d89e-44c7-4eb8-a5f0-72b816f19ef8" />


### 📁 Project Management

<img width="1563" height="785" alt="image" src="https://github.com/user-attachments/assets/1d3c1831-0b3f-4010-b551-a755ca303bc7" />


### ✅ Task Management

<img width="1287" height="879" alt="image" src="https://github.com/user-attachments/assets/714fe05f-af11-4878-8355-a163bb5d322e" />


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
