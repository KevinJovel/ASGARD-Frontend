import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router'
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class GraficasService {

  constructor(private http: Http) { }
  // public getPeriodos() {
  //   return this.http.get(environment.urlService + "api/Graficas/ListarPeriodos").map(res => res.json());
  // }
  public getDatosGraficaActivosPorAnio() {
    return this.http.get(environment.urlService + "api/Graficas/ActivosRegistradosXAnio").map(res => res.json());
  }
  public getDatosGraficaMontoActivosPorAnio() {
    return this.http.get(environment.urlService + "api/Graficas/montoPorAnio").map(res => res.json());
  }
  public getGastosMattoPorAnio() {
    return this.http.get(environment.urlService + "api/Graficas/GastosMttoPorAnio").map(res => res.json());
  }
}
