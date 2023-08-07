import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import path from 'path';

import connectDB from './dbconfig.js';

//Routes
import users from './routes/user_route.js';
import templates from './routes/user_route.js';
import drafts from './routes/user_route.js';

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
    app.use(express.static(path.join(__dirname, '/client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
} else {
    app.get(`/api/${process.env.BUILDBLOCK_VERSION}`, (req, res) => {
        res.send("BuildBlock API is active...");
    });
}

app.use(`/api/${process.env.BUILDBLOCK_VERSION}/users`, users);
app.use(`/api/${process.env.BUILDBLOCK_VERSION}/templates`, templates);
app.use(`/api/${process.env.BUILDBLOCK_VERSION}/drafts`, drafts);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Server running"));