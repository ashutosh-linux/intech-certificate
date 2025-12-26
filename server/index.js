require('dotenv').config();
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
    registrationNumber: String,
    name: String,
    fatherName: String,
    dateOfBirth: String,
    course: String,
    courseDuration: String,
    durationFrom: String,
    durationTo: String,
    issueDate: String,
    fullMarks: String,
    marksObtained: String,
    percentage: String,
    grade: String,
    center: String,
    pdfFileName: String
});

const Certificate = mongoose.model('Certificate', CertificateSchema);

// --- CONTACT MESSAGE SCHEMA ---
const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    subject: String,
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', ContactSchema);

// --- QUERY SCHEMA ---
const QuerySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Query = mongoose.model('Query', QuerySchema);
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
        console.log('Upload request body:', req.body);
        const { certId, registrationNumber, name, fatherName, dateOfBirth, course, courseDuration, durationFrom, durationTo, issueDate, fullMarks, marksObtained, percentage, grade, center } = req.body;
        const pdfFileName = req.file ? req.file.filename : null;

        const newCert = new Certificate({
            certId,
            registrationNumber,
            name,
            fatherName,
            dateOfBirth,
            course,
            courseDuration,
            durationFrom,
            durationTo,
            issueDate,
            fullMarks,
            marksObtained,
            percentage,
            grade,
            center,
            pdfFileName
        });

        await newCert.save();
        res.status(201).json({ message: "Certificate Uploaded Successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to upload certificate. ID might be duplicate." });
    }
});

// Helper to pull certificate ID when it may include slashes (e.g., ICE/15/1581)
const getCertIdFromReq = (req) => {
    // For regex routes below, params[0] holds the capture group
    return decodeURIComponent(req.params[0] || '');
};

// 2. SEARCH Route (Student)
// Regex route to allow slashes in the certificate ID
app.get(/^\/api\/certificate\/(.+)$/, async (req, res) => {
    try {
        const certId = getCertIdFromReq(req);
        const cert = await Certificate.findOne({ certId });
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
app.put(/^\/api\/certificate\/(.+)$/, async (req, res) => {
    try {
        const certId = getCertIdFromReq(req);
        console.log('Update request for:', certId);
        console.log('Update data:', req.body);
        // Note: For simplicity, we are not updating the PDF file here, just text data.
        const updatedCert = await Certificate.findOneAndUpdate(
            { certId }, 
            req.body, 
            { new: true, runValidators: false }
        );
        console.log('Updated certificate:', updatedCert);
        res.json(updatedCert);
    } catch (error) {
        res.status(500).json({ error: "Update failed" });
    }
});

// 4. DELETE Route (Admin)
app.delete(/^\/api\/certificate\/(.+)$/, async (req, res) => {
    try {
        const certId = getCertIdFromReq(req);
        const deletedCert = await Certificate.findOneAndDelete({ certId });
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

// 6. CONTACT FORM SUBMISSION Route (Student/User)
app.post('/api/contact', async (req, res) => {
    try {
        console.log('Contact form submission:', req.body);
        const { name, email, phone, subject, message } = req.body;
        
        // Save to database (Contact collection for admin inbox)
        const newContact = new Contact({
            name,
            email,
            phone,
            subject,
            message,
            isRead: false
        });

        // Save to Queries collection for new query section
        const newQuery = new Query({
            name,
            email,
            subject,
            message
        });
        
        await Promise.all([newContact.save(), newQuery.save()]);
        res.status(201).json({ message: "Thank you! We received your message and will get back to you soon." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to submit contact form" });
    }
});

// 7. GET ALL CONTACTS Route (Admin)
app.get('/api/contacts', async (req, res) => {
    try {
        const allContacts = await Contact.find().sort({ createdAt: -1 });
        res.json(allContacts);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

// 7b. GET ALL QUERIES Route (Admin - Query Section)
app.get('/api/queries', async (req, res) => {
    try {
        const allQueries = await Query.find().sort({ createdAt: -1 });
        res.json(allQueries);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

// 8. MARK CONTACT AS READ (Admin)
app.put('/api/contact/:id/read', async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );
        res.json(updatedContact);
    } catch (error) {
        res.status(500).json({ error: "Update failed" });
    }
});

// 9. DELETE CONTACT (Admin)
app.delete('/api/contact/:id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Delete failed" });
    }
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});