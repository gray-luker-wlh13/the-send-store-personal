require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      {SERVER_PORT, CONNECTION_STRING} = process.env,
      app = express();

app.use(express.json());

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('db connected');
});

const port = SERVER_PORT || 6783;
app.listen(() => console.log(`Sending on port ${port}`));