const express = require('express');

const router = require('./http');
const { headers } = require('./http/helpers');

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(headers);
app.use(express.json());
app.use(router);

module.exports = app;
