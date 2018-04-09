# Guessing-game
* This is a create-react-app based single-page application with 2 separate web servers (in addition to the development server that create-react-app gives you.
* The application will have a 'Start' button, and two columns labeled in the UI as 'Alfred' and 'Barbara' (which are the servers).
* When the start button is pressed, the page will start a game, asking each server for a secret word, which is shown to the user.
* The servers will alternate guesses, each attempting to determine the others secret word.
* Each guess will be collected by the page from the server guessing, and the page will then send that word to the otherserver, 
which will respond with the number of matching letters (regardless of position) which is added to the column of the guessing server.
* The server that responded with the number of matches will then be asked for it's guess, and the server that had made the previous guess will then be asked to score the new guess, and so forth, alternating turns.
* When a winner is determined, each server is informed the game is over, and the winner is shown on the page. 
* The user is given the option to start a new game. Doing so will clear the previous guesses.
