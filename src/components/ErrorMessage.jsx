import React from 'react';

const ErrorMessage = ({ errorMessage, clearError }) => {
    if (errorMessage) {
        return (
            <div>
                <p>{errorMessage}</p>
                <button onClick={clearError}>Got it</button>
            </div>
        );
    }
    return null;
};

export default ErrorMessage;