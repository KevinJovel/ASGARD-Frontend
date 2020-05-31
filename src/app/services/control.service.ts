import { Injectable, Inject  } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import {environment} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ControlService {

  constructor(private http: Http) { }
//servicios dividamolos por form o por la parte que nos tocó
public getActivosSinAsignar() {
  return this.http.get(environment.urlService + "api/ActivoFIjo/listarActivosNoAsignados").map(res => res.json());
}
public listarComboAsigar() {
  return this.http.get(environment.urlService + "api/ActivoFijo/listarEmpleadosCombo").map(res => res.json());
}
}
