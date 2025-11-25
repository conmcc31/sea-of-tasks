const path = require('path');
const express = require('express');
const mongoose= require('mongoose');
require('dotenv').config() //Loads MONGO_URI, PORT, etc

// Optional extras from app.js:
const morgan = require('morgan');           // logger('dev')
const cookieParser = require('cookie-parser');

const app = express();

/* ================== Common middleware ================== */
app.use(morgan('dev'));                     // log requests during dev
app.use(express.json());                    // parse JSON bodies
app.use(express.urlencoded({ extended: false })); // parse form posts
app.use(cookieParser());                    // parse cookies if you need sessions, etc.

// (Optional) keep a small public folder for server-only assets (health page, robots.txt, etc.)
app.use(express.static(path.join(__dirname, 'public')));

/* ================== API routes ================== */
// Your API lives under /api so the front-end can fetch('/api/...'):
app.use('/api', require('./routes/api'));


/* ================== Front-end (React) in production ================== */
if (process.env.NODE_ENV === 'production') {
    const clientBuildPath = path.join(__dirname, '..', 'client', 'build');
    app.use(express.static(clientBuildPath));

    // Important: put this AFTER your API routes, so it doesn't swallow /api/*.
    app.get('*', (req, res) => {
        res.sendFile(path.join(clientBuildPath, 'index.html'));
    });
}

/* ================== Start server ================== */
const PORT = process.env.PORT || 3001;

// --------- Mongo connect + start server ----------
mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`);
    })
})
.catch((err) => {
    console.error('MongoDB connection error: ', err.message);
    process.exit(1);
})