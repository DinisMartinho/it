import React from 'react';
import Row from './Row';

export default function Grid({ word_length }) {
    // Fixed 6 attempts
    const rows = Array.from({ length: 6 }, (_, index) => index + 1);

    return (
        <div className="m-4">
            {
                rows.map((row, index) => (
                    <Row key={index} id={index} word_length={word_length} /> // Pass word_length to Row
                ))
            }
        </div>
    );
}
