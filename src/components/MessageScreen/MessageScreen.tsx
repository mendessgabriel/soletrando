import React from 'react';
import './MessageScreen.css';

function MessageScreen(closeModal: () => void) {
    return (
        <div className='message-screen'>
            <p style={{width: '95%'}}>A palavra deve existir. Tente novamente.</p>
            <div onClick={closeModal} className='btn-close-message'>X</div>
        </div>
    );
}

export default MessageScreen;
