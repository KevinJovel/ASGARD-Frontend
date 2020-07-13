import { Injectable, Inject  } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { EmitterVisitorContext } from '@angular/compiler';
import { Observable } from 'rxjs/Observable';
import {environment} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class BajaService {

  constructor(private http: Http) { }

//baja de bienes
public listarBienes() {
  return this.http.get(environment.urlService  + "api/SolicitudBaja/listarBienes").map(res => res.json());
}

 public guardarSolicitud(soli) {
  return this.http.post(environment.urlService + "api/SolicitudBaja/guardarSolicitud", soli).map(res => res.json());
} 

public listarSolicitud() {
  return this.http.get(environment.urlService  + "api/SolicitudBaja/listarSolicitud").map(res => res.json());
}

public aceptarSolicitud(idsolicitud) {
  return this.http.get(environment.urlService  + "api/SolicitudBaja/aceptarSolicitud/"+idsolicitud).map(res => res.json());
}
public cambiarEstadoAceptado(idbien) {
  return this.http.get(environment.urlService  + "api/SolicitudBaja/cambiarEstadoAceptado/"+idbien).map(res => res.json());
}
public denegarSolicitud(idsolicitud) {
  return this.http.get(environment.urlService  + "api/SolicitudBaja/denegarSolicitud/"+idsolicitud).map(res => res.json());
}
public cambiarEstadoRechazado(idbien) {
  return this.http.get(environment.urlService  + "api/SolicitudBaja/cambiarEstadoRechazado/"+idbien).map(res => res.json());
}
public verSolicitud(id){
  return this.http.get(environment.urlService + "api/SolicitudBaja/verSolicitud/"+id).map(res=>res.json());
 }

}
