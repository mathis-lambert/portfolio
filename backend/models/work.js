const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    skills: {type: Array, required: true},
    dueDate: {type: Date, required: true},
    budget: {type: Number, required: true},
    imageUrl: {type: String, required: true},
    userId: {type: String, required: true},
    status: {type: String, enum: ['In Progress', 'Completed', 'On Hold'], default: 'In Progress'}, // Statut du projet

    // Autres champs possibles
    projectUrl: {type: String}, // Lien vers le projet ou le site web
    repositoryUrl: {type: String}, // Lien vers le dépôt de code source (ex: GitHub)
    client: {type: String}, // Nom du client ou de l'entreprise pour laquelle le projet a été réalisé
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
