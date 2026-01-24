const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'S0c!al@ddA#97_Secret';

app.use(cors());
app.use(bodyParser.json());

const CATEGORIES_PATH = path.join(__dirname, 'data', 'categories.json');
const INFLUENCERS_PATH = path.join(__dirname, 'data', 'influencers.json');
const USERS_PATH = path.join(__dirname, 'data', 'users.json');
const INQUIRIES_PATH = path.join(__dirname, 'data', 'inquiries.json');

// Helper to read JSON
const readData = (filePath) => {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// Helper to write JSON
const writeData = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
};

// Admin Auth Middleware
const authenticateAdmin = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send({ message: 'No token provided' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).send({ message: 'Unauthorized' });
        req.admin = decoded;
        next();
    });
};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, password, email, role = 'user' } = req.body;
        const users = readData(USERS_PATH);

        if (users.find(u => u.username === username)) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { id: Date.now().toString(), username, password: hashedPassword, email, role };

        users.push(newUser);
        writeData(USERS_PATH, users);

        const token = jwt.sign({ id: newUser.id, username, role }, SECRET_KEY, { expiresIn: '24h' });
        res.json({ success: true, token, user: { username, role, email } });
    } catch (err) {
        res.status(500).json({ message: 'Registration failed' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;

    // Hardcoded fallback for existing admin
    if (username === 'AddaLegend_9' && password === 'S0c!al@ddA#97') {
        const token = jwt.sign({ username, role: 'admin' }, SECRET_KEY, { expiresIn: '24h' });
        return res.json({ success: true, token, user: { username, role: 'admin' } });
    }

    const users = readData(USERS_PATH);
    const user = users.find(u => u.username === username);

    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id, username, role: user.role }, SECRET_KEY, { expiresIn: '24h' });
        res.json({ success: true, token, user: { username, role: user.role } });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Category Routes
app.get('/api/categories', (req, res) => {
    const categories = readData(CATEGORIES_PATH);
    res.json(categories);
});

app.post('/api/categories', authenticateAdmin, (req, res) => {
    const categories = readData(CATEGORIES_PATH);
    const newCategory = { id: Date.now().toString(), ...req.body };
    categories.push(newCategory);
    writeData(CATEGORIES_PATH, categories);
    res.json(newCategory);
});

app.put('/api/categories/:id', authenticateAdmin, (req, res) => {
    let categories = readData(CATEGORIES_PATH);
    categories = categories.map(cat => cat.id === req.params.id ? { ...cat, ...req.body } : cat);
    writeData(CATEGORIES_PATH, categories);
    res.json({ success: true });
});

app.delete('/api/categories/:id', authenticateAdmin, (req, res) => {
    let categories = readData(CATEGORIES_PATH);
    categories = categories.filter(cat => cat.id !== req.params.id);
    writeData(CATEGORIES_PATH, categories);
    res.json({ success: true });
});

// Influencer Routes
app.get('/api/influencers', (req, res) => {
    const influencers = readData(INFLUENCERS_PATH);
    res.json(influencers);
});

app.get('/api/influencers/:username', (req, res) => {
    const influencers = readData(INFLUENCERS_PATH);
    const influencer = influencers.find(inf => inf.username === req.params.username);
    if (influencer) res.json(influencer);
    else res.status(404).json({ message: 'Influencer not found' });
});

app.post('/api/influencers', authenticateAdmin, (req, res) => {
    const influencers = readData(INFLUENCERS_PATH);
    const newInfluencer = { id: Date.now().toString(), ...req.body };
    influencers.push(newInfluencer);
    writeData(INFLUENCERS_PATH, influencers);
    res.json(newInfluencer);
});

app.put('/api/influencers/:id', authenticateAdmin, (req, res) => {
    let influencers = readData(INFLUENCERS_PATH);
    influencers = influencers.map(inf => inf.id === req.params.id ? { ...inf, ...req.body } : inf);
    writeData(INFLUENCERS_PATH, influencers);
    res.json({ success: true });
});

// User Management Routes
app.get('/api/users', authenticateAdmin, (req, res) => {
    const users = readData(USERS_PATH);
    const safeUsers = users.map(({ password, ...rest }) => ({
        ...rest,
        joined: rest.joined || '2025-01-01',
        status: rest.status || 'Active'
    }));
    res.json(safeUsers);
});

app.post('/api/users', authenticateAdmin, (req, res) => {
    const users = readData(USERS_PATH);
    const newUser = { id: Date.now().toString(), ...req.body, joined: new Date().toISOString().split('T')[0] };
    users.push(newUser);
    writeData(USERS_PATH, users);
    res.json(newUser);
});

app.delete('/api/users/:id', authenticateAdmin, (req, res) => {
    let users = readData(USERS_PATH);
    users = users.filter(u => u.id !== req.params.id);
    writeData(USERS_PATH, users);
    res.json({ success: true });
});

// Campaign Routes (Mock for now)
let mockCampaigns = [
    { id: '1', name: 'Summer Vibes 2026', brand: 'Coca-Cola', status: 'Active', budget: '$25,000', dueDate: '2026-06-15', contributors: 4 },
    { id: '2', name: 'Tech Innovations Expo', brand: 'Samsung', status: 'Completed', budget: '$42,000', dueDate: '2026-03-20', contributors: 6 },
    { id: '3', name: 'Winter Essentials', brand: 'Uniqlo', status: 'Planned', budget: '$18,500', dueDate: '2026-11-10', contributors: 3 }
];

app.get('/api/campaigns', authenticateAdmin, (req, res) => {
    res.json(mockCampaigns);
});

app.post('/api/campaigns', authenticateAdmin, (req, res) => {
    const newCampaign = { id: Date.now().toString(), ...req.body, status: 'Active' };
    mockCampaigns.push(newCampaign);
    res.json(newCampaign);
});

// Inquiry Routes
app.get('/api/inquiries', (req, res) => {
    const inquiries = readData(INQUIRIES_PATH);
    res.json(inquiries);
});

app.post('/api/inquiries', (req, res) => {
    const inquiries = readData(INQUIRIES_PATH);
    const newInquiry = {
        id: Date.now().toString(),
        ...req.body,
        status: 'Pending',
        createdAt: new Date().toISOString()
    };
    inquiries.push(newInquiry);
    writeData(INQUIRIES_PATH, inquiries);
    res.json(newInquiry);
});

app.delete('/api/inquiries/:id', authenticateAdmin, (req, res) => {
    let inquiries = readData(INQUIRIES_PATH);
    inquiries = inquiries.filter(inq => inq.id !== req.params.id);
    writeData(INQUIRIES_PATH, inquiries);
    res.json({ success: true });
});

// Influencer Self-Registration & Management
app.post('/api/influencers/register', async (req, res) => {
    try {
        const influencers = readData(INFLUENCERS_PATH);
        const { email, username } = req.body;

        if (influencers.find(i => i.email === email || i.username === username)) {
            return res.status(400).json({ message: 'Influencer already exists' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newInfluencer = {
            id: Date.now().toString(),
            ...req.body,
            password: hashedPassword,
            status: 'Pending', // Approval needed
            joinedDate: new Date().toISOString().split('T')[0]
        };

        influencers.push(newInfluencer);
        writeData(INFLUENCERS_PATH, influencers);
        res.json({ success: true, message: 'Registration submitted for review' });
    } catch (err) {
        res.status(500).json({ message: 'Registration failed' });
    }
});

app.post('/api/influencers/login', async (req, res) => {
    const { email, password } = req.body;
    const influencers = readData(INFLUENCERS_PATH);
    const influencer = influencers.find(i => i.email === email);

    if (influencer && await bcrypt.compare(password, influencer.password)) {
        if (influencer.status !== 'Approved') {
            return res.status(403).json({ success: false, message: 'Your account is under admin review' });
        }

        const token = jwt.sign({ id: influencer.id, username: influencer.name, role: 'influencer' }, SECRET_KEY, { expiresIn: '24h' });
        return res.json({ success: true, token, user: { ...influencer, role: 'influencer' } });
    }

    res.status(401).json({ success: false, message: 'Invalid credentials' });
});

app.put('/api/influencers/status/:id', authenticateAdmin, (req, res) => {
    const { status } = req.body;
    let influencers = readData(INFLUENCERS_PATH);
    influencers = influencers.map(inf => inf.id === req.params.id ? { ...inf, status } : inf);
    writeData(INFLUENCERS_PATH, influencers);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
