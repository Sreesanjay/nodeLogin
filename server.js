const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('express-handlebars');
const session = require('express-session')
const nocache = require('nocache')
require('dotenv').config();
const PORT=process.env.PORT||30001


// app.use(nocache())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'session key',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge:1000000}
  }))

  app.use(express.static(path.join(__dirname, 'public')));
// view engine setup 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({ 
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'layout',
    }));


app.use('/', require('./routers'));
app.use((req, res) => {
  res.status(404).render('body/404')
})
app.listen(3000,()=>console.log("create server on port",PORT))