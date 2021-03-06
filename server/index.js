require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      aws = require('aws-sdk'),
      gradient = require('gradient-string'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      session = require('express-session'),
      authCtrl = require('./controllers/authController'),
      homeCtrl = require('./controllers/homeController'),
      cartCtrl = require('./controllers/cartController'),
      awsCtrl = require('./controllers/awsController'),
      profileCtrl = require('./controllers/profileController'),
      path = require('path'),
      app = express();

app.use(express.json());
app.use( express.static( `${__dirname}/../build` ) );

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
app.get('/api/consumer', authCtrl.checkSession);
app.post('/api/auth/register', authCtrl.register);
app.post('/api/auth/logout', authCtrl.logout);

//home endpoints
app.get('/api/products', homeCtrl.getProducts);
app.post('/api/cart', homeCtrl.addToCart);
app.get('/api/otherprofile/:id', homeCtrl.getProfile);

//cart endpoints
app.get('/api/cart/:id', cartCtrl.getCart);
app.delete('/api/cart/:id', cartCtrl.removeFromCart);
app.post('/api/cart/checkout/:consumer_id', cartCtrl.checkOut);

//profile endpoints
app.get('/api/products/:id', profileCtrl.getMyProducts);
app.get('/api/products/:id', profileCtrl.getTheirProducts);
app.delete('/api/products/:id', profileCtrl.deleteProduct);
app.post('/api/products', profileCtrl.addProduct);
app.put('/api/products/:id', profileCtrl.editProduct);
app.put('/api/profile/:id', profileCtrl.editProfile);


//aws endpoints
app.get('/api/signs3', awsCtrl.getFile);


const port = SERVER_PORT;
app.listen(port, () => console.log(gradient.cristal(`Sending on port ${port}`)));