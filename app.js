const express = require('express');
const app = express();
const userRoutes = require("./routes/userRoutes");
const errorHandler = require('./middlewares/errorHandler');
const ConnectDB = require("./config/dbConfig");

require("dotenv").config();

ConnectDB();

app.use(express.json());
app.use("/api/users/", userRoutes);
app.use(errorHandler);

module.exports = app;