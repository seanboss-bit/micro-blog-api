const express = require("express");
const cors = require('cors')
const app = express();
const bodyParser = require("body-parser");
const connectDB = require("./src/database");
const User = require("./src/model/User");
const { message } = require("statuses");
const userRouter = require('./src/routes/user')
const postRouter = require('./src/routes/post')

const port = 5000;
connectDB();

// Adding MiddleWare
app.use(bodyParser.json());
app.use(cors())

// Routes
app.use(userRouter);
app.use(postRouter);

// Basic Routes
app.get('/', (req, res) => {
  res.send('Welcome To Micro Blog API')
});



app.listen(port, () => {
  console.log(`Example App listening @ http://localhost:${port}`);
});
