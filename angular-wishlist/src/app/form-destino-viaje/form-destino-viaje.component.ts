import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';
import { FormGroup, FormBuilder, Validators, FormControl, Validator, ValidatorFn } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})

export class FormDestinoViajeComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>
  fg: FormGroup
  minLongitud = 3;
  searchResults: string[];

  constructor(fb: FormBuilder) {
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      nombre: ['', Validators.compose([
        Validators.required,
        this.nombreValidator,
        this.nombreValidatorParametrizable(this.minLongitud)
      ])],
      url: ['']
    })

    this.fg.valueChanges.subscribe((form: any) => {
      console.log('cambio el formulario: ', form);
    })
  }

  ngOnInit(): void {
    const elemNombre = <HTMLInputElement>document.getElementById("nombre");
    fromEvent(elemNombre, 'input')
      .pipe(
        map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
        filter(text => text.length > 2),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(() => ajax('/assets/datos.json'))
      ).subscribe(AjaxResponse => {
        console.log(AjaxResponse.response)
        this.searchResults = AjaxResponse.response
      })
  }

  guardar(nombre: string, url: string): boolean {
    let d = new DestinoViaje(nombre, url)
    this.onItemAdded.emit(d)
    return false
  }

  nombreValidator(control: FormControl): { [s: string]: boolean } {
    const l = control.value.toString().trim().length
    if (l > 0 && l < 5) {
      return { invalidNombre: true }
    }
    return null
  }

  nombreValidatorParametrizable(minLongitud: number): ValidatorFn {
    return (control: FormControl): { [s: string]: boolean } | null => {
      const l = control.value.toString().trim().length
      if (l > 0 && l < this.minLongitud) {
        return { minLongNombre: true }
      }
      return null
    }
  }

}
