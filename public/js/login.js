const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const app = express();

// Use middleware to parse request bodies as JSON and URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dummy database (replace this with your actual database)
const users = [];

// Encryption/Decryption key (in real-world scenarios, securely manage keys)
const encryptionKey = 'secretencryptionkey';

// Encrypt function using AES
function encrypt(text) {
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Decrypt function using AES
function decrypt(encrypted) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Signup route
app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password, gender, region } = req.body;

    // Check if user already exists
    if (users.some(user => user.email === email)) {
        return res.status(400).send('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Encrypt sensitive information
    const encryptedEmail = encrypt(email);
    const encryptedFirstName = encrypt(firstName);
    const encryptedLastName = encrypt(lastName);
    const encryptedPassword = encrypt(hashedPassword);
    const encryptedGender = encrypt(gender);
    const encryptedRegion = encrypt(region);

    // Save encrypted user information to database 
    users.push({ 
        encryptedEmail, 
        encryptedFirstName, 
        encryptedLastName, 
        encryptedPassword, 
        encryptedGender, 
        encryptedRegion 
    });

    res.redirect('/login');
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = users.find(user => decrypt(user.encryptedEmail) === email);

    // If user doesn't exist, return error
    if (!user) {
        return res.status(401).send('User not found');
    }

    // Decrypt and compare passwords
    const hashedPassword = decrypt(user.encryptedPassword);
    if (!(await bcrypt.compare(password, hashedPassword))) {
        return res.status(401).send('Invalid password');
    }

    // Dummy authentication successful, redirect to profile page
    res.send('Login successful. Redirect to profile page.');
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
