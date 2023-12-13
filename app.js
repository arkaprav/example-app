const express = require('express');
const app = express();
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const errorHandler = require('./middlewares/errorHandler');
const ConnectDB = require("./config/dbConfig");

require("dotenv").config();

ConnectDB();

app.use(express.json());
app.use("/api/users/", userRoutes);
app.use("/api/admins/", adminRoutes);
app.use(errorHandler);

module.exports = app;