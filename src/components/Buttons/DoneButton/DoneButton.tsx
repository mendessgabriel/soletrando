import React from 'react';
import './DoneButton.css';

function DoneButton(done: () => void) {
    return (
        <button onClick={done} className='btn-done'>
            Pronto!
        </button>
    );
}

export default DoneButton;
