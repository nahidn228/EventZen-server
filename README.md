# 🛠️ EventZen Backend

EventZen API is a robust Node.js and Express.js backend built for a modern event management platform.
It provides secure custom authentication, full CRUD functionality for events, and supports dynamic features like joining events and real-time attendee tracking.
Designed with scalability and clarity in mind, it integrates seamlessly with MongoDB, enabling efficient data handling and fast API responses.

🚀 **Live API**: [eventzen-server.vercel.app](https://eventzen-server.vercel.app/)

---

## ✨ Features

- User registration & login (custom-built authentication, JWT-based)
- Secure password hashing with bcrypt
- Add, update, delete events (protected routes)
- Join event endpoint (increments attendee count)
- Search & filter events by title, date, week, or month
- CORS enabled for frontend communication
- Well-structured MVC pattern

---

## 🧰 Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- bcrypt for password hashing
- dotenv for environment configs
- Deployed on Vercel

---

## API Endpoints

### User Authentication

| Method | Endpoint              | Description                        | Auth Required |
|--------|-----------------------|------------------------------------|---------------|
| POST   | `/users/register`     | Register a new user                | No            |
| POST   | `/users/login`        | Login user and receive JWT token   | No            |
| GET    | `/users/current-user` | Get details of the logged-in user  | Yes           |

### Events

| Method | Endpoint              | Description                                   | Auth Required |
|--------|-----------------------|-----------------------------------------------|---------------|
| GET    | `/events`              | Get all events with optional search/filter    | Yes           |
| POST   | `/events/create-Event` | Create a new event                            | Yes           |
| GET    | `/events/my-event?email=`| Get All event of a single user              | Yes           |
| GET    | `/events/:id`          | Get details of a single event                 | Yes           |
| PUT    | `/events/:id`          | Update event details                          | Yes           |
| DELETE | `/events/:id`          | Delete an event                               | Yes           |
| PUT    | `/events/join/:id`     | Join an event (increment attendee count)      | Yes           |



## ⚙️ Installation & Running Locally

```bash
# Clone the repository
git clone https://github.com/nahidn228/EventZen-server.git
cd EventZen-server

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Fill in MONGODB_URI,  etc.

# Start the server
npm run dev
