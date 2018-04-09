const wordList = require('./wordList');
const gameInfoMap = new Map();

function pickRandomWord(list = wordList) {
    return list[Math.floor(Math.random() * list.length)];
}

function generateId() {
    return Math.floor(Math.random() * 10000).toString();
}

function selectWordAndGameId() {
    const secretWord = pickRandomWord();
    let id = generateId();
    while (gameInfoMap.has(id)) {
        id = generateId();
    }
    gameInfoMap.set(id, {
        secretWord,
        guessList: [],
        selectionSet: new Set(wordList),
        startTime: null,
        lastActTime: null
    });
    return id;
}

function updateStartTime(gameId){
    gameInfoMap.get(gameId).startTime = new Date();
}

function updateLastActTime(gameId) {
    gameInfoMap.get(gameId).lastActTime = new Date();
}

function getWordByGameId(gameId) {
    return gameInfoMap.get(gameId).secretWord;
}

function getGuessListByGameId(gameId) {
    return gameInfoMap.get(gameId).guessList;
}

function getSelectionSetByGameId(gameId) {
    return gameInfoMap.get(gameId).selectionSet;
}

function countCommonLetters(baseWord, guessWord) {
    let count = 0;
    const map = {};
    for (const letter of baseWord) {
        if (!map[letter]) map[letter] = 0;
        map[letter]++;
    }
    for (const letter of guessWord) {
        if (map[letter]) {
            count++;
            map[letter]--;
        }
    }
    return count;
}

function pickGuess(gameId, commonLetters) {
    const guessList = getGuessListByGameId(gameId);
    const selectionSet = getSelectionSetByGameId(gameId);
    if (guessList.length > 0) {
        const lastGuess = guessList[guessList.length - 1];
        selectionSet.delete(lastGuess);
        selectionSet.forEach(word => {
            if (countCommonLetters(lastGuess, word) !== commonLetters) {
                selectionSet.delete(word);
            }
        });
    }
    const guess = pickRandomWord([...selectionSet]);
    guessList.push(guess);
    return guess;
}

function commonLettersWithTarget(guess, gameId) {
    return countCommonLetters(getWordByGameId(gameId), guess);
}

function hasWon(guess, gameId) {
    return guess === getWordByGameId(gameId);
}

function deleteGameById(gameId) {
    gameInfoMap.delete(gameId);
}

module.exports = { pickRandomWord, selectWordAndGameId, getWordByGameId, commonLettersWithTarget, hasWon, pickGuess, deleteGameById, updateStartTime, updateLastActTime };
