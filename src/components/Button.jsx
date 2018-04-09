import React from 'react';

const Button = ({ onClick, buttonState, disabled }) =>
    <button className="game-controller" onClick={onClick} disabled={disabled}>{buttonState}</button>;

export default Button;
