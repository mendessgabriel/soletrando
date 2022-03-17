export default class LibWord {
    day: string;
    value: string;

    constructor (Day: string, Value: string) {
        this.day = Day;
        this.value = Value;
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
}