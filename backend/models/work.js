const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    skills: {type: Array, required: true},
    dueDate: {type: Date, required: true},
    imageCover: {type: String, required: true},
    images: {type: [String], required: true},
    school: {type: String, required: true},
    schoolYear: {type: String, required: true},
    author: {type: String, required: true},
    status: {type: String, enum: ['In Progress', 'Completed', 'On Hold'], default: 'In Progress'}, // Statut du projet

    // Autres champs possibles
    projectUrl: {type: String}, // Lien vers le projet ou le site web
    projetLinks: {type: [{title: String, url: String}]}, // Liens supplémentaires pour le projet
    repositoryUrl: {type: String}, // Lien vers le dépôt de code source (ex: GitHub)
    client: {type: String}, // Nom du client ou de l'entreprise pour laquelle le projet a été réalisé
    budget: {type: Number, default: 0}, // Budget alloué pour le projet
    testimonials: [{ // Témoignages ou retours du client
        name: {type: String},
        feedback: {type: String},
        date: {type: Date}
    }],
    category: {type: String}, // Catégorie du projet (ex: Web Development, Graphic Design)
    tools: {type: [String]}, // Outils ou technologies spécifiques utilisés
    createdAt: {type: Date, default: Date.now}, // Date de création de l'entrée du projet
    updatedAt: {type: Date, default: Date.now}, // Date de dernière mise à jour
    visibility: {type: String, enum: ['Public', 'Private'], default: 'Public'}, // Contrôle de la visibilité du projet sur le portfolio
    featured: {type: Boolean, default: false}, // Indique si le projet doit être mis en avant
    tags: {type: [String]}, // Mots-clés ou tags associés au projet
});

const Work = mongoose.model('Work', workSchema);

module.exports = Work;
