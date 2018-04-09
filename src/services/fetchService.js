

function fetchSecretWordAndGameId(domain) {
    return fetch(`${domain}/game`, { method: 'POST' })
        .then(response => response.ok ? response.json() : Promise.reject(response.text()))
        .catch(error => {
            console.log(error);
            return Promise.reject('Failed to get secret word.');
        });
}

function fetchNewGuess(domain, gameId, newGuessRequestBody) {
    return fetch(`${domain}/game/${gameId}/guessed`, {
        method: 'PUT', body: JSON.stringify(newGuessRequestBody)
    })
        .then(response => response.ok ? response.json() : Promise.reject(response.text()))
        .catch(error => {
            console.log(error);
            return Promise.reject('Failed to get new guess.');
        });
}

function fetchGuessResult(domain, gameId, guess) {
    return fetch(`${domain}/game/${gameId}/guess/${guess}`)
        .then(response => response.ok ? response.json() : Promise.reject(response.text()))
        .catch(error => {
            console.log("result"+ error);
            return Promise.reject('Failed to get the result of guess.');
        });
}

function deleteGame(domain, gameId) {
    return fetch(`${domain}/game/${gameId}`, { method: 'DELETE' })
        .then(response => response.ok ? response.text() : Promise.reject(response.text()))
        .catch(error => {
            console.log(error);
            return Promise.reject('Failed to clear old game.');
        });
}

export { fetchSecretWordAndGameId, fetchNewGuess, fetchGuessResult, deleteGame };

