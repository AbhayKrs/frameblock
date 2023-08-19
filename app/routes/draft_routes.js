import express from 'express';
const router = express.Router();
import Draft from '../models/draft_model.js';
import Template from '../models/template_model.js';

import { fetchDefaultData } from '../utils/resume-structure.js';

// @desc    Create draft
// @route   GET /api/{version}/drafts/create
// @access  Private/Admin
router.post('/create', async (req, res) => {
    try {
        const template = await Template.findById(req.body.templateID);
        const newDraft = new Draft({
            draft_name: 'd_32513151',
            template_id: req.body.templateID,
            template_name: template.template_name,
            user_id: req.body.userID,
            created_on: new Date(),
            last_modified: new Date(),
            data: fetchDefaultData(req.body.templateID)
        });

        newDraft.save()
            .then(draft => res.json(draft))
            .catch(err => console.log(err))
    } catch (err) {
        return res.status(404).json({ msg: err.name });
    }
});

// @desc    Get user by ID
// @route   GET /api/{version}/drafts/:id
// @access  Private/Admin
router.get('/:id', async (req, res) => {
    try {
        const draft = await Draft.findById(req.params.id);
        res.json(draft);
    } catch (err) {
        return res.status(404).json({ msg: err.name });
    }
});

export default router;