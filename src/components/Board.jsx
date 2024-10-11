import React, { useContext } from 'react';
import { WordleContext } from '../App';
import Grid from './grid/Grid';
import Keyboard from './Keyboard/Keyboard';

export default function Board({ phrase, word_length }) {
    const { word } = useContext(WordleContext);
    return (
        <div className="flex flex-col justify-center items-center mb-4 mt-5">
            <h1 className="text-3xl md:text-4xl font-extrabold m-4 text-center">{phrase}</h1>
            <Grid word_length={word_length} />
            <Keyboard />
        </div>
    );
}
