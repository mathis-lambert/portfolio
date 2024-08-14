const mongoose = require('mongoose');
const createAdminUser = require('../utils/createAdmin'); // Importer la fonction
const insertWorks = require("../utils/insertWorks")


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connecté à MongoDB');
        await createAdminUser(); // Appeler la fonction pour créer un utilisateur admin
        await insertWorks()
    } catch (err) {
        console.error('Erreur de connexion à MongoDB:', err);
        process.exit(1); // Quitte le processus avec échec
    }
};

module.exports = connectDB;
