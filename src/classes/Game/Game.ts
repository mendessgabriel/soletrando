import Turn from "../Turn/Turn";

export default class Game {
    private word: string;
    private turns: Turn[];
    private pastTurns: Turn[];

    constructor(Word: string, Turns: Turn[], PastTurns: Turn[]) {
        this.word = Word;
        this.turns = Turns;
        this.pastTurns = PastTurns;
    }

    public getWord = () => {
        return this.word;
    }

    public setWord = (newWord: string) => {
        this.word = newWord;
    }

    public getWordLength = (): number => {
        return this.word.length;
    }

    public getTurns = () => {
        return this.turns;
    }

    public setTurns = (newTurns: Turn[]) => {
        this.turns = newTurns;
    }

    public removeTurn = (turnToBeRemoved: Turn) => {
        this.turns = this.turns.filter(turn => turn.getId() !== turnToBeRemoved.getId());
    }

    public addOneTurn = (turn: Turn) => {
        this.turns.push(turn);
    }

    public cleanTurns = () => {
        this.turns = [];
    }

    public getPastTurns = () => {
        return this.pastTurns;
    }

    public setTurnToPast = (turn: Turn) => {
        let turnRemoved: Turn = this.turns.splice(turn.getId(), 1)[0];
        this.pastTurns.push(turnRemoved);
    }

    public validateIfGameIsOK = (): boolean => {
        let isGameValid: boolean = false;
        if (this.word && this.word.length === 4) isGameValid = true;
        return isGameValid;
    }
}