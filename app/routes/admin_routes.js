import express from 'express';
const router = express.Router();
import User from '../models/user_model.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// //@desc         User signin, recieve JWT token
// //@route        POST /api/{version}/users/:id
// //@access       Public
router.get("/users", async (req, res) => {
    try {
        const users = await User.find({});
        return res.json(users);
    } catch (err) {
        return res.status(404).json({ msg: err.name });
    }
});

// //@desc         User signin, recieve JWT token
// //@route        POST /api/{version}/users/:id
// //@access       Public
router.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        return res.json(user);
    } catch (err) {
        return res.status(404).json({ msg: err.name });
    }
});

router.put("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id);
        if (req.body.name && req.body.name !== null && req.body.name !== '') {
            user.name = req.body.name;
        }

        if (req.body.email && req.body.email !== null && req.body.email !== '') {
            user.email = req.body.email;
        }

        if (req.body.password && req.body.password !== null && req.body.password !== '') {
            var salt = bcrypt.genSaltSync(10);
            var hash = await bcrypt.hash(req.body.password, salt);
            user.password = hash;
        }

        await user.save();
        return res.json(user);
    } catch (err) {
        return res.status(404).json({ msg: err.name });
    }
});

router.delete("/users/:id", async (req, res) => {
    try {
        await User.findOneAndRemove({ _id: req.params.id });
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        return res.status(404).json({ msg: err.name });
    }
});

export default router;