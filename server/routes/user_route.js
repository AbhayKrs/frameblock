import express from 'express';
const router = express.Router();
import User from '../models/user_model.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {
    validateLoginInput,
    validateRegisterInput
} from '../middleware/authenticate.js';

// @desc    Get all users
// @route   GET /api/{version}/users
// @access  Private/Admin
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        return res.status(404).json({ msg: err.name });
    }
});

// //@desc         Auth user and get token
// //@route        POST /api/{version}/users/login
// //@access       Public
router.post("/signin", async (req, res) => {
    try {
        let userList = [];
        const username = req.body.username;
        const password = req.body.password;

        await User.find({}).then(users => {
            userList.push(...users)
        });

        const { errors, isValid } = validateLoginInput(userList, req.body);
        if (!isValid) { return res.status(400).json(errors) }

        User.findOne({ username }).then(user => {
            if (!user) {
                return res.status(404).json('User not found!')
            }
            bcrypt.compare(password, user.password).then((isMatch) => {
                if (isMatch) {
                    const payload = {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        joinDate: user.date,
                        google_authenticated: user.google_authenticated,
                    };
                    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 300000 },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            });
                        }
                    );
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
        const { errors, isValid } = validateRegisterInput(req.body);
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
                    password: req.body.password
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
                                    joinDate: user.date,
                                };
                                jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 300000 },
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
    prompt: 'select_account'
}));

// @desc    Login via Google
// @route   GET /api/{version}/users/googleAuth/success
// @access  Private
router.get('/googleAuth/callback', passport.authenticate('google', {
    failureRedirect: 'http://localhost:3000/google_failed',
    session: false
}), async (req, res) => {
    const authenticatedUser = await User.findOne({ google_id: req.user.id });
    let comment_count = 0;
    const comment_countList = authenticatedUser.explore.length > 0 && authenticatedUser.explore.map(item => item.comment_count);
    for (let i = 0; i < comment_countList.length; i++)
        comment_count += comment_countList[i];
    const payload = {
        id: authenticatedUser._id,
        name: authenticatedUser.name,
        username: authenticatedUser.username,
        email: authenticatedUser.email,
        bio: authenticatedUser.bio,
        avatar: authenticatedUser.avatar,
        joinDate: authenticatedUser.date,
        tokens: authenticatedUser.tokens,
        google_authenticated: authenticatedUser.google_authenticated,
        followers: authenticatedUser.followers,
        followers_count: authenticatedUser.followers_count,
        explore_count: authenticatedUser.explore_count,
        comment_count,
        bookmarked: authenticatedUser.bookmarked
    };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 31556926 },
        (err, token) => {
            let googleToken = "Bearer " + token
            res.redirect('http://localhost:3000/google_success?auth=' + googleToken)
        }
    );
})

// @desc    Get user by ID
// @route   GET /api/{version}/users/:id
// @access  Private/Admin
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        let comment_count = 0;
        const comment_countList = user.explore.map(item => item.comment_count);
        for (let i = 0; i < comment_countList.length; i++)
            comment_count += comment_countList[i];
        const payload = {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            bio: user.bio,
            avatar: user.avatar,
            joinDate: user.date,
            tokens: user.tokens,
            bookmarked: user.bookmarked,
            followers: user.followers,
            followers_count: user.followers_count,
            explore: user.explore,
            explore_count: user.explore_count,
            likes: user.likes,
            comment_count
        };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 31556926 }, (err, token) => {
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
        console.log('req.body', req.body)
        User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            username: req.body.username,
            bio: req.body.bio
        }, function (err, data) {
            if (err) {
                console.log('error:', err);
            } else {
                return res.json(data)
            }
        });
    } catch (err) {
        return res.status(404).json({ msg: err.name });
    }
});

// @desc    Delete user
// @route   DELETE /api/{version}/users/:id
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            await user.remove();
            res.json({ message: 'User removed' });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (err) {
        return res.status(404).json({ msg: err.name });
    }
});

// @desc    Logout user
// @route   GET /api/{version}/users/logout
// @access  Public
router.get("/logout", (req, res, next) => {
    try {
        const { signedCookies = {} } = req;
        const { refreshToken } = signedCookies;
        User.findById(req.user._id).then(
            (user) => {
                const tokenIndex = user.refreshToken.findIndex(
                    (item) => item.refreshToken === refreshToken
                );
                if (tokenIndex !== -1) {
                    user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
                }

                user.save((err, user) => {
                    if (err) {
                        res.statusCode = 500;
                        res.send(err);
                    } else {
                        res.clearCookie("refreshToken", COOKIE_OPTIONS);
                        res.send({ success: true });
                    }
                });
            },
            (err) => next(err)
        );
    } catch (err) {
        return res.status(404).json({ msg: err.name });
    }
});

export default router;