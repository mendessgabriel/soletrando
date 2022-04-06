import React, { useState, useEffect } from 'react';
import './App.css';

import DeleteLetterButton from './components/Buttons/DeleteLetterButton/DeleteLetterButton';
import MessageScreen from './components/MessageScreen/MessageScreen';
import KeyboardLetter from './classes/KeyboardLetter/KeyboardLetter';
import DoneButton from './components/Buttons/DoneButton/DoneButton';
import { wordlist, words } from './dictionary/dictionary';
import GameTable from './components/GameTable/GameTable';
import Keyboard from './components/Keyboard/Keyboard';
import Header from './components/Header/Header';
import LibWord from './classes/LibWord/LibWord';
import Modal from './components/Modal/Modal';
import Game from './classes/Game/Game';
import Turn from './classes/Turn/Turn';

import { Theme } from './enum/enum';

function App() {
  const [game, setGame] = useState<Game>(new Game('', [], []));
  const [libWord, setLibWord] = useState<LibWord[]>(wordlist);
  const [blockKeyboard, setBlockKeyboard] = useState<boolean>(false);
  const keyboard1: string[] = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const keyboard2: string[] = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const keyboard3: string[] = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
  const [keyboardProps, setKeyboardProps] = useState<KeyboardLetter[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [clock, setClock] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<number>(0);
  const [isMessageScreenOpen, setIsMessageScreenOpen] = useState<boolean>(false);
  const [isResultCopied, setIsResultCopied] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(0);
  const [oneMoreAttemptCalled, setOneMoreAttemptCalled] = useState<boolean>(false);

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

  const getRedLetters = (wrongAttempts: string[], formattedKey: KeyboardLetter[]) => {
    for (var i = 0; i < wrongAttempts.length; i++) {
      let keyLetter: KeyboardLetter = new KeyboardLetter(
        keyboardProps.filter(prop => prop.getValue() === wrongAttempts[i])[0].getId(),
        wrongAttempts[i], 'letter-btn red', true);
      formattedKey.push(keyLetter);
    }
  }

  const getGreenLetters = (rightAttempts: string[], formattedKey: KeyboardLetter[], attempt: string) => {
    for (var i = 0; i < attempt.length; i++) {
      if (game.getWord()[i] === attempt[i]) {
        let keyLetter: KeyboardLetter = new KeyboardLetter(
          keyboardProps.filter(prop => prop.getValue() === attempt[i])[0].getId(),
          attempt[i], 'letter-btn green', false);
        formattedKey.push(keyLetter);
      }
    }
  }

  const getYellowLetters = (rightAttempts: string[], wrongAttempts: string[], formattedKey: KeyboardLetter[], attempt: string) => {
    for (var i = 0; i < attempt.length; i++) {
      if (game.getWord().includes(attempt[i]) && game.getWord()[i] !== attempt[i]) {
        let keyLetter: KeyboardLetter = new KeyboardLetter(
          keyboardProps.filter(prop => prop.getValue() === attempt[i])[0].getId(),
          attempt[i], 'letter-btn yellow', false);
        formattedKey.push(keyLetter);
      }
    }
  }

  const getNewKeyboard = (wrongAttempts: string[], rightAttempts: string[], attempt: string) => {
    let formattedKey: KeyboardLetter[] = [];
    let newKeyboard = keyboardProps;
    getRedLetters(wrongAttempts, formattedKey);
    getGreenLetters(rightAttempts, formattedKey, attempt);
    getYellowLetters(rightAttempts, wrongAttempts, formattedKey, attempt);
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

  const gameOver = () => {
    setTimeout(
      () => {
        setIsGameOver(!isGameOver);
        setModalContent(1);
        setIsModalOpen(!isModalOpen);
      }, 1000);
  }

  const setPropsToGameOver = () => {
    setLocalStorageProps();
    let turnsUpdated: Turn[] = game.getTurns();
    turnsUpdated.filter(turn => turn.isCurrentTurn() === true)[0].setCurrentTurn(false);
    setGame(new Game(game.getWord(), turnsUpdated, game.getPastTurns()));
    gameOver();
  }

  const setNextTurn = () => {
    let turnsCopy: Turn[] = game.getTurns();
    let pastTurn: Turn = turnsCopy.filter(turn => turn.isCurrentTurn() === true)[0];
    turnsCopy[pastTurn.getId()].setCurrentTurn(false);
    turnsCopy[pastTurn.getId() + 1].setCurrentTurn(true);
    setGame(new Game(game.getWord(), turnsCopy, [...game.getPastTurns(), pastTurn]));
  }

  const updateKeyboard = () => {
    let wrongAttempts: string[] = checkWrongAttempts();
    let rightAttempts: string[] = checkRightAttempts();
    let pointsTurn: number  = 0;
    for (var i = 0; i < rightAttempts.length; i++) pointsTurn++
    pointsTurn = points + (2*pointsTurn);
    if (pointsTurn > 0) setPoints(pointsTurn);
    if (wrongAttempts.length > 0 || rightAttempts.length > 0)
      getNewKeyboard(wrongAttempts, rightAttempts, game.getTurns()[getCurrentTurn() - 1].getConcatenedAttempts());
  }

  const alertPlayerThatAttemptDoesNotExists = () => {
    setIsMessageScreenOpen(!isMessageScreenOpen);
  }

  const checkIfAttemptIsValid = (): boolean => {
    if (words.filter(word => word.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase() === game.getTurns()[getCurrentTurn()].getConcatenedAttempts()).length === 0)
      return true;

    return false;
  }

  const done = () => {
    if (checkIfAttemptIsValid()) {
      alertPlayerThatAttemptDoesNotExists();
      return;
    }

    if (game.getTurns()[getCurrentTurn()].getConcatenedAttempts() === game.getWord()) setPropsToGameOver();
    else {
      if (game.getTurns()[getCurrentTurn()].getId() === game.getWord().length && !oneMoreAttemptCalled) {
        setPropsToGameOver();
        return;
      }
      if (game.getTurns()[getCurrentTurn()].getId() === game.getWord().length + 1 && oneMoreAttemptCalled) {
        setPropsToGameOver();
        return;
      }
      setNextTurn();
      updateKeyboard();
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

  const shareResult = () => {
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
        return value === 'green' ? `🟩${index === 4 || index === 9 || index === 14 || index === 19 || index === 24 || index === 29 ? '\n' : ''}` :
          value === 'red' ? `🟥${index === 4 || index === 9 || index === 14 || index === 19 || index === 24 || index === 29 ? '\n' : ''}` :
            `🟨${index === 4 || index === 9 || index === 14 || index === 19 || index === 24 || index === 29 ? '\n' : ''}`;
      })}
    \nConsegue fazer melhor? Jogue em https://mendessgabriel.github.io/soletrando/
    `;
    let formatedString = myResult.replace(/,/g, '');
    navigator.clipboard.writeText(formatedString);
    setIsResultCopied(true)
  }

  const openModalAbout = () => {
    setModalContent(0);
    setIsModalOpen(!isModalOpen);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const setNewTheme = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let word: string;
    let gameProps: Game = new Game('', [], []);
    switch (e.target.value) {
      case Theme.default:
        word = libWord.filter(word => word.getDay() === getToday())[0].getValue();
        gameProps.setWord(word);
        break;
      case Theme.sports:
        word = libWord.filter(word => word.getDay() === getToday())[0].getSportWord();
        gameProps.setWord(word);
        break;
      case Theme.objects:
        word = libWord.filter(word => word.getDay() === getToday())[0].getObjectsWord();
        gameProps.setWord(word);
        break;
      case Theme.names:
        word = libWord.filter(word => word.getDay() === getToday())[0].getNamesWord();
        gameProps.setWord(word);
        break;
      default:
        word = libWord.filter(word => word.getDay() === getToday())[0].getValue();
        gameProps.setWord(word);
        break;
    }
    for (var i = 0; i < gameProps.getWordLength() + 1; i++) {
      let newTurn: Turn = new Turn(i, [], i === 0 ? true : false);
      gameProps.addOneTurn(newTurn);
    }
    setBlockKeyboard(false);
    if (isGameOver) setIsGameOver(false);
    setGame(gameProps);
    startKeyboard();
  }

  const addOneMoreChanceInTable = () => {
    let gameProps: Game = new Game(game.getWord(), game.getTurns(), game.getPastTurns());
    gameProps.addOneTurn(new Turn(game.getTurns().length, [], false));
    setGame(gameProps);
    setPoints(0);
    setOneMoreAttemptCalled(true);
  }

  const oneMoreChance = (): JSX.Element => {
    let element: JSX.Element = <div className='one-more-chance' onClick={addOneMoreChanceInTable}><p style={{margin: '1rem'}}>+ 1</p></div>;
    return element;
  }

  const setKeyOnTurnAttempt = (e: React.KeyboardEvent<HTMLDivElement>) => {
    
    e.stopPropagation();
    let turns: Turn[] = game.getTurns();
    let currentTurn: Turn = turns.filter(turn => turn.isCurrentTurn())[0];
    currentTurn.getAttempts()[currentTurn.getAttempts().length] = e.key.toUpperCase();
    if (currentTurn.getAttempts().length === game.getWord().length) {
      setBlockKeyboard(!blockKeyboard)
      return;
    } else {
      let gameProps: Game = new Game(game.getWord(), turns, game.getPastTurns());
      setGame(gameProps);
    }
  }

  useEffect(() => {
    let gameProps: Game = new Game(getDayWord(), [], []);
    setInterval(
      () => defineClock(), 1000)

    for (var i = 0; i < gameProps.getWordLength() + 1; i++) {
      let newTurn: Turn = new Turn(i, [], i === 0 ? true : false);
      gameProps.addOneTurn(newTurn);
    }
    setGame(gameProps);
    startKeyboard();
  }, []);

  return (
    <div tabIndex={0} onKeyDown={setKeyOnTurnAttempt}>
      {Header(openModalAbout, setNewTheme)}
      {GameTable(game, setPlayerAttempt)}
      {Keyboard(setPlayerAttempt, blockKeyboard, keyboardProps)}
      <div className='btn-actions'>
        {!isGameOver && DeleteLetterButton(deleteLastLetter)}
        {!isGameOver && DoneButton(done)}
      </div>
      {points >= 20 && oneMoreChance()}
      {isModalOpen && Modal(closeModal, shareResult, modalContent, clock, game, isResultCopied)}
      {isMessageScreenOpen && MessageScreen(alertPlayerThatAttemptDoesNotExists)}
    </div>
  );
}

export default App;
