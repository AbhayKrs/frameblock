import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './app/middleware/errorMiddleware.js';
import path from 'path';

import connectDB from './app/config/db_config.js';
import './app/strategies/JwtStrategy.js';
import './app/strategies/GoogleStrategy.js';

//Routes
import users from './app/routes/user_routes.js';
import templates from './app/routes/template_routes.js';
import drafts from './app/routes/draft_routes.js';
import admin from './app/routes/admin_routes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());

app.use(express.json({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/web/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'web', 'build', 'index.html'))
    })
} else {
    app.get(`/api/${process.env.API_VERSION}`, (req, res) => {
        res.send("DevBlock API is active...");
    });
}

//Unrestricted Routes
app.use(`/api/${process.env.API_VERSION}/users`, users);
app.use(`/api/${process.env.API_VERSION}/templates`, templates);
app.use(`/api/${process.env.API_VERSION}/drafts`, drafts);

//Restricted Routes --- ADMIN
app.use(`/admin/${process.env.API_VERSION}`, admin);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server running"));