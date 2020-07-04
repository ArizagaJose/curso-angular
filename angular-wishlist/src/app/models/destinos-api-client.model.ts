import { DestinoViaje } from './destino-viaje.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class DestinosApiClient {
    destinos: DestinoViaje[];
    public nombre: string;
    public url: string;
    current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null);

    constructor() {
        this.nombre = "";
        this.url = "";
        this.destinos = []
    }

    add(d: DestinoViaje) {
        this.destinos.push(d);
    }

    getAll(): DestinoViaje[] {
        return this.destinos;
    }

    getById(id: string): DestinoViaje{
        return this.destinos.filter(function(d){return d.id.toString() === id})[0];
    }

    elegir(d: DestinoViaje) {
        this.destinos.forEach(x => x.setSelected(false));
        d.setSelected(true);
        this.current.next(d);
    } 

    subscribedOnChange(fn) {
        this.current.subscribe(fn);
    }
}