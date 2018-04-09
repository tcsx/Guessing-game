import React from 'react';


const GuessList = ({ guessList = [] }) => (
    <div className="guess-list">
        {
            guessList.map(({ guess, matched }, index) => (
                <li key={index}>
                    <div>{ guess }</div>
                    <div>{ matched }</div>
                </li>
            ))
        }
    </div>
);


export default GuessList;