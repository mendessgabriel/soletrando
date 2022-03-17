import { keyboardLetterCollor } from '../../enum/enum';

export default class KeyboardLetter {
    private id: number;
    private value: string;
    private collor: string;
    private isKeyBlocked: boolean;

    constructor (Id: number, Value: string, Collor: string, IsKeyBlocked: boolean) {
        this.id = Id;
        this.value = Value;
        this.collor = Collor;
        this.isKeyBlocked = IsKeyBlocked;
    }

    public getId = (): number => {
        return this.id;
    }

    public getValue = (): string => {
        return this.value;
    }

    public getCollor = (): string => {
        return this.collor;
    }

    public getIsKeyBlocked = () => {
        return this.isKeyBlocked;
    }
}