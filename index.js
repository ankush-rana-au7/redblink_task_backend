const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors')
const userController = require('./controller/user')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/*Mongodb Connection*/
mongoose.connect("mongodb+srv://ankushrana830:test123@cluster0.pbxehje.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("DB Connected successfully");
  });

app.post('/signup', userController.signup)
app.post('/login', userController.login)

app.listen(5000, () => {
    console.log(`Server Running At Port 5000`)
})