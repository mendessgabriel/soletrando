import React, { useState, useEffect } from 'react';
import './App.css';

import DeleteLetterButton from './components/Buttons/DeleteLetterButton/DeleteLetterButton';
import KeyboardLetter from './classes/KeyboardLetter/KeyboardLetter';
import DoneButton from './components/Buttons/DoneButton/DoneButton';
import GameTable from './components/GameTable/GameTable';
import PlayerData from './classes/PlayerData/PlayerData';
import Keyboard from './components/Keyboard/Keyboard';
import Header from './components/Header/Header';
import LibWord from './classes/LibWord/LibWord';
import Modal from './components/Modal/Modal';
import Game from './classes/Game/Game';
import Turn from './classes/Turn/Turn';

function App() {
  //Criar uma opção de temas pro user escolher o tema da palavra secreta, ex: futebol, filmes...
  //Pra cada tema, buscar em alguma API ou algo assim uma palavra daquele tema;
  const [game, setGame] = useState<Game>(new Game('', [], []));
  const [libWord, setLibWord] = useState<LibWord[]>([
    new LibWord('2022-03-16', 'GARFO'), 
    new LibWord('2022-03-17', 'SONHO'),
    new LibWord('2022-03-18', 'ENTRE'),
    new LibWord('2022-03-19', 'BRAVA'),
    new LibWord('2022-03-20', 'SOLDA'),
    new LibWord('2022-03-21', 'LINDO'),
    new LibWord('2022-03-22', 'BANHO'),
    new LibWord('2022-03-23', 'CINTO'),
    new LibWord('2022-03-24', 'VELAS'),
    new LibWord('2022-03-25', 'MENOS'),
    new LibWord('2022-03-26', 'CALDA'),
    new LibWord('2022-03-26', 'PORTO'),
    new LibWord('2022-03-28', 'REMAR'),
    new LibWord('2022-03-29', 'MALHO'),
    new LibWord('2022-03-30', 'PINHO'),
    new LibWord('2022-03-31', 'NAVIO'),
    new LibWord('2022-04-01', 'BOTAR'),]);
  const [blockKeyboard, setBlockKeyboard] = useState<boolean>(false);
  const keyboard1: string[] = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const keyboard2: string[] = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const keyboard3: string[] = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
  const [keyboardProps, setKeyboardProps] = useState<KeyboardLetter[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [clock, setClock] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<number>(0);
  const [playerData, setPlayerData] = useState<PlayerData>(new PlayerData('0', '0', '0'));

  const getCurrentTurn = (): number => {
    let current: Turn = game.getTurns().filter(turn => turn.isCurrentTurn() === true)[0];
    return current.getId();
  }

  const checkWrongAttempts = (): string[] => {
    let wrongAttempts: string[] = [];
    game.getTurns()[getCurrentTurn() - 1].getAttempts().forEach((attempt) => {
      if (!game.getWord().includes(attempt)) wrongAttempts.push(attempt);
    });
    return wrongAttempts;
  }

  const checkRightAttempts = (): string[] => {
    let rigthAttempts: string[] = [];
    game.getTurns()[getCurrentTurn() - 1].getAttempts().forEach((attempt) => {
      if (game.getWord().includes(attempt)) rigthAttempts.push(attempt);
    });
    return rigthAttempts;
  }

  const getNewKeyboard = (wrongAttempts: string[], rigthAttempts: string[], attempt: string) => {
    let formattedKey: KeyboardLetter[] = [];
    let newKeyboard = keyboardProps;
    for (var i = 0; i < wrongAttempts.length; i++) {
      let keyLetter: KeyboardLetter = new KeyboardLetter(
        keyboardProps.filter(prop => prop.getValue() === wrongAttempts[i])[0].getId(),
        wrongAttempts[i], 'letter-btn red', true);
      formattedKey.push(keyLetter);
    }
    for (var i = 0; i < attempt.length; i++) {
      if (wrongAttempts.filter(att => att === attempt[i]).length === 0) {
        if (game.getWord()[i] === attempt[i]) {
          let keyLetter: KeyboardLetter = new KeyboardLetter(
            keyboardProps.filter(prop => prop.getValue() === attempt[i])[0].getId(),
            attempt[i], 'letter-btn green', false);
          formattedKey.push(keyLetter);
        } else {
          let keyLetter: KeyboardLetter = new KeyboardLetter(
            keyboardProps.filter(prop => prop.getValue() === attempt[i])[0].getId(),
            attempt[i], 'letter-btn yellow', false);
          formattedKey.push(keyLetter);
        }
      }
    }
    formattedKey.forEach((key) => {
      newKeyboard[key.getId()] = formattedKey.filter(keyb => keyb.getId() === key.getId())[0];
    })
    setKeyboardProps(newKeyboard);
  }

  const setLocalStorageGame = () => {
    let localStorage = window.localStorage;
    let partidas = localStorage.getItem('games');
    if (partidas && partidas.length > 0) {
      let newValue = parseInt(partidas) + 1;
      localStorage.setItem('games', newValue.toString());
    } else {
      localStorage.setItem('games', '1');
    }
  }

  const setLocalStorageVictories = () => {
    let localStorage = window.localStorage;
    let victories = localStorage.getItem('victories');
    if (victories && victories.length > 0) {
      let newValue = parseInt(victories) + 1;
      localStorage.setItem('victories', newValue.toString());
    } else {
      localStorage.setItem('victories', '1');
    }
  }

  const setLocalStorageSequencie = () => {
    let localStorage = window.localStorage;
    let sequencie = localStorage.getItem('sequencie');
    if (sequencie && sequencie.length > 0) {
      let newValue = parseInt(sequencie) + 1;
      localStorage.setItem('sequencie', newValue.toString());
    } else {
      localStorage.setItem('sequencie', '1');
    }
  }

  const setLocalStorageRankingBars = () => {
    let localStorage = window.localStorage;
    let turn = localStorage.getItem('turn' + (getCurrentTurn()).toString());
    if (turn && turn.length > 0) {
      let newValue = parseInt(turn) + 1;
      localStorage.setItem('turn' + (getCurrentTurn()).toString(), newValue.toString());
    } else {
      localStorage.setItem('turn' + (getCurrentTurn()).toString(), '1');
    }
  }

  const setLocalStorageProps = () => {
    setLocalStorageGame();
    setLocalStorageVictories();
    setLocalStorageSequencie();
    setLocalStorageRankingBars();
  }

  const done = () => {
    if (game.getTurns()[getCurrentTurn()].getConcatenedAttempts() === game.getWord()) {
      setLocalStorageProps();
      let turnsUpdated: Turn[] = game.getTurns();
      turnsUpdated.filter(turn => turn.isCurrentTurn() === true)[0].setCurrentTurn(false);
      setGame(new Game(game.getWord(), turnsUpdated, game.getPastTurns()));
      setTimeout(
        () => {
          setIsGameOver(!isGameOver);
          setModalContent(1);
          setIsModalOpen(!isModalOpen);
        }, 1000);
    } else {
      if (game.getTurns()[getCurrentTurn()].getId() === game.getWord().length) {
        setIsGameOver(!isGameOver);
        setModalContent(1);
        setIsModalOpen(!isModalOpen);
        return;
      }
      let turnsCopy: Turn[] = game.getTurns();
      let pastTurn: Turn = turnsCopy.filter(turn => turn.isCurrentTurn() === true)[0];
      turnsCopy[pastTurn.getId()].setCurrentTurn(false);
      turnsCopy[pastTurn.getId() + 1].setCurrentTurn(true);
      let wrongAttempts: string[] = checkWrongAttempts();
      let rightAttempts: string[] = checkRightAttempts();
      if (wrongAttempts.length > 0 || rightAttempts.length > 0) getNewKeyboard(wrongAttempts, rightAttempts, game.getTurns()[getCurrentTurn() - 1].getConcatenedAttempts());
      setGame(new Game(game.getWord(), turnsCopy, [...game.getPastTurns(), pastTurn]));
      setBlockKeyboard(!blockKeyboard);
    }
  }

  const deleteLastLetter = () => {
    if (blockKeyboard === true) setBlockKeyboard(false);
    let turnsCopy: Turn[] = game.getTurns();
    turnsCopy[getCurrentTurn()].getAttempts().pop();
    setGame(new Game(game.getWord(), turnsCopy, game.getPastTurns()));
  }

  const setPlayerAttempt = (key: string) => {
    for (var i = 0; i < game.getTurns().length; i++) {
      if (game.getTurns()[i].getAttempts().length !== game.getWordLength()) {
        if (game.getTurns()[i].getAttempts().length === game.getWordLength() - 1) setBlockKeyboard(!blockKeyboard)
        let gameCopy: Game = game;
        gameCopy.getTurns()[i].setAttempts([...gameCopy.getTurns()[i].getAttempts(), key]);
        setGame(new Game(game.getWord(), game.getTurns(), game.getPastTurns()));
        break;
      }
    }
  }

  const startKeyboard = () => {
    let keyboard = keyboard1.concat(keyboard2).concat(keyboard3);
    let keyboardProps: KeyboardLetter[] = [];
    for (var i = 0; i < keyboard.length; i++) {
      let newLetter: KeyboardLetter = new KeyboardLetter(i, keyboard[i], 'letter-btn gray', false);
      keyboardProps.push(newLetter);
    }
    setKeyboardProps(keyboardProps);
  }

  const getToday = (): string => {
    const seconds = 60 * 1000;
    const todayDate = new Date();
    const correctedDate = new Date(
      todayDate.valueOf() - (todayDate.getTimezoneOffset() * seconds)
    );

    return correctedDate.toISOString().split('T')[0];
  }

  const getDayWord = () => {
    let wordOfTheDay: LibWord = libWord.filter(word => word.day === getToday())[0];
    return wordOfTheDay.getValue();
  }

  const defineClock = () => {
    const dayHours: number = 24;
    const minutesInHours: number = 60;
    const secondsInHours: number = 60;

    let hour: number = new Date().getHours();
    let minutes: number = new Date().getMinutes();
    let seconds: number = new Date().getSeconds();

    let leftHour: number = 0;
    let leftMinutes: number = 0;
    let leftSeconds: number = 0;

    for (var i = hour; i < dayHours; i++) leftHour++;
    for (var i = minutes; i < minutesInHours; i++) leftMinutes++;
    for (var i = seconds; i < secondsInHours; i++) leftSeconds++;
    let leftHourstr = leftHour.toString().length === 1 ? '0' + (leftHour - 1).toString() : (leftHour - 1).toString();
    let leftMinutesstr = leftMinutes.toString().length === 1 ? '0' + (leftMinutes - 1).toString() : (leftMinutes - 1).toString();
    let leftSecondsstr = leftSeconds.toString().length === 1 ? '0' + leftSeconds.toString() : leftSeconds.toString();

    setClock(leftHourstr.toString() + ':' + leftMinutesstr.toString() + ':' + leftSecondsstr);
  }

  const renderSquares = (squares: string[]) => {
    let myResult: string =
      `Esse foi o resultado do meu Só Letrando... 
      ${squares.map((value, index) => {
        return value === 'green' ? `🟩${index === 4 || index === 9 || index === 14 || index === 19 ? '\n' : ''}` :
          value === 'red' ? `🟥${index === 4 || index === 9 || index === 14 || index === 19 ? '\n' : ''}` :
            `🟨${index === 4 || index === 9 || index === 14 || index === 19 ? '\n' : ''}`;
      })}

    Consegue fazer melhor? Jogue em ...
    `;
  }

  const shareResult = async () => {
    let squares = []
    for (var i = 0; i < game.getTurns().length; i++) {
      for (var l = 0; l < game.getTurns()[i].getAttempts().length; l++) {
        if (!game.getWord().includes(game.getTurns()[i].getAttempts()[l])) squares.push('red');
        else if (game.getWord()[l] === game.getTurns()[i].getAttempts()[l]) squares.push('green');
        else squares.push('yellow');
      }
    }
    let myResult: string =
      `Esse foi o resultado do meu Só Letrando... 
      \n${squares.map((value, index) => {
        return value === 'green' ? `🟩${index === 4 || index === 9 || index === 14 || index === 19 ? '\n' : ''}` :
          value === 'red' ? `🟥${index === 4 || index === 9 || index === 14 || index === 19 ? '\n' : ''}` :
            `🟨${index === 4 || index === 9 || index === 14 || index === 19 ? '\n' : ''}`;
      })}
    \nConsegue fazer melhor? Jogue em ...
    `;
    let formatedString = myResult.replace(/,/g, '');
    await navigator.clipboard.writeText(formatedString);
  }

  const openModalAbout = () => {
    setModalContent(0);
    setIsModalOpen(!isModalOpen);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  useEffect(() => {
    let gameProps: Game = new Game(getDayWord(), [], []);
    setInterval(
      () => defineClock(), 1000)

    for (var i = 0; i < gameProps.getWordLength(); i++) {
      let newTurn: Turn = new Turn(i, [], i === 0 ? true : false);
      gameProps.addOneTurn(newTurn);
    }
    setGame(gameProps);
    startKeyboard();
  }, []);

  return (
    <>
      {Header(openModalAbout)}
      {GameTable(game, setPlayerAttempt)}
      {Keyboard(setPlayerAttempt, blockKeyboard, keyboardProps)}
      <div className='btn-actions'>
        {!isGameOver && DeleteLetterButton(deleteLastLetter)}
        {!isGameOver && DoneButton(done)}
      </div>
      {isModalOpen && Modal(closeModal, shareResult, modalContent, clock, game)}
    </>
  );
}

export default App;
