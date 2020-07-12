import {v4 as uuid} from 'uuid';

export class DestinoViaje {
    private selected: boolean;
    public servicios: string[];
    id = uuid();
    constructor(public n: string, public u: string, public votes: number = 0) {
        this.servicios = ['Desayuno', 'Almuerzo', 'Merienda', 'Cena'];
     }

    isSelected(): boolean {
        return this.selected;
    }

    setSelected(s: boolean): void {
        this.selected = s;
    }
    voteUp(): void {
        this.votes++;
    }
    voteDown(): void {
        this.votes--;
    }
}
