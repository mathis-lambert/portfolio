const User = require('../models/user'); // Assurez-vous que le chemin est correct

// Fonction pour créer un utilisateur admin
async function createAdminUser() {
    try {
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'password123';

        const existingAdmin = await User.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log('Admin user already exists.');
            return;
        }

        const adminUser = new User({
            email: adminEmail,
            password: adminPassword,
            role: 'admin',
        });

        await adminUser.save();
        console.log('Admin user created successfully.');
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
}

module.exports = createAdminUser;
