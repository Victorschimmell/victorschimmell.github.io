const express = require('express');
const router = express.Router();
const path = require('path');

// Home page route
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/layout.html'));
});

// About page route
router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/about.html'));
});

// Projects page route
router.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/projects.html'));
});

// Experience page route
router.get('/experience', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/experience.html'));
});

module.exports = router;
