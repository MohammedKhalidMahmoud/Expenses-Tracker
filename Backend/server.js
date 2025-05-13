// require('dotenv').config();
import { User } from './models/user.model.js';
import express from 'express';
// Sequelize

import cors from 'cors';
import { sequelize } from './models/index.js';
import { Expense } from './models/expens.model.js';
import { Sequelize } from 'sequelize';
const app = express();

const port=3000;
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;
console.log(JWT_SECRET);

// (async () => {
//   try {
//     await sequelize.sync({ alter: true, force:true }); // `alter: true` updates tables without dropping
//     console.log('✅ Database synced successfully');
//   } catch (error) {
//     console.error('❌ Database sync failed:', error.message);
//   }
// })();
await User.sync({ force: false, alter:true });
await Expense.sync({ force: false, alter:true });

app.post('/api/auth/login', (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    res.status(200).json({ message:"logged in successfully"});
});


app.post('/api/auth/signup', (req, res) => {
    // console.log(req.body);
    const { name, email, password } = req.body;
    console.log(name, email, password);
    // User.create({
    //     name: name,
    //     email: email,
    //     password: password
    // })
    // .then(user => {
    //     console.log("User created successfully:", user);
    // })

    res.status(200).json({ message:"signed up successfully"});
    
});

app.route('/api/expens')
  .get((req, res) => {
    res.status(200).json({ message: "GET all expenses" });
  })
  .post((req, res) => {
    const { amount, category, date, description } = req.body;
    console.log(amount, category, date, description);
    res.status(201).json({ message: "POST new expense" });
  })
  .put((req, res) => {
    res.status(200).json({ message: "PUT update all expenses" });
  })
  .delete((req, res) => {
    res.status(200).json({ message: "DELETE all expenses (dangerous!)" });
  });


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});