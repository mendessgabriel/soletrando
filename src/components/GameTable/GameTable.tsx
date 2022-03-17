import React from 'react';
import './GameTable.css';

import Game from '../../classes/Game/Game';
import TurnTable from '../TurnTable/TurnTable';

function GameTable(game: Game, setPlayerAttempt: (key: string) => void) {
    return (
        <div className='game-table'>
            {game.getTurns().map((turn, index) => {
                return (
                    <div key={index} className=''>
                        {TurnTable(turn, game.getWord())}
                    </div>
                )
            })}
        </div>
    );
}

export default GameTable;
