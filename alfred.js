const express = require('express');
const { alfred } = require('./src/config.json');
const { URL } = require('url');

const {port, hostname} = new URL(alfred);
const app = express();

require('./routes')(app);

app.listen(port, hostname, () => {
    console.log(`Server listening at ${alfred}`);
});