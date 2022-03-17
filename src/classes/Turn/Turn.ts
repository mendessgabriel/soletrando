export default class Turn {
    private id: number;
    private attempts: string[];
    private currentTurn: boolean = false;

    constructor(Id: number, Attempts: string[], CurrentTurn: boolean) {
        this.id = Id;
        this.attempts = Attempts;
        this.currentTurn = CurrentTurn;
    }

    public getId = (): number => {
        return this.id;
    }

    public getAttempts = (): string[] => {
        return this.attempts;
    }

    public getConcatenedAttempts = () => {
        let word: string = '';
        this.attempts.forEach(attempt => {
            word = word + attempt;
        })
        return word;
    }

    public getOneAttempt = (index: number): string => {
        return this.attempts[index];
    }

    public setAttempts = (newAttempts: string[]) => {
        this.attempts = newAttempts;
    }

    public getNumberOfAttempts = (): number => {
        return this.attempts.length;
    }

    public deleteLastAttempt = () => {
        this.attempts.pop();
    }

    public isCurrentTurn = (): boolean => {
        return this.currentTurn;
    }

    public setCurrentTurn = (newValue: boolean) => {
        this.currentTurn = newValue;
    }

}