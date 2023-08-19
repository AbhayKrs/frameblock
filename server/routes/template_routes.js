import express from 'express';
const router = express.Router();
import User from '../models/user_model.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';



export default router;