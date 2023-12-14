const express = require('express');
const app = express();
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const frameRoutes = require("./routes/frameRoutes");
const lensRoutes = require("./routes/lensRoutes");
const contactLensRoutes = require("./routes/contactLensRoutes");
const orderRoutes = require("./routes/orderRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const storeDetailsRoute = require("./routes/storeDetailsRoute");
const errorHandler = require('./middlewares/errorHandler');
const ConnectDB = require("./config/dbConfig");

require("dotenv").config();

ConnectDB();

app.use(express.json());
app.use("/api/admins/", adminRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/frames/", frameRoutes);
app.use("/api/lenses/", lensRoutes);
app.use("/api/contactlenses/", contactLensRoutes);
app.use("/api/orders/", orderRoutes);
app.use("/api/prescriptions/", prescriptionRoutes);
app.use("/api/storedetails/", storeDetailsRoute);
app.use(errorHandler);

module.exports = app;