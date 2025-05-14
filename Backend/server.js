// require('dotenv').config();
import UserRouter from './Routes/UserRouter.js';
import ExpensRouter from './Routes/ExpensRouter.js';
import express from 'express';
import cors from 'cors';
import { sync_tables } from './models/index.js';

import dotenv from 'dotenv';
import User from './models/user.model.js';

// import { define_routes } from './Routes/routes.js';
dotenv.config();


export const app = express();
const port=process.env.PORT;

app.use(cors());
app.use(express.json());

sync_tables();
app.use(UserRouter);
app.use(ExpensRouter);

// Routes
// define_routes();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
