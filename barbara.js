const express = require('express');
const { barbara } = require('./src/config.json');
const { URL } = require('url');

const {port, hostname} = new URL(barbara);
const app = express();

require('./routes')(app);

app.listen(port, hostname, () => {
    console.log(`Server listening at ${barbara}`);
});