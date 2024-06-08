const express = require('express')
const app = express()
const connectDB = require('./database/connctDB');
const middleware = require('./middleware/middleware');
const port = process.env.PORT || 5000;

middleware(app);
const router = require('./router/router');
const User = require('./models/userModel');
const OfficeSchema = require('./models/officeModel');

// Routes
app.use(router);

app.get('/api/all-offices', async (req, res) => {
    const email = req.query.email;
    console.log(email);
    const result = await User.find({ adminEmail: email });
    res.json(result);
})

app.get('/api/profile', async (req, res) => {
    try {
        const userEmail = req.query.email;
        console.log('email form profilr', userEmail);
        const userProfile = await OfficeSchema.findOne({ email: userEmail })
        console.log(userProfile);

        if (!userProfile) {
            return res.status(404).json({ error: 'User profile not found' });
        }
        res.json(userProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/sort-by-date', async (req, res) => {
    const range = req.query.date;

    let startDate, endDate;

    switch (range) {
        case 'today':
            startDate = new Date();
            startDate.setHours(0, 0, 0, 0);
            endDate = new Date();
            endDate.setHours(23, 59, 59, 999);
            break;
        case 'week':
            startDate = new Date();
            startDate.setHours(0, 0, 0, 0);
            startDate.setDate(startDate.getDate() - startDate.getDay());
            endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 6);
            endDate.setHours(23, 59, 59, 999);
            break;
        case 'month':
            startDate = new Date();
            startDate.setHours(0, 0, 0, 0);
            startDate.setDate(1);
            endDate = new Date(startDate);
            endDate.setMonth(endDate.getMonth() + 1);
            endDate.setDate(0);
            endDate.setHours(23, 59, 59, 999);
            break;
        default:
            res.status(400).json({ error: 'Invalid date range' });
            return;
    }

    try {
        const data = await User.find({
            createdAt: { $gte: startDate, $lte: endDate },
        }).sort({ createdAt: 'asc' });
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/search', async (req, res) => {
    const { searchName } = req.query;
    try {
        const results = await User.find({ surname: { $regex: new RegExp(searchName, 'i') } });
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/hello', async (req, res) => {
    res.json({ message: 'hello world' });
});



app.get('/api/health', (req, res) => {
    res.send('Server is good');
})

app.all('*', (req, res, next) => {
    const error = new Error(`Invalid url: [${req.url}]`)
    error.status = 404;
    next(error)
})

app.use((err, req, res, next) => {
    res.status(err.status || 5000).json({ message: err.message });
})

const final = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log('VERBA LTD DB Connect Successfully');
        console.log(`Server running at http://localhost:${port}`);
    })
}

final();
