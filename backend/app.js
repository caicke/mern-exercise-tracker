const express = require('express');

const app = express('express');

app.listen(5000, () => {
    console.log("Server running")
});