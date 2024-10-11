import React, { useContext } from 'react';
import { WordleContext } from '../../App';

export default function Key(props) {
    const { guessTheWord, backspace, pressEnter, keyStatuses } = useContext(WordleContext);

    function handleClickForBig() {
        if (props.letter === "Enter") {
            pressEnter();
        } else {
            backspace();
        }
    }

    const backgroundColor = keyStatuses[props.letter] || '#d3d6da';

    return (
        <button
            onClick={props.big ? handleClickForBig : () => guessTheWord(props.letter)}
            className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 m-1 rounded-md flex items-center justify-center font-bold ${backgroundColor}`}
        >
            {props.letter}
        </button>
    );
}
