import express from "express";
import cors from 'cors';
import { __mainDirname } from './utils/utils.js';
import initializePassport from "./config/passport.js";
import passport from "passport";
import { addLogger } from './utils/logger.js';
import cookieParser from 'cookie-parser';
import config from "./config/config.js";
import path from 'path';

import UsersRouter from "./routes/users.router.js";
import SessionsRouter from "./routes/sessions.router.js";
import ContractsRouter from "./routes/contracts.router.js";

const app = express();

const usersRouter = new UsersRouter();
const sessionsRouter = new SessionsRouter();
const contractsRouter = new ContractsRouter();

app.use(addLogger);
app.use(express.json({ type: 'application/json' }));
app.use(express.urlencoded({ extended: true }));
//app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173', // o donde esté corriendo tu frontend
    credentials: true
}));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

initializePassport();
app.use(passport.initialize());

app.use('/api/users', usersRouter.getRouter());
app.use('/api/sessions', sessionsRouter.getRouter());
app.use('/api/contracts', contractsRouter.getRouter());

app.listen(config.port, () => console.log(`Server running on port ${config.port}`))