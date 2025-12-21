const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// --- MIDDLEWARE ---
app.use(cors()); // Allow frontend to talk to backend
app.use(express.json()); // Allow sending JSON data
// Serve the "uploads" folder publicly so we can download PDFs later
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- DATABASE CONNECTION ---
// OPTION A: If you have MongoDB installed locally
const MONGO_URI = "mongodb+srv://ashutoshintech_db_user:Ashutosh1@ashutosh.2zjs3us.mongodb.net/?appName=ashutosh"; 
// OPTION B: If using MongoDB Atlas (Cloud), paste your connection string here instead.

mongoose.connect(MONGO_URI)
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// --- SCHEMA (Database Blueprint) ---
const CertificateSchema = new mongoose.Schema({
    certId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    course: { type: String, required: true },
    score: String,
    grade: String,
    coordinator: String,
    date: String,
    pdfFileName: String // We will store just the filename here
});

const Certificate = mongoose.model('Certificate', CertificateSchema);

// --- FILE STORAGE CONFIG (Multer) ---
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save files in 'uploads' folder
    },
    filename: function (req, file, cb) {
        // Rename file to avoid duplicates (e.g., CERT-123.pdf)
        // We use the timestamp + original name to be safe
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// --- ROUTES ---

// 1. UPLOAD Route (Admin)
// 'pdf' is the key name we will use in the frontend form data
app.post('/api/upload', upload.single('pdf'), async (req, res) => {
    try {
        const { certId, name, course, score, grade, coordinator, date } = req.body;
        const pdfFileName = req.file ? req.file.filename : null;

        const newCert = new Certificate({
            certId, name, course, score, grade, coordinator, date, pdfFileName
        });

        await newCert.save();
        res.status(201).json({ message: "Certificate Uploaded Successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to upload certificate. ID might be duplicate." });
    }
});

// 2. SEARCH Route (Student)
app.get('/api/certificate/:id', async (req, res) => {
    try {
        const cert = await Certificate.findOne({ certId: req.params.id });
        if (cert) {
            res.json(cert);
        } else {
            res.status(404).json({ message: "Certificate not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

// 3. EDIT/UPDATE Route (Admin)
app.put('/api/certificate/:id', async (req, res) => {
    try {
        // Note: For simplicity, we are not updating the PDF file here, just text data.
        const updatedCert = await Certificate.findOneAndUpdate(
            { certId: req.params.id }, 
            req.body, 
            { new: true }
        );
        res.json(updatedCert);
    } catch (error) {
        res.status(500).json({ error: "Update failed" });
    }
});

// 4. DELETE Route (Admin)
app.delete('/api/certificate/:id', async (req, res) => {
    try {
        const deletedCert = await Certificate.findOneAndDelete({ certId: req.params.id });
        if (deletedCert && deletedCert.pdfFileName) {
            // Optional: Delete the file from the uploads folder too
            const filePath = path.join(__dirname, 'uploads', deletedCert.pdfFileName);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Delete failed" });
    }
});
// 5. GET ALL Route (For Admin Dashboard)
app.get('/api/certificates', async (req, res) => {
    try {
        const allCerts = await Certificate.find();
        res.json(allCerts);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});
// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});