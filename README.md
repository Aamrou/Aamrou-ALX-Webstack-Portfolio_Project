# Online Quiz Platform

## Project overview
The **Online Quiz Platform** is a comprehensive solution designed to modernize the way quizzes, tests, and assessments are conducted. By combining intuitive interfaces, gamified elements, and data-driven analytics, the platform caters to the needs of educators, corporate trainers, and learners.

This platform simplifies the creation, participation, and analysis of quizzes while making the experience engaging and rewarding. Whether you're an educator looking to engage students, a trainer seeking to upskill employees, or a learner wanting to self-assess progress, the Online Quiz Platform is the ultimate tool for interactive and insightful learning.

---

## Features
### Core Functionalities:
1. **User Authentication**:
   - Role-based access (Admin/User).
   - Secure JWT-based authentication.

2. **Quiz Creation** (Admin):
   - Create dynamic quizzes with multiple-choice questions.
   - Assign difficulty levels and set time limits.

3. **Quiz Taking** (User):
   - Interactive quizzes with real-time feedback.

4. **Leaderboards**:
   - Gamify learning with rankings and badges.

5. **Advanced Analytics**:
   - View user performance metrics and quiz insights.

6. **Mobile-First Design**:
   - Fully responsive, accessible on any device.

### Additional Features:
- Multilingual support (planned).
- AI-driven adaptive quizzes (planned).

---

## Tech Stack
### Frontend:
- **React.js**: Dynamic and responsive user interface.
- **CSS** : Mobile-first styling.

### Backend:
- **Node.js**: Server-side scripting.
- **Express.js**: RESTful API framework.
- **MongoDB**: NoSQL database for scalability and flexibility.

### Analytics:
- **D3.js**: Advanced data visualization.

### Key Features to Include:
User Authentication
Quiz Creation (Admin)
Quiz Taking (Users)
Leaderboard
Quiz Analytics (Admin)
Responsive UI for all devices
1. BACK-END (Python, Node.js, MongoDB)
Database Design (MongoDB):
Users Collection:
_id: unique identifier
name: string
email: string
password: hashed string
role: [‘admin’, ‘user’]
score: number (for leaderboard)
attempts: array of attempted quiz IDs
Quiz Collection:
_id: unique identifier
title: string
questions: array of objects
question: string
options: array of strings
answer: correct answer (for validation)
difficulty: string [‘easy’, ‘medium’, ‘hard’]
createdBy: Admin ID
attempts: number (analytics)
Leaderboard Collection:
_id: unique identifier
quiz_id: string
scores: array of objects
user_id: string
score: number
API Endpoints (Node.js with Express)
Authentication:
POST /auth/signup: Register a user.
POST /auth/login: Log in a user and generate a token.
Quiz Management:
POST /quiz/create: Create a quiz (Admin).
GET /quiz/list: Get all quizzes.
GET /quiz/:id: Get quiz details by ID.
Quiz Taking:
POST /quiz/:id/submit: Submit quiz answers and calculate score.
Leaderboard:
GET /leaderboard/:quiz_id: Fetch leaderboard for a specific quiz.
Analytics:
GET /quiz/:id/analytics: Fetch analytics for a quiz (Admin).
Back-End Workflow (Python):
Setup Flask API (Alternatively Node.js can be used):
Install required libraries: flask, pymongo, flask_jwt_extended
Create routes for user signup/login and quiz-related actions.
Authentication Middleware:
Secure endpoints with JWT tokens.
Data Validation:
Use schemas to validate quiz submissions and user input.
Logic:
Quiz submission: Calculate score by comparing user answers with the correct answers.
Update leaderboard upon successful submission.
Integrate MongoDB:
Store user data, quizzes, and scores efficiently.
2. FRONT-END (React + HTML/CSS)
Frontend Components
Authentication Pages:
Sign Up Component:
Fields: Name, Email, Password.
POST to /auth/signup.
Login Component:
Fields: Email, Password.
POST to /auth/login.
On success, store JWT token in localStorage.
Quiz Pages:
Quiz List Component:
Fetch quizzes from /quiz/list.
Display quiz titles with "Take Quiz" buttons.
Quiz Component:
Fetch quiz data from /quiz/:id.
Display questions with options (radio buttons).
Submit answers to /quiz/:id/submit.
Quiz Results Component:
Display score after submission.
Leaderboard Page:
Fetch data from /leaderboard/:quiz_id.
Display leaderboard using a table.
Admin Dashboard:
Create Quiz Component:
Form with fields: Title, Questions (Dynamic Input).
POST data to /quiz/create.
Quiz Analytics Component:
Fetch analytics data from /quiz/:id/analytics.
Display graphs using a library like Chart.js.
Frontend Workflow
Setup React:
Use create-react-app for setup.
Install dependencies: axios, react-router-dom.
Routing:
/signup → SignUp Component.
/login → Login Component.
/quizzes → Quiz List Component.
/quiz/:id → Quiz Component.
/leaderboard/:id → Leaderboard Component.
/admin → Admin Dashboard.
State Management:
Use useState and useEffect for managing local states.
Use useContext or Redux for global state (optional).
API Integration:
Use axios to interact with the back-end.
Handle token-based authentication for secured endpoints.
Styling:
Use CSS modules or libraries like Tailwind CSS for responsive design.
3. Example Workflow
User Journey:
User signs up or logs in.
On the dashboard, the user selects a quiz to take.
The quiz page displays questions, and the user submits answers.
The server validates answers, calculates the score, and updates the leaderboard.
The user views their score and leaderboard rankings.
Admin Journey:
Admin logs in.
Admin creates a new quiz via a form.
Admin views analytics for quizzes to understand performance and participation.

               /OnlineQuizPlatform

