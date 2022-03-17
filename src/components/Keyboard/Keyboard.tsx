import React from 'react';
import './Keyboard.css';

import KeyboardLetter from '../../classes/KeyboardLetter/KeyboardLetter';

function Keyboard(setPlayerAttempt: (key: string,) => void, blockKeyboard: boolean, props: KeyboardLetter[]) {
    const render = (): JSX.Element[] => {
        let keyboard: JSX.Element[] = [];
        if (props.length > 0) {
            props.map((prop, index) => {
                return (
                    keyboard.push(
                        <>
                        <button disabled={blockKeyboard} className={prop.getCollor()} key={index} onClick={() => setPlayerAttempt(prop.getValue())}>
                            {prop.getValue()}
                        </button>
                        {prop.getValue() === 'L' && <br />}
                        </>
                    )
                )
            })
        }
        return keyboard;
    }

    return (
        <div className='keyboard'>
            {render()}
        </div>
    );
}

export default Keyboard;
