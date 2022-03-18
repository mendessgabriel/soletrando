export default class LibWord {
    day: string;
    value: string;
    sportWord: string;
    moviesWord: string;
    namesWord: string;

    constructor (Day: string, Value: string, SportWord: string, MoviesWord: string, NamesWord: string) {
        this.day = Day;
        this.value = Value;
        this.sportWord = SportWord;
        this.moviesWord = MoviesWord;
        this.namesWord = NamesWord;
    }

    public getDay = () => {
        return this.day;
    }

    public setDay = (newDay: string) => {
        this.day = newDay;
    }

    public getValue = () => {
        return this.value;
    }

    public setValue = (newValue: string) => {
        this.value = newValue;
    }

    public getSportWord = (): string => {
        return this.sportWord;
    }

    public getMoviesWord = (): string => {
        return this.moviesWord;
    }

    public getNamesWord = (): string => {
        return this.namesWord;
    }
    
}