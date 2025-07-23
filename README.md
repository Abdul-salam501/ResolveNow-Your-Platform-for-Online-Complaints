Complaint_Registry-SmartBridge_Intern

ResolveNow is a full-stack web app for online complaint registration and management. It allows users to submit complaints, track their status, and interact with assigned agents. Built with React, Node.js, Express, and MongoDB, it features role-based access for Admins, Agents, and Users to ensure efficient complaint handling and resolution.

🚀 ResolveNow: 
Your Platform for Online Complaints
ResolveNow is an intuitive and powerful web-based platform designed to simplify the process of registering, managing, and resolving public complaints. It helps individuals or organizations submit and track complaints, enhancing communication and ensuring prompt resolution — all while maintaining security, transparency, and accountability.

📝 Project Description
ResolveNow serves as a centralized complaint management portal, streamlining workflows for users, agents, and administrators. The application ensures regulatory compliance, data security, and better user satisfaction by automating complaint tracking and integrating real-time interaction between users and assigned agents.

🔑 Key Features

👤 User (Customer)

Secure Registration & Login
Submit complaints with full details
Track complaint progress in real time
Receive updates & notifications
Chat with the assigned agent
🧑‍💼 Agent

View and manage assigned complaints
Communicate directly with users
Update complaint resolution status
🛡️ Admin

Manage all users (Add/Edit/Delete)
Assign complaints to agents
Monitor system activity and performance
📌 Scenario Example

John, a customer, receives a defective product. Using ResolveNow:

Registers on the platform.
Submits his complaint with a detailed description.
Tracks progress via real-time updates.
Chats with Sarah, an assigned agent.
Receives a resolution (refund/replacement).
Leaves feedback about the support received.
Meanwhile, the Admin:

Reviews system-wide complaints.
Assigns complaints to available agents.
Manages all platform users.
⚙️ Tech Stack

Layer	Technology
Frontend	React.js, Bootstrap, MDB UI Kit
Backend	Node.js, Express.js
Database	MongoDB (Mongoose ODM)
APIs	RESTful APIs with Axios
🧱 Technical Architecture

The app follows a client-server architecture:

Frontend:

Built using React.js
Styled with Bootstrap & Material Design
Uses Axios for REST API communication
Backend:

Built using Express.js and Node.js
Exposes RESTful endpoints
Connected to MongoDB for scalable data storage

📂 Project Structure
ResolveNow/
├── backend/ │ ├── index.js │ ├── config.js │ └── schema.js ├── frontend/ │ ├── public/ │ ├── src/ │ │ ├── components/ │ │ ├── App.js │ │ └── index.js ├── .gitignore ├── package.json └── README.md

🚀 Getting Started

Prerequisites
Node.js & npm
MongoDB (local or cloud like MongoDB Atlas)
1. Clone the Repository
git clone https://github.com/your-username/ResolveNow.git cd ResolveNow

Setup Backend bash Copy Edit cd backend npm install node index.js Ensure MongoDB is running locally on mongodb://127.0.0.1:27017/details

Setup Frontend
bash Copy Edit cd ../frontend npm install npm start Visit http://localhost:3000 in your browser

###👨‍💼 Use Case Scenario A user signs up or logs in.

They submit a complaint with necessary details.

Admin views the complaint and assigns it to an agent.

The agent interacts with the user via the in-app chat and updates the complaint status.

The user is notified of the resolution.

###📷 Project_Demo
https://drive.google.com/file/d/1EbZcS3YRYe03D6UeuFjGZNG4rVRG-Nla/view?usp=sharing

🧪 Testing Frontend: React dev tools and browser console

Backend: Postman or Thunder Client

MongoDB: Use MongoDB Compass to visualize collections

📌 License This project is open-source and available under the MIT License.

👨‍💻 Author 💡 D.ABDULSALAM