|-- /backend
|   |-- /config
|   |   |-- db.js            # Database connection setup
|   |-- /models
|   |   |-- userModel.js     # User schema
|   |   |-- quizModel.js     # Quiz schema with leaderboard
|   |-- /routes
|   |   |-- authRoutes.js    # Authentication APIs
|   |   |-- quizRoutes.js    # Quiz creation, submission, analytics APIs
|   |   |-- adminRoutes.js   # Admin management APIs
|   |   |-- userRoutes.js    # User-specific analytics APIs
|   |-- /tests
|   |   |-- authRoutes.test.js   # Test cases for authentication
|   |   |-- quizRoutes.test.js   # Test cases for quiz-related endpoints
|   |-- app.js              # Main backend entry point
|   |-- package.json        # Backend dependencies
|-- /frontend
|   |-- /src
|   |   |-- /components
|   |   |   |-- Navbar.js       # Navigation bar
|   |   |   |-- AdminDashboard.js  # Admin features
|   |   |   |-- UserPerformance.js # User analytics visualization
|   |   |   |-- AdvancedAnalytics.js # D3.js analytics chart
|   |   |-- /styles
|   |   |   |-- styles.css     # CSS for responsive design
|   |   |-- /api
|   |   |   |-- auth.js        # API integrations for auth
|   |   |   |-- quiz.js        # API integrations for quizzes
|   |   |-- App.js             # Main React entry point
|   |   |-- index.js           # React DOM rendering
|   |-- package.json           # Frontend dependencies
|   |-- /public
|   |   |-- index.html         # Main HTML file for React app
|-- /demo
|   |-- mockups
|   |   |-- dashboard.png      # Mockup of the dashboard
|   |   |-- quiz_creation.png  # Mockup of quiz creation form
|   |   |-- leaderboard.png    # Mockup of leaderboard page
|   |-- presentation
|   |   |-- deck.pptx          # PowerPoint presentation
|   |-- video
|   |   |-- demo.mp4           # Demo walkthrough video
|-- README.md                 # Overview of the project


// DETAILED FUNCTIONALITY PSEUDOCODE

1. Authentication Flow:
   ```javascript
   function register(userData):
       validate(userData)
       checkIfUserExists(userData.email)
       hashedPassword = hashPassword(userData.password)
       user = createUser(userData, hashedPassword)
       token = generateJWT(user)
       return {token, user}

   function login(credentials):
       user = findUserByEmail(credentials.email)
       validatePassword(credentials.password, user.password)
       token = generateJWT(user)
       return {token, user}

---

## Installation and Setup
### Prerequisites:
- Node.js and npm installed.
- MongoDB installed locally or accessible via cloud (e.g., MongoDB Atlas).

### Author:
- DARHMAOUI AAMR : https://github.com/Aamrou
