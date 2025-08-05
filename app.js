const express = require('express');
const path = require('path');
const routes = require(path.join(__dirname, 'src', 'routes', 'taskManager.js'));
const app = express();
const port = 3000;

// Request logging middleware
app.use((req, res, next) => {
    try {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${req.method} ${req.url}`);
        next();
    } catch (err) {
        next(err);
    }
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);
app.listen(port, (err) => {
    if (err) {
        return console.error('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;