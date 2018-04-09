const express = require('express');
const domains = require('./src/players/players');
const { URL } = require('url');
const path = require('path');

for (const player in domains) {
    const { port, hostname } = new URL(domains[player]);
    const app = express();

    require('./routes')(app);

    app.listen(port, hostname);
}


const app = express();
app.use(express.static('build'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 5000);