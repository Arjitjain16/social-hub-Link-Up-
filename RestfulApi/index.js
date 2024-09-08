const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan")
const helmet = require("helmet")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(express.json());
app.use(helmet())
app.use(morgan())

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define routes
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)

// Start the server
const PORT = 8000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
