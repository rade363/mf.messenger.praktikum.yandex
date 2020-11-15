const path = require('path');
const express = require('express');

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'static')));

app.listen(PORT, function (err) {
    if (err) {
        return console.error('[EXPRESS] Could not start', err)
    }
    console.log(`[EXPRESS] App listening on port ${PORT}!`);
});