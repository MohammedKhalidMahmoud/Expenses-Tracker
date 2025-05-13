require('dotenv').config();

const express = require('express');
const cors=require('cors');
const app = express();

const port=3000;
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;
console.log(JWT_SECRET);

app.post('/api/auth/login', (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    res.status(200).json({ message:"logged in successfully"});
});


app.post('/api/auth/signup', (req, res) => {
    // console.log(req.body);
    const { name, email, password } = req.body;
    console.log(name, email, password);
    res.status(200).json({ message:"signed up successfully"});
    
});

app.route('/api/expens')
  .get((req, res) => {
    res.status(200).json({ message: "GET all expenses" });
  })
  .post((req, res) => {
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