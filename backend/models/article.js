const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Titre de l'article
    slug: { type: String, required: true, unique: true }, // Slug pour l'URL (généré à partir du titre)
    content: { type: String, required: true }, // Contenu de l'article
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, // Référence à l'auteur de l'article
    category: { type: String, required: true }, // Catégorie de l'article
    tags: { type: [String] }, // Mots-clés associés à l'article
    imageUrl: { type: String }, // URL de l'image en vedette
    published: { type: Boolean, default: false }, // Indique si l'article est publié ou non
    publishedAt: { type: Date }, // Date de publication
    createdAt: { type: Date, default: Date.now }, // Date de création de l'article
    updatedAt: { type: Date, default: Date.now }, // Date de la dernière mise à jour
    comments: [{ // Commentaires sur l'article
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Référence à l'utilisateur qui a commenté
        comment: { type: String, required: true }, // Contenu du commentaire
        createdAt: { type: Date, default: Date.now } // Date de création du commentaire
    }],
    likes: [{ // Utilisateurs qui ont aimé l'article
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Référence à l'utilisateur qui a aimé
        likedAt: { type: Date, default: Date.now } // Date où l'article a été aimé
    }],
    views: { type: Number, default: 0 }, // Nombre de vues de l'article
});

module.exports = mongoose.model('Article', articleSchema);
