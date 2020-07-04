import {v4 as uuid} from 'uuid';

export class DestinoViaje {
    private selected: boolean
    public servicios: string[]
    id = uuid()
    constructor(public n: string, public u: string) {
        this.servicios = ["Desayuno","Almuerzo","Merienda","Cena"]
     }

    isSelected(): boolean {
        return this.selected
    }

    setSelected(s: boolean) {
        this.selected = s
    }
}