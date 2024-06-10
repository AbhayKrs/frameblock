import express from 'express';
const router = express.Router();
import Template from '../models/template_model.js';

// @desc    Fetch Templates
// @route   GET /api/{version}/templates
// @access  Private/Admin
router.get('/', async (req, res) => {
    try {
        const templates = await Template.find({});
        res.json(templates);
    } catch (err) {
        return res.status(404).json({ msg: err.name });
    }
});

// @desc    Create draft
// @route   GET /api/{version}/templates/create
// @access  Private/Admin
router.post('/create', async (req, res) => {
    try {
        const newTemplate = new Template({
            template_name: req.body.name,
            type: req.body.type,
            font: req.body.font,
            theme: req.body.theme,
            valid_fields: req.body.validFields,
            created_on: new Date(),
            last_modified: new Date()
        });

        newTemplate.save()
            .then(template => res.json(template))
            .catch(err => console.log(err))
    } catch (err) {
        return res.status(404).json({ msg: err.name });
    }
});

// @desc    Get user by ID
// @route   GET /api/{version}/templates/:id
// @access  Private/Admin
router.get('/:id', async (req, res) => {
    try {
        const template = await Template.findById(req.params.id);
        res.json(template);
    } catch (err) {
        return res.status(404).json({ msg: err.name });
    }
});

export default router;