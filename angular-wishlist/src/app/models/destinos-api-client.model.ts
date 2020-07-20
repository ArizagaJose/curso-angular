import { DestinoViaje } from './destino-viaje.model';
import { forwardRef, Inject, inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppConfig, AppState, APP_CONFIG, db } from '../app.module';
import { ElegidoFavoritoAction, NuevoDestinoAction } from './destinos-viajes-state.model';
import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})


export class DestinosApiClient {
    destinos: DestinoViaje[] = [];

    constructor(
        private store: Store<AppState>,
        @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig,
        private http: HttpClient
    ) {
    }



    add(d: DestinoViaje): void {
        const headers: HttpHeaders = new HttpHeaders({ 'X-API-TOKEN': 'token-seguridad' });
        const req = new HttpRequest('POST', this.config.apiEndpoint + '/my', { nuevo: d.n }, { headers });
        this.http.request(req).subscribe((data: HttpResponse<{}>) => {
            if (data.status === 200) {
                this.store.dispatch(new NuevoDestinoAction(d));
                const myDb = db;
                myDb.destinos.add(d);
                console.log('todos los destinnos de la db!');
                myDb.destinos.toArray().then(destinos => console.log(destinos));
            }
        });
    }

    elegir(d: DestinoViaje): void {
        this.store.dispatch(new ElegidoFavoritoAction(d));
    }
    getById(id: string): DestinoViaje {
        return this.destinos.filter(function(d) { return d.id.toString() === id; })[0];
    }
    getAll(): DestinoViaje[] {
        return this.destinos;
    }

}
