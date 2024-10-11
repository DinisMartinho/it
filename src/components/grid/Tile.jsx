import React, { useContext, useState } from 'react';
import { WordleContext } from '../../App';

export default function Tile({ id, rowId }) {
    const [letter, setLetter] = useState('');
    const [completed, setCompleted] = useState(true);
    const { guessWord, word, currentRow, completedRows } = React.useContext(WordleContext);
    const [colors, setColor] = useState({ back: "white", font: "black" });

    const style = {
        backgroundColor: colors.back,
        color: colors.font,
    };

    React.useEffect(() => {
        if (currentRow === rowId) {
            setLetter(guessWord[id]);
        }
        if (completedRows.includes(rowId) && completed) {
            changeColors();
            setCompleted(false);
        }
    }, [guessWord, completedRows]);

    function changeColors() {
        const arrayWord = word.split('');
        if (arrayWord.includes(letter)) {
            if (arrayWord[id] === letter) {
                return setColor({ back: 'lightgreen', font: 'white' });
            }
            return setColor({ back: 'gold', font: 'white' });
        }
        return setColor({ back: "grey", font: "white" });
    }

    return (
        <div style={style} className="flex justify-center items-center w-10 h-10 md:w-14 md:h-14 border-black border-2 m-1">
            <p className="text-lg md:text-2xl font-bold">{letter}</p>
        </div>
    );
}
