import Board  from "./components/Board"
import { createContext, useState, useEffect } from 'react';
import { dictionary } from './components/variables';
import _ from 'lodash'

export const WordleContext = createContext()

function App() {

  const [phrase, setPhrase] = useState('DEFAULT PHRASE');
  const [word, setWord] = useState('DEFAULT WORD');

  useEffect(() => {
      const randomIndex = Math.floor(Math.random() * dictionary.length);
      const selectedPhrase = _.get(dictionary, `${randomIndex}.phrase`, 'Default Phrase').toUpperCase();
      const selectedWord = _.get(dictionary, `${randomIndex}.word`, 'Default Word').toUpperCase();

      setPhrase(selectedPhrase);
      setWord(selectedWord);
  }, []); // The empty dependency array ensures this runs only once

  const [completedRows, setCompletedRows] = useState([]);
  const [guessWord, setGuessWord] = useState("");
  const [currentRow, setCurrentRow] = useState(0);
  const [keyStatuses, setKeyStatuses] = useState({});
  const [gameOver, setGameOver] = useState(false);

  const word_length = word.length;

  console.log(word);

  function guessTheWord(char) {
      if (guessWord.length === word_length || gameOver) return;  // Prevent further input if game is over
      setGuessWord(guessWord.concat(char));
  }

  function pressEnter() {
    if (currentRow > word_length || gameOver) return;  // Stop if game is over
    if (guessWord.length < word_length) return;  // Ensure full word is guessed

    const newKeyStatuses = { ...keyStatuses };

    // First, check for letters that are in the correct position (lightgreen)
    for (let i = 0; i < guessWord.length; i++) {
        const letter = guessWord[i];
        if (word[i] === letter) {
            newKeyStatuses[letter] = 'lightgreen';  // Correct position
        }
    }

    // Then, check for letters that are present but in the wrong position (gold)
    for (let i = 0; i < guessWord.length; i++) {
        const letter = guessWord[i];
        if (word.includes(letter) && newKeyStatuses[letter] !== 'lightgreen') {
            newKeyStatuses[letter] = 'gold';  // Present but incorrect position
        }
    }

    // Lastly, mark letters as grey if they are neither lightgreen nor gold
    for (let i = 0; i < guessWord.length; i++) {
        const letter = guessWord[i];
        if (!newKeyStatuses[letter]) {
            newKeyStatuses[letter] = 'grey';
        }
    }

    setKeyStatuses(newKeyStatuses);
    setCompletedRows([...completedRows, currentRow]);

    // Check if the player has won
    if (guessWord === word) {
        alert('Congratulations, you got it!');
        setGameOver(true);  // Set the game as over to stop further input
    } else {
        // Proceed to the next row and reset guess word for new row
        setCurrentRow(currentRow + 1);
        setGuessWord('');

        // Check if the player has exhausted all attempts
        if (currentRow + 1 > word_length) {
            alert('You have exhausted all your trials. The word was: ' + word);
            setGameOver(true);  // Set the game as over
        }
    }
}


  function backspace() {
      if (gameOver) return;  // Prevent input after game is over
      setGuessWord(guessWord.slice(0, guessWord.length - 1));
  }

  return (
      <WordleContext.Provider value={{
          guessTheWord,
          pressEnter,
          completedRows,
          currentRow,
          word,
          guessWord,
          backspace,
          keyStatuses
      }}>
          <Board phrase={phrase} word_length={word_length}/>
      </WordleContext.Provider>
  );
}

export default App;