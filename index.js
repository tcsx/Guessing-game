const express = require('express');
const domains = require('./src/config.json');
const { URL } = require('url');

for (const player in domains) {
    const { port, hostname } = new URL(domains[player]);
    const app = express();

    require('./routes')(app);

    app.listen(port, hostname);
}


