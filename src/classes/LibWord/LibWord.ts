export default class LibWord {
    day: string;
    value: string;
    sportWord: string;
    objectWord: string;
    namesWord: string;

    constructor (Day: string, Value: string, SportWord: string, ObjectWord: string, NamesWord: string) {
        this.day = Day;
        this.value = Value;
        this.sportWord = SportWord;
        this.objectWord = ObjectWord;
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

    public getObjectsWord = (): string => {
        return this.objectWord;
    }

    public getNamesWord = (): string => {
        return this.namesWord;
    }
    
}