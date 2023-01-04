const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

// const PORT = 7000;
const port = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Database connection Success.");
})
.catch((err) => {
    console.error("Mongo Connection Error", err);
})

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.get("/ping", (req, res) => {
    return res.send({
        error: false,
        message: "Server is healthy",
    });
});

app.use("/users", require("./routes/users"));

app.listen(port, () => {
    console.log("Server started listening on PORT : " + port);
})