const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const { port, host } = require('./config');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

// eslint-disable-next-line no-console
app.listen(port, host, () => console.log(`Example app listening on port ${host}:${port}!`));
