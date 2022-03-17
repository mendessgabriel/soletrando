import React, { useCallback } from 'react';
import './TurnTable.css';

import Turn from '../../classes/Turn/Turn';

function TurnTable(turn: Turn, word: string) {
    const checkIfPlayerSelectRigthLetter = (index: number): string => {
        let style: string = 'attempt gray';
        let attempt: string = turn.getOneAttempt(index);
        if (word.includes(attempt)) {
            if (word[index] === attempt) style = 'attempt green';
            else style = 'attempt yellow';
        } else {
            if (turn.getAttempts().length >= 5) style = 'attempt red';
        }
        return style;
    }

    const render = (): JSX.Element[] => {
        let attempts: JSX.Element[] = [];
        for (var i = 0; i < word.length; i++) {
            attempts.push(
                <div key={i} className={!turn.isCurrentTurn() ? checkIfPlayerSelectRigthLetter(i) : 'attempt gray'}>
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
