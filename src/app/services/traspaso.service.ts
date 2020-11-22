import { Injectable, Inject  } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import {environment} from '../../environments/environment'
@Injectable()
export class TraspasoService {

  constructor(private http: Http) {
    
  }
  public listarActivosAsignados(){
    return this.http.get(environment.urlService + "api/SolicitudTraspaso/listarActivosAsignados").map(res=>res.json());
  }
  public listarAreaCombo(){
    return this.http.get(environment.urlService + "api/SolicitudTraspaso/listarAreaCombo").map(res=>res.json());
  }
  public listarEmpleadosCombo(){
    return this.http.get(environment.urlService + "api/SolicitudTraspaso/listarEmpleadosCombo").map(res=>res.json());
  }
  public guardarSolicitudTraspaso(id) {
    return this.http.post(environment.urlService + "api/SolicitudTraspaso/guardarSolicitudTraspaso", id).map(res => res.json());
  } 
  public cambiarEstadoSolicitud(id) {
    return this.http.post(environment.urlService + "api/SolicitudTraspaso/cambiarEstadoSolicitud", id).map(res => res.json());
  }
  public listarSolicitudTraspaso(){
    return this.http.get(environment.urlService + "api/SolicitudTraspaso/listarSolicitudTraspaso").map(res=>res.json());
  }
  public verSolicitudTraspaso(id){
    return this.http.get(environment.urlService + "api/SolicitudTraspaso/verSolicitudTraspaso/" + id).map(res=>res.json());
  }
  public aceptarSolicitud(id){
    return this.http.get(environment.urlService + "api/SolicitudTraspaso/aceptarSolicitud/" + id).map(res=>res.json());
  }

  public cambiarEstadoAceptoTraspaso(traspaso) {
    return this.http.get(environment.urlService  + "api/SolicitudTraspaso/cambiarEstadoAceptoTraspaso",traspaso).map(res => res.json());
  }
  public denegarSolicitud(id){
    return this.http.get(environment.urlService + "api/SolicitudTraspaso/denegarSolicitud/" + id).map(res=>res.json());
  }
  public estadoSolicitudDenegada(idsolicitud){
    return this.http.get(environment.urlService + "api/SolicitudTraspaso/estadoSolicitudDenegada/" + idsolicitud).map(res=>res.json());
  }
  
  
  
  
}
