//Routes handlers that can be used by both servers

const  { selectWordAndGameId, getWordByGameId, commonLettersWithTarget, hasWon, pickGuess, deleteGameById, updateStartTime, updateLastActTime } = require('./gameService');
const bodyParser = require('body-parser');
const {enableCORS} = require('./middlewares');

module.exports = app => {
    app.use(bodyParser.json({ type: '*/*' }));
    app.use(enableCORS);

    app.post('/game', (req, res) => {
        const gameId = selectWordAndGameId();
        updateStartTime(gameId);
        res.send({ id: gameId, secret: getWordByGameId(gameId) });
    });
    
    app.put('/game/:gameId/guessed', (req, res) => {
        const {gameId} = req.params;
        updateLastActTime(gameId);
        res.send({ guess: pickGuess(gameId, req.body.matched) });
    });
    
    app.get('/game/:gameId/guess/:guess', (req, res) => {
        const {gameId, guess} = req.params;
        updateLastActTime(gameId);
        res.send({matched: commonLettersWithTarget(guess, gameId), hasWon: hasWon(guess, gameId)});
    });
    
    app.delete('/game/:gameId', (req, res) => {
        const {gameId} = req.params;
        updateLastActTime(gameId);
        deleteGameById(gameId);
        res.status(204).send();
    });
};
