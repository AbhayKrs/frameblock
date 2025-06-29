import express from 'express';
const router = express.Router();
import Draft from '../models/draft_model.js';
import Template from '../models/template_model.js';

import { fetchDefaultData, fetchDefaultOrder } from '../utils/resume-structure.js';
import mongoose from 'mongoose';
import { validateDraftEdit_Content, validateDraftEdit_Primary } from '../middleware/apiValidator.js';

// @desc    Create draft
// @route   GET /api/{version}/drafts/create
// @access  Private/Admin
router.post('/create', async (req, res) => {
    try {
        const template = await Template.findById(req.body.templateID);

        const newDraft = new Draft({
            draft_name: 'dr_' + Math.floor(Math.random() * (9999 - 1000) + 1000),
            template_id: req.body.templateID,
            template_name: template.template_name,
            user_id: req.body.userID,
            created_on: new Date(),
            last_modified: new Date(),
            data: fetchDefaultData(req.body.templateID),
            view_order: fetchDefaultOrder(req.body.templateID)
        });

        newDraft.save()
            .then(draft => res.json(draft))
            .catch(err => console.log(err))
    } catch (err) {
        return res.status(404).json({ msg: err.name });
    }
});

// @desc    Create draft
// @route   GET /api/{version}/drafts/create
// @access  Private/Admin
router.post('/duplicate', async (req, res) => {
    try {
        const originalDraft = await Draft.findById(req.body.draftID);
        originalDraft._id = new mongoose.Types.ObjectId();
        originalDraft.draft_name = originalDraft.draft_name + " copy";
        originalDraft.isNew = true;
        // let duplicateDraft = { ...originalDraft, draft_name: originalDraft.draft_name + " copy" };

        console.log('dup', originalDraft);
        originalDraft.save()
            .then(draft => res.json(draft))
            .catch(err => console.log(err))
    } catch (err) {
        return res.status(404).json({ msg: err.name });
    }
});

// @desc    Get user draft by ID
// @route   GET /api/{version}/drafts/:id
// @access  Private/Admin
router.get('/:id', async (req, res) => {
    try {
        const draft = await Draft.findById(req.params.id);
        res.json(draft);
    } catch (err) {
        res.status(404).json({ msg: err.name });
    }
});

// @desc    Edit user draft by ID
// @route   GET /api/{version}/drafts/:id
// @access  Private / Admin
router.put('/:id', async (req, res) => {
    try {
        const draft = await Draft.findByIdAndUpdate(req.params.id);
        const editType = req.body.type;

        switch (editType) {
            case 'primary': {
                const { errorMsg, isValid } = validateDraftEdit_Primary(req.body);
                if (!isValid) {
                    return res.status(400).json(errorMsg)
                }

                draft.template_id = req.body.templateID;
                draft.template_name = req.body.template_name;
                draft.draft_name = req.body.draft_name;
                break;
            }
            case 'content': {
                if (req.body.data !== null && Object.keys(req.body.data).length !== 0)
                    draft.data = { ...req.body.data };
                break;
            }
            case 'view': {
                if (req.body.viewOrder !== null)
                    draft.view_order = { ...req.body.viewOrder };
                break;
            }
            default: { break; }
        }

        await draft.save();
        res.json('Successfully updated draft');
    } catch (err) {
        res.status(404).json({ msg: err.name });
    }
});

// @desc    Delete user by ID
// @route   GET /api/{version}/drafts/:id
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
    try {
        await Draft.findOneAndRemove({ _id: req.params.id });
        res.json({ message: 'Draft removed successfully!' });
    } catch (err) {
        res.status(404).json({ msg: err.name });
    }
});

export default router;