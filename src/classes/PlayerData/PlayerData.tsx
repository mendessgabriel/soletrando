export default class PlayerData {
    private games: string;
    private victories: string;
    private sequencie: string;

    constructor (Games: string, Victories: string, Sequencie: string) {
        this.games = Games;
        this.victories = Victories;
        this.sequencie = Sequencie;
    }

    getGames = (): string => {
        return this.games;
    }

    getVictories = (): string => {
        return this.victories;
    }

    getSequencie = (): string => {
        return this.sequencie;
    }
}