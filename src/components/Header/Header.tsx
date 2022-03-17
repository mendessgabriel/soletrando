import React from 'react';
import './Header.css';

function Header(openModalAbout: () => void) {
    return (
        <div className='header'>
            <div className='about'>
                <div className='about-btn' onClick={openModalAbout}>
                    sobre
                </div>
            </div>
            <div className='game-name'>
                SÓ LETRANDO...
            </div>
            <div className='configs'>
            {/* <div className='configs-btn'>
                    configs
                </div> */}
            </div>
        </div>
    );
}

export default Header;
