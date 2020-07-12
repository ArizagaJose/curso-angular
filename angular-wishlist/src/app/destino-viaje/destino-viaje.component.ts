import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { DestinoViaje } from '../models/destino-viaje.model';
import { VoteDownAction, VoteUpAction } from '../models/destinos-viajes-state.model';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent implements OnInit {
  @Input() destino: DestinoViaje
  @Input() position: number
  @HostBinding('attr.class') cssClass = 'col-md-4'
  @Output() onClicked: EventEmitter<DestinoViaje>
  
  constructor(private store: Store<AppState>) {
    this.onClicked = new EventEmitter()
  }

  ngOnInit(): void {
  }

  ir(): boolean{
    this.onClicked.emit(this.destino)
    return false;
  }

  voteUp(): boolean{
    this.store.dispatch(new VoteUpAction(this.destino));
    return false;
  }

  voteDown(): boolean{
    this.store.dispatch(new VoteDownAction(this.destino));
    return false;
  }
}
