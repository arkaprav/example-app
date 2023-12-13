const express = require('express');
const app = express();
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const frameRoutes = require("./routes/frameRoutes");
const errorHandler = require('./middlewares/errorHandler');
const ConnectDB = require("./config/dbConfig");

require("dotenv").config();

ConnectDB();

app.use(express.json());
app.use("/api/admins/", adminRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/frames/", frameRoutes);
app.use(errorHandler);

module.exports = app;