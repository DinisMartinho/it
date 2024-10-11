import React from 'react';
import Tile from './Tile';

export default function Row(props) {
    // Create an array based on the word_length prop
    const nums = Array.from({ length: props.word_length }, (_, index) => index + 1);

    return (
        <div className="flex flex-row justify-center items-center">
            {
                nums.map((item, index) => (
                    <Tile rowId={props.id} key={index} id={index} />
                ))
            }
        </div>
    );
}
