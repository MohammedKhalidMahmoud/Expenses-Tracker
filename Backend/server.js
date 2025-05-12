const express = require('express');
const cors=require('cors');
const app = express();

const port=3000;
app.use(cors());
app.use(express.json());

app.post('/api/auth/login', (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;
    res.status(200).json({ message:"logged in successfully"});
});


app.post('/api/auth/signup', (req, res) => {
    // console.log(req.body);
    const { email, password,name } = req.body;
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