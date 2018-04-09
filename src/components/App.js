import React, { Component } from 'react';
import '../App.css';
import Winner from './Winner';
import GuessColumns from './GuessColumns';
import Button from './Button';
import ErrorMessage from "./ErrorMessage";
import { fetchSecretWordAndGameId, fetchGuessResult, fetchNewGuess, deleteGame } from "../services/fetchService";
import { asyncForEach } from "../services/asyncHelper";
import domains from '../config.json';


class App extends Component {
  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
    this.guessWords = this.guessWords.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.showError = this.showError.bind(this);
    this.initializePlayers = this.initializePlayers.bind(this);
    this.clearError = this.clearError.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const initialState = {
      players: this.getPlayers(),
      buttonState: 'start',
      winner: null,
      playersInfo: {},
      errorMessage: null
    };
    const { players, playersInfo } = initialState;
    players.forEach(player => playersInfo[player] = {
      id: null,
      secret: null,
      guessList: []
    });
    return initialState;
  }

  //extract player names from config file
  getPlayers() {
    const players = [];
    for (const player in domains) {
      players.push(player);
    }
    return players;
  }

  async startGame() {
    this.setState({ buttonState: 'started' });
    await this.initializePlayers();
    while (!this.state.winner) {
      await this.guessWords();
    }
  }

  async initializePlayers() {
    const { players } = this.state;

    await asyncForEach(players, async player => {
      try {
        const { id, secret } = await fetchSecretWordAndGameId(domains[player]);
        await this.setState(prevState => {
          prevState.playersInfo[player].id = id;
          prevState.playersInfo[player].secret = secret;
        });
        return id;
      } catch (error) {
        this.showError(error);
      }
    });
  }

  async guessWords() {
    const { players } = this.state;
    await asyncForEach(players, async (player, index) => {
      if (this.state.winner) return;
      const { playersInfo } = this.state;
      const guessList = playersInfo[player].guessList;
      const newGuessRequestBody = guessList.length > 0 ? { matched: guessList[0].matched } : {};
      const gameId = playersInfo[player].id;
      const opponent = players[(index + 1) % 2];
      const opponentGameId = playersInfo[opponent].id;
      try {
        const { guess } = await fetchNewGuess(domains[player], gameId, newGuessRequestBody);
        const { matched, hasWon } = await fetchGuessResult(domains[opponent], opponentGameId, guess);
        await this.addGuess(player, guess, matched);
        if (hasWon) { await this.playerWin(player); }

      } catch (error) {
        this.showError(error);
      }
    });
  }

  async addGuess(player, guess, matched) {
    await this.setState(prevState => {
      //to show recent guess on top
      prevState.playersInfo[player].guessList.unshift({ guess, matched });
      return prevState;
    });
  }

  async playerWin(player) {
    this.setState({
      buttonState: "New Game",
      winner: player
    });
    const { players, playersInfo } = this.state;
    await asyncForEach(players, async player => {
      await deleteGame(domains[player], playersInfo[player].id);
    });
  }

  reset() {
    this.setState(this.getInitialState());
  }

  restartGame() {
    this.reset();
    this.startGame();
  }

  handleClick() {
    if (this.state.buttonState === 'start') {
      this.startGame();
    } else {
      this.restartGame();
    }
  }

  showError(errorMessage) {
    this.setState({ errorMessage });
  }

  clearError() {
    this.setState({
      errorMessage: null
    });
  }

  render() {
    const { winner, buttonState, errorMessage, players, playersInfo } = this.state;
    return (
      <div className="App">
        <h1>Guessing Game</h1>
        <Button onClick={this.handleClick} buttonState={buttonState} disabled={buttonState === "started"} />
        <ErrorMessage errorMessage={errorMessage} clearError={this.clearError} />
        <Winner winner={winner} />
        <GuessColumns players={players} playersInfo={playersInfo} />
      </div>
    );
  }
}

export default App;
