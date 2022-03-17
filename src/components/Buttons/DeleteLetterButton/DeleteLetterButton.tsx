import React from 'react';
import './DeleteLetterButton.css';

function DeleteLetterButton(deleteLastLetter: () => void) {
    return (
        <button className='btn-delete' onClick={deleteLastLetter}>
            Apagar
        </button>
    );
}

export default DeleteLetterButton;
