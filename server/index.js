require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      gradient = require('gradient-string'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      session = require('express-session'),
      authCtrl = require('./controllers/authController'),
      homeCtrl = require('./controllers/homeController'),
      cartCtrl = require('./controllers/cartController'),
      app = express();

app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}));

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log(gradient.mind('db connected'));
});

//auth endpoints
app.post('/api/auth/login', authCtrl.login);
app.post('/api/auth/register', authCtrl.register);
app.post('/api/auth/logout', authCtrl.logout);

//home endpoints
app.get('/api/products', homeCtrl.getProducts);
app.post('/api/cart', homeCtrl.addToCart);

//cart endpoints
app.get('/api/cart/:id', cartCtrl.getCart);

const port = SERVER_PORT;
app.listen(port, () => console.log(gradient.cristal(`Sending on port ${port}`)));