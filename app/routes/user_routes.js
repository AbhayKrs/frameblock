import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();
import User from '../models/user_model.js';
import Draft from '../models/draft_model.js';

import { validateSigninInput, validateSignupInput } from '../middleware/authenticate.js';

// //@desc         User signin, recieve JWT token
// //@route        POST /api/{version}/users/login
// //@access       Public
router.post("/signin", async (req, res) => {
    try {
        let userList = await User.find();
        const username = req.body.username;
        const password = req.body.password;

        const { errorMsg, isValid } = validateSigninInput(userList, req.body);
        if (!isValid) {
            return res.status(400).json(errorMsg)
        }

        User.findOne({ username }).then(user => {
            bcrypt.compare(password, user.password).then((isMatch) => {
                if (isMatch) {
                    user.last_login = new Date();
                    user.save();
                    const payload = {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        username: user.username,
                        google_authenticated: user.google_authenticated
                    };
                    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "43200000" });
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                } else {
                    return res.status(400).json("Incorrect Password. Please try again!");
                }
            });
        });
    } catch (err) {
        return res.status(404).json({ msg: err.name });
    }
});

//@desc         Register a new user 
//@route        POST /api/{version}/users/register
//@access       Public
router.post("/signup", (req, res) => {
    try {
        // Verify that first name is not empty
        const { errors, isValid } = validateSignupInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }

        User.findOne({ username: req.body.username }).then(user => {
            if (user) {
                return res.status(400).json('User already exists');
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password,
                    created_on: new Date(),
                    last_login: new Date()
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                console.log('user', user);
                                const payload = {
                                    id: user._id,
                                    name: user.name,
                                    username: user.username,
                                    email: user.email,
                                    google_authenticated: user.google_authenticated
                                };
                                jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "43200000" },
                                    (err, token) => {
                                        res.json({
                                            success: true,
                                            token: "Bearer " + token
                                        });
                                    }
                                )
                            })
                            .catch(err => console.log(err));
                    })
                })
            }
        })
    } catch (err) {
        return res.status(404).json({ msg: err.name });
    }
});

// @desc    Login via Google
// @route   GET /api/{version}/users/googleAuth
// @access  Private
router.get('/googleAuth', passport.authenticate('google', {
    scope: ['email', 'profile'],
    // prompt: 'select_account'
}));

// @desc    Login via Google
// @route   GET /api/{version}/users/googleAuth/success
// @access  Private
router.get('/googleAuth/callback', passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/google_failed',
    session: false
}), async (req, res) => {
    User.findOne({ google_id: req.user.id }).then(user => {
        const payload = {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            google_authenticated: user.google_authenticated
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "43200000" });
        let googleToken = "Bearer " + token
        res.redirect('http://localhost:3000/google_success?auth=' + googleToken)
    });
})

// @desc    Get user by ID
// @route   GET /api/{version}/users/:id
// @access  Private/Admin
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            google_authenticated: user.google_authenticated
        };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "43200000" }, (err, token) => {
            res.json({
                success: true,
                token: "Bearer " + token
            });
        })
    } catch (err) {
        return res.status(404).json({ msg: err.name });
    }
});

// @desc    Update user
// @route   PUT /api/{version}/users/:id
// @access  Private/Admin
router.put('/:id', async (req, res) => {
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
        return res.json('Successfully updated user details');
    } catch (err) {
        return res.status(404).json({ msg: err.name });
    }
});

// @desc    Delete user
// @route   DELETE /api/{version}/users/:id
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
    try {
        await User.findOneAndRemove({ _id: req.params.id });
        res.json({ message: 'User removed' });
    } catch (err) {
        return res.status(404).json({ msg: err.name });
    }
});

router.get('/:id/drafts', async (req, res) => {
    const drafts = await Draft.find({ 'user_id': req.params.id });
    res.json(drafts);
});

export default router;