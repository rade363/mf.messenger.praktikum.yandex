const path = require("path");
const express = require('express');

const app = express();
const PORT = process.env.PORT || 4000;

app.use('/', express.static(path.join(__dirname, "static")));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "static/index.html"));
});

app.listen(PORT, function (err) {
    if (err) {
        return console.error("[EXPRESS] Could not start", err)
    }
    console.info(`[EXPRESS] App listening on port ${PORT}!`);
});