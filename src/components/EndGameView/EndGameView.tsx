import React, { useState } from "react";
import Game from "../../classes/Game/Game";
import './EndGameView.css';

const EndGameView = (closeModal: () => void, shareResult: () => void, date: string, game: Game, isResultCopied: boolean) => {
    let localStorage = window.localStorage;

    const getGamePlayerData = (): string => {
        let games = localStorage.getItem('games');
        if (games && games.length > 0) {
            let newValue = games;
            return newValue
        }
        return '';
    }

    const getVictoriesPlayerData = (): string => {
        let victories = localStorage.getItem('victories');
        if (victories && victories.length > 0) {
            let newValue = victories;
            return newValue
        }
        return '';
    }

    const getSequenciePlayerData = (): string => {
        let sequencie = localStorage.getItem('sequencie');
        if (sequencie && sequencie.length > 0) {
            let newValue = sequencie;
            return newValue
        }
        return '';
    }

    const getBarPercetInLocalStorage = (turnNumber: number, isFormated?: boolean): string => {
        let turns: any[] = [];
        let turn = localStorage.getItem('turn' + (turnNumber).toString());
        let numberOfCorrects: number = parseInt(turn ? turn : '0');
        if (isFormated) return numberOfCorrects.toString();
        if (numberOfCorrects === 0) return '0%';
        return numberOfCorrects.toString() + '%';
    }

    return (
        <div className='modal-overlay'>
            <h1>Fim de jogo</h1>
            <main className='tutorial'>
                <section className='player-statistics'>
                    <div className='games-played space'>
                        <label>Só letrando jogados:</label>
                        <p>{getGamePlayerData()}</p>
                    </div>
                    <div className='games-won space'>
                        <label>Vitórias:</label>
                        <p>{getVictoriesPlayerData()}</p>
                    </div>
                    <div className='games-sequency space'>
                        <label>Sequência:</label>
                        <p>{getSequenciePlayerData()}</p>
                    </div>
                </section>
            </main>
            <section className='bar-attempts'>
                <div style={{ display: 'flex', margin:'10px 0px'  }}>
                    <div style={{ marginRight: '0.9rem' }}>1.</div>
                    <div style={{ width: getBarPercetInLocalStorage(0)}} className='bar'>{getBarPercetInLocalStorage(0, true)}</div>
                </div>
                <div style={{ display: 'flex', margin:'10px 0px' }}>
                    <div style={{ marginRight: '1.1rem' }}>2.</div>
                    <div style={{ width: getBarPercetInLocalStorage(1)}} className='bar'>{getBarPercetInLocalStorage(1, true)}</div>
                </div>
                <div style={{ display: 'flex', margin:'10px 0px' }}>
                    <div style={{ marginRight: '0.9rem' }}>3.</div>
                    <div style={{ width: getBarPercetInLocalStorage(2)}} className='bar'>{getBarPercetInLocalStorage(2, true)}</div>
                </div>
                <div style={{ display: 'flex', margin:'10px 0px' }}>
                    <div style={{ marginRight: '0.9rem' }}>4.</div>
                    <div style={{ width: getBarPercetInLocalStorage(3)}} className='bar'>{getBarPercetInLocalStorage(3, true)}</div>
                </div>
                <div style={{ display: 'flex', margin:'10px 0px' }}>
                    <div style={{ marginRight: '0.9rem' }}>5.</div>
                    <div style={{ width: getBarPercetInLocalStorage(4)}} className='bar'>{getBarPercetInLocalStorage(4, true)}</div>
                </div>
                <div style={{ display: 'flex', margin:'10px 0px' }}>
                    <div style={{ marginRight: '0.9rem' }}>6.</div>
                    <div style={{ width: getBarPercetInLocalStorage(5)}} className='bar'>{getBarPercetInLocalStorage(5, true)}</div>
                </div>
            </section>
            <section className='secret-word-time'>
                <div>A palavra secreta era: {game.getWord()}</div>
                <br />
                <div>Tempo até a próxima palavra secreta: {date}</div>
            </section>
            <footer className='footer-modal' style={{ width: '40vw', margin: '0px 10%'}}>
                <button className='btn-close' onClick={closeModal}>Fechar</button>
                <button className='btn-share' onClick={shareResult}>{isResultCopied ? 'Copiado' : 'Copiar resultado'}</button>
            </footer>
        </div>
    );
}

export default EndGameView;