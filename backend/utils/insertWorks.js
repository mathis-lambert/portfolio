const fs = require('fs');
const path = require('path');
const Work = require('../models/work'); // Assurez-vous que le chemin est correct

// Fonction pour insérer les travaux dans la base de données
async function insertWorks() {
    try {
        const worksFilePath = path.join(__dirname, '../data/baseWorks.json');
        const worksData = fs.readFileSync(worksFilePath, 'utf-8');
        const works = JSON.parse(worksData);

        await Work.deleteMany({});

        for (const work of works) {
            const existingWork = await Work.findOne({ title: work.title});
            if (existingWork) {
                console.log(`Work with title "${work.title}" already exists.`);
                continue;
            }

            const newWork = new Work(work);
            await newWork.save();
            console.log(`Work "${work.title}" inserted successfully.`);
        }
    } catch (error) {
        console.error('Error inserting works:', error);
    }
}

module.exports = insertWorks;
