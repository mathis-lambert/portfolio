const express = require('express');
const Work = require('../models/work');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

// Routes sécurisées
router.post('/', protect, async (req, res) => {
    try {
        const work = new Work(req.body);
        await work.save();
        res.status(201).send(work);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.put('/:id', protect, async (req, res) => {
    try {
        const work = await Work.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!work) {
            return res.status(404).send({ message: 'Work not found' });
        }
        res.status(200).send(work);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/:id', protect, async (req, res) => {
    try {
        const work = await Work.findByIdAndDelete(req.params.id);
        if (!work) {
            return res.status(404).send({ message: 'Work not found' });
        }
        res.status(200).send({ message: 'Work deleted successfully' });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Routes en lecture seule
router.get('/', async (req, res) => {
    try {
        const works = await Work.find();
        console.log(works);
        res.status(200).send(works);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const work = await Work.findById(req.params.id);
        if (!work) {
            return res.status(404).send({ message: 'Work not found' });
        }
        res.status(200).send(work);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
