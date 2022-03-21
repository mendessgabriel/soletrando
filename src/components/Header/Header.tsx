import React from 'react';
import './Header.css';

import { Theme } from '../../enum/enum';

function Header(openModalAbout: () => void, setNewTheme: (e: React.ChangeEvent<HTMLSelectElement>) => void) {
    const checkTheme = (e: React.ChangeEvent<HTMLSelectElement>) => {

    }

    return (
        <div className='header'>
            <div className='about'>
                <div className='about-btn' onClick={openModalAbout}>
                    sobre
                </div>
            </div>
            <div className='game-name'>
                SÓ LETRANDO
            </div>
            <div className='theme'>
                <label htmlFor='theme-btn' className='label-theme'>tema</label>
                <select onChange={setNewTheme} name='theme-btn' id='theme-btn' className='theme-btn'>
                    <option style={{background: 'black'}} value={Theme.default}>{Theme.default}</option>
                    <option value={Theme.sports}>{Theme.sports}</option>
                    <option style={{background: 'black'}} value={Theme.objects}>{Theme.objects}</option>
                    <option value={Theme.names}>{Theme.names}</option>
                </select>
            </div>
        </div>
    );
}

export default Header;
