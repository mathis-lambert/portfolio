const express = require('express');
const Article = require('../models/article');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

// Routes sécurisées
router.post('/', protect, async (req, res) => {
    try {
        const article = new Article(req.body);
        await article.save();
        res.status(201).send(article);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.put('/:id', protect, async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!article) {
            return res.status(404).send({ message: 'Article not found' });
        }
        res.status(200).send(article);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/:id', protect, async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        if (!article) {
            return res.status(404).send({ message: 'Article not found' });
        }
        res.status(200).send({ message: 'Article deleted successfully' });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Routes en lecture seule
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).send(articles);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).send({ message: 'Article not found' });
        }
        res.status(200).send(article);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
