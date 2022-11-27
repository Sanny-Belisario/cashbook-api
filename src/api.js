const express = require('express');

const app = express();

app.use(express.urlencoded({extended:true}));

app.use(express.json());

// Rotas
const route = require('./routers/route');
app.use('/', route);
app.use('/user', route);

module.exports = app;