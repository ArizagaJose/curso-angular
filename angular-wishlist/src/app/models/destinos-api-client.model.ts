import { DestinoViaje } from './destino-viaje.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { ElegidoFavoritoAction, NuevoDestinoAction } from './destinos-viajes-state.model';

@Injectable({
    providedIn: 'root'
})

export class DestinosApiClient {
    constructor(private store: Store<AppState>) {
    }

    add(d: DestinoViaje): void {
        this.store.dispatch(new NuevoDestinoAction(d));
    }

    elegir(d: DestinoViaje): void {
        this.store.dispatch(new ElegidoFavoritoAction(d));
    }

}
