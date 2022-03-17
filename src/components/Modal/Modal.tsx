import React from "react";
import './Modal.css';

import HowToPlay from '../HowToPlay/HowToPlay';
import EndGameView from '../EndGameView/EndGameView';
import Game from "../../classes/Game/Game";

const Modal = (closeModal: () => void, shareResult: () => void, modalContent: number, date: string, game: Game) => {
    const render = (): JSX.Element => {
        let content: JSX.Element;
        switch (modalContent) {
            case 0:
                content = HowToPlay(closeModal);
                break;
            case 1:
                content = EndGameView(closeModal, shareResult, date, game);
                break;
            default:
                content = <></>;
                break;
        }
        return content;
    }
    return (
        <div className='modal'>
            {render()}
        </div>
    );
}

export default Modal;