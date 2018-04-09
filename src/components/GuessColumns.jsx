import React from 'react';
import GuessList from './GuessList';

const GuessColumns = ({ players, playersInfo }) => {

    function renderSecretWord(secret) {
        if (secret)
            return (<p>Secret Word: { secret }</p>);
    }

    function renderGuessColumns() {
        return players.map(player => (
            <div className="guess-column" key={ player }>
                <p className="player">{ player }</p>
                { renderSecretWord(playersInfo[player].secret) }
                <div className="instruction">
                    <div><b>Previous Guesses:</b></div>
                    <div><b>Common Letters:</b></div>
                </div>
                <GuessList guessList={ playersInfo[player].guessList } />
            </div>
        ));
    }

    return (
        <div>
            {renderGuessColumns()}
        </div>
    );
};

export default GuessColumns;