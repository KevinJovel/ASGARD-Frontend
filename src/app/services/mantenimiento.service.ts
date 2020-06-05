import { Injectable, Inject  } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import {environment} from '../../environments/environment'
@Injectable()
export class MantenimientoService {

  constructor(private http: Http) {

   }
 public listarEmpleadosCombo(){
  return this.http.get(environment.urlService + "api/SolicitudMantenimiento/listarEmpleadosCombo" ).map(res=>res.json());
 }
 public listarAreaCombo(){
  return this.http.get(environment.urlService + "api/SolicitudMantenimiento/listarAreaCombo" ).map(res=>res.json());
 } 
 public getSolicitudMantenimiento(){
   return this.http.get(environment.urlService + "api/SolicitudMantenimiento/listarSolicitudMante").map(res=>res.json());
 }
 public guardarSolicitud(idsolicitud) {
  return this.http.post(environment.urlService  + "api/SolicitudMantenimiento/guardarSolicitud", idsolicitud).map(res => res.json());
}
public listarCodigoCombo(){
  return this.http.get(environment.urlService + "api/SolicitudMantenimiento/listarCodigoCombo" ).map(res=>res.json());
 } 



 
}
