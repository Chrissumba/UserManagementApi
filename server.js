const express = require('express');
const endpoints = require('./data');
const app = express();

app.use(express.json());

//Signup Feature
app.post('/api/signup', (req, res) => {
    const { name, email, password } = req.body;

    // Perform signup logic here
    // For simplicity, we'll assume a new user can sign up successfully
    const newUser = {
        id: nextId,
        name,
        email,
        password
    };
    endpoints.users.push(newUser);
    nextId++;

    res.json({ message: 'Signup successful', user: newUser });
});

//Login EndPoint

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Perform authentication logic here
    // For simplicity, we'll assume a user with email "test@example.com" and password "password" can successfully login
    if (email === 'test@example.com' && password === 'password') {
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ error: 'Invalid email or password' });
    }
});


app.get('/api/endpoints', (req, res) => {
    res.json(endpoints);
});

//Add a user to the API.

let nextId = endpoints.users.length + 1;
app.post('/api/endpoints', (req, res) => {
    const newUser = {
        id: nextId,
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        address: req.body.address
    };
    endpoints.users.push(newUser);
    nextId++;
    res.json(endpoints);
});

app.get('/', (req, res) => {
    res.send('Welcome');
});

//Delete a user
app.delete('/api/endpoints/:userId', (req, res) => {
    const userId = req.params.userId;
    const userIndex = endpoints.users.findIndex(user => user.id === parseInt(userId));
    if (userIndex !== -1) {
        endpoints.users.splice(userIndex, 1);
        res.json({ message: 'User has been deleted' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});


// one user
app.get('/api/endpoints/:userId', (req, res) => {
    const userId = req.params.userId;
    const user = endpoints.users.find(user => user.id === parseInt(userId));

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});


//Login (password,email)


app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
});

const port = 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));