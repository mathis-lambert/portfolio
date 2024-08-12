require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const workRoutes = require('./routes/workRoutes');
const articleRoutes = require('./routes/articleRoutes'); // ou blogPostRoutes
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware pour parsing JSON
app.use(express.json());

// Connexion à MongoDB
connectDB();

// Routes
app.use('/login', authRoutes); // Route de login
app.use('/works', workRoutes);
app.use('/articles', articleRoutes); // ou app.use('/blogposts', blogPostRoutes);

// Lancement du serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
