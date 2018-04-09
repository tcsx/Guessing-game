import React from 'react';


const Winner = ({ winner }) => {
    if (winner) {
        return (
            <div className="winner">
                {winner} wins!
            </div>
        );
    }
    return null;
};

export default Winner;