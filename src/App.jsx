import Board from "./components/Board";
import { createContext, useState, useEffect } from "react";
import { dictionary } from "./components/variables";
import _ from "lodash";
import Modal from "react-modal";
import { ReloadOutlined } from "@ant-design/icons";

export const WordleContext = createContext();

function App() {
  const [phrase, setPhrase] = useState("DEFAULT PHRASE");
  const [word, setWord] = useState("DEFAULT WORD");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * dictionary.length);
    const selectedPhrase = _.get(dictionary, `${randomIndex}.phrase`, "Default Phrase").toUpperCase();
    const selectedWord = _.get(dictionary, `${randomIndex}.word`, "Default Word").toUpperCase();

    setPhrase(selectedPhrase);
    setWord(selectedWord);
  }, []);

  const [completedRows, setCompletedRows] = useState([]);
  const [guessWord, setGuessWord] = useState("");
  const [currentRow, setCurrentRow] = useState(0);
  const [keyStatuses, setKeyStatuses] = useState({});
  const [gameOver, setGameOver] = useState(false);

  const word_length = word.length;

  console.log(word);

  function guessTheWord(char) {
    if (guessWord.length === word_length || gameOver) return;
    setGuessWord(guessWord.concat(char));
  }

  function pressEnter() {
    if (currentRow > 5 || gameOver) return;
    if (guessWord.length < word_length) return;

    const newKeyStatuses = { ...keyStatuses };

    for (let i = 0; i < guessWord.length; i++) {
      const letter = guessWord[i];
      if (word[i] === letter) {
        newKeyStatuses[letter] = "lightgreen";
      }
    }

    for (let i = 0; i < guessWord.length; i++) {
      const letter = guessWord[i];
      if (word.includes(letter) && newKeyStatuses[letter] !== "lightgreen") {
        newKeyStatuses[letter] = "gold";
      }
    }

    for (let i = 0; i < guessWord.length; i++) {
      const letter = guessWord[i];
      if (!newKeyStatuses[letter]) {
        newKeyStatuses[letter] = "grey";
      }
    }

    setKeyStatuses(newKeyStatuses);
    setCompletedRows([...completedRows, currentRow]);

    if (guessWord === word) {
      setModalIsOpen(true);
      setGameOver(true);
    } else {
      setCurrentRow(currentRow + 1);
      setGuessWord("");

      if (currentRow + 1 > 5) {
        setModalIsOpen(true);
        setGameOver(true);
      }
    }
  }

  function backspace() {
    if (gameOver) return;
    setGuessWord(guessWord.slice(0, guessWord.length - 1));
  }

  function reloadPage() {
    window.location.reload();
  }

  return (
    <WordleContext.Provider
      value={{
        guessTheWord,
        pressEnter,
        completedRows,
        currentRow,
        word,
        guessWord,
        backspace,
        keyStatuses,
      }}
    >
      <Board phrase={phrase} word_length={word_length} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Game Over"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="justify-center content-center flex items-center pt-7">
        <button
          onClick={reloadPage}
          className="justify-center content-center bg-black text-white px-4 py-2 rounded-md flex items-center gap-2 font-bold"
        >
        
          <ReloadOutlined />
          TRY AGAIN
        </button>
        </div>
      </Modal>
    </WordleContext.Provider>
  );
}

export default App;
