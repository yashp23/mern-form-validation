// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/formDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB connection error:", err));

// Define Schema and Model
const formSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    contact: String,
    gender: String,
    age: String,
    dob: String,
    country: String,
    address: String
});

const FormData = mongoose.model('FormData', formSchema);

// API to submit form data
app.post('/submit', async (req, res) => {
    try {
        const data = new FormData(req.body);
        await data.save();
        res.status(201).send(data);
    } catch (error) {
        res.status(500).send("Error saving data");
    }
});

// API to fetch all submitted data
app.get('/data', async (req, res) => {
    try {
        const data = await FormData.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send("Error retrieving data");
    }
});

// Update form data by ID
app.put('/submit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = await FormData.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedData) {
            return res.status(404).send("Data not found");
        }

        res.status(200).send(updatedData);
    } catch (error) {
        res.status(500).send("Error updating data");
    }
});

// Delete form data by ID
app.delete('/submit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedData = await FormData.findByIdAndDelete(id);

        if (!deletedData) {
            return res.status(404).send("Data not found");
        }

        res.status(200).send("Data successfully deleted");
    } catch (error) {
        res.status(500).send("Error deleting data");
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
