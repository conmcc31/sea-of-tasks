# Sea of tasks
A small **MERN** todo app with an aquatic theme. Rather than a plain list of tasks, todos float in a "**sea of tasks**."

Tasks are visualized as bobbing cards whose depth, color, and a buoy indicator reflect how urgent they are. It’s a simple but fun example of a fullstack application with animated UI elements.

---

## Features

- **Full CRUD todos** backed by MongoDB (create, read, update, delete)
- **“Sea of tasks” visualization**:
    - Tasks sit at different depths depending on how far away their due dates are
    - Each card gently bobs with a staggered phase, simulating sea motion.
    - Card tints change with urgency (later → soon → today → overdue)
    - A vertical buoy indicator shows how “full” the urgency is
- **Animated header wave** using SVG + CSS keyframe animation
- **Loading state / UX polish**:
    - Friendly loading text (“Calming the sea of tasks…”)
    - Cards fade in once everything is ready instead of snapping into place
- **React Router** for page navigation (Home, Todos, Todo Detail)
- Clean, modern **CSS (no UI framework)** to practice fundamentals

--- 

## Tech Stack

**Frontend**
- React (Hooks + React Router)
- Vanilla CSS for layout, cards, and animations

**Backend**
- Node.js + Express
- MongoDB + Mongoose

**Dev tooling**
- `nodemon` (Dev server, if used)
- Create React App dev server with proxy to Express

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance running (local or cloud, e.g. MongoDB Atlas)

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/sea-of-tasks.git
cd sea-of-tasks 
```

### 2. Set up the server
```bash
cd server
npm install
```
Create a .env file in ```server/```
```env
MONGODB_URI=mongodb://localhost:27017/sea-of-tasks
PORT=3001
```
Then run:
```bash
npm run dev 
```
API should be available at http://localhost:3001

### 3. Set up the client
In another terminal, do the following:
```bash
cd client
npm install
```
Make sure ```client/package.json``` has a proxy pointing at the server:
```env
"proxy": "http://localhost:3001
```
Then run:
```bash
npm start
```
The React app will be at http://localhost:3000
The client talks to the server via relative URLs like ```/api/todos``` and dev traffic is proxied to Express.

---

## Project Structure

```text
sea-of-tasks/
  README.md
  server/
    package.json
    src/...
    routes/
      api.js         # /api/todos endpoints (CRUD)
    models/
      Todo.js        # Todo schema with text, completed, dueDate, timestamps
  client/
    package.json
    src/
      App.js
      components/
        HeaderWave.js      # Animated SVG header wave
      pages/
        HomePage.js
        TodoPage.js        # Main "sea of tasks" view
        TodoDetailPage.js  # Per-task detail/edit view
      styles/
        global.css         # Global styles + gradient background
      ...

```