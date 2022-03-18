import React, { useCallback } from 'react';
import './TurnTable.css';

import Turn from '../../classes/Turn/Turn';

function TurnTable(turn: Turn, word: string) {
    const setSquareCollor = (positionIndexAttempt: number): string => {
        let style: string = 'attempt gray';
        let attempt: string = turn.getOneAttempt(positionIndexAttempt);
        if (!turn.getOneAttempt(positionIndexAttempt)) return style;
        if (!word.includes(attempt)) {
            style = 'attempt red';
            return style;
        }
        else if (word[positionIndexAttempt] === attempt) {
            style = 'attempt green';
            return style;
        }
        if (turn.getAttempts().filter(att => att === attempt).length > 1) {
            let indexInWord: number[] = [];
            for (var i = 0; i < word.length; i++) {
                if (word[i] === attempt) indexInWord.push(i);
            }
            for (var i = 0; i < indexInWord.length; i++) {
                if (turn.getAttempts()[indexInWord[i]] === word[indexInWord[i]])
                    style = 'attempt red';
                else style = 'attempt yellow';
                return style;
            }
        } else {
            style = 'attempt yellow';
            return style;
        }
        return style;
    }

    const render = (): JSX.Element[] => {
        let attempts: JSX.Element[] = [];
        for (var i = 0; i < word.length; i++) {
            attempts.push(
                <div key={i} className={!turn.isCurrentTurn() ? setSquareCollor(i) : 'attempt gray'}>
                    {turn.getOneAttempt(i)}
                </div>)
        }
        return attempts;
    }

    return (
        <div className='turn-table'>
            {render()}
        </div>
    );
}

export default TurnTable;
