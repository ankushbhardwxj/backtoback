const express = require('express');
const db = require('./models');
const routes = require('./routes');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method == 'OPTIONS') {
    res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, PATCH, DELETE, GET',
    );
    return res.status(200).json({});
  }
  next();
});

app.use('/user', routes.user);
app.listen(port, () => console.log(`Server listening at ${port}`));

