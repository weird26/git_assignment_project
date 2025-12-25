const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB URI (replace with your actual one)
mongoose.connect("mongodb://127.0.0.1:27017/todoDB")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

// Schema & Model
const todoSchema = new mongoose.Schema({
    itemName: String,
    itemDescription: String
});

const Todo = mongoose.model("Todo", todoSchema);

// POST Route
app.post("/submittodoitem", async (req, res) => {
    try {
        const { itemName, itemDescription } = req.body;

        const newTodo = new Todo({ itemName, itemDescription });
        await newTodo.save();

        res.json({ message: "To-Do Item Stored Successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
