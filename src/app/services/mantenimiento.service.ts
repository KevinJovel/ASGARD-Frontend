import { Injectable, Inject  } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import {environment} from '../../environments/environment'
@Injectable()
export class MantenimientoService {

  constructor(private http: Http) {

   }

 public listarTecnicoCombo(){
  return this.http.get(environment.urlService + "api/SolicitudMantenimiento/listarTecnicoCombo" ).map(res=>res.json());
 } 

 public getSolicitudMantenimiento(){
   return this.http.get(environment.urlService + "api/SolicitudMantenimiento/listarSolicitudMante").map(res=>res.json());
 }
 public guardarSolicitud(solicitud) {
  return this.http.post(environment.urlService  + "api/SolicitudMantenimiento/guardarSolicitud", solicitud).map(res => res.json());
}
public listarCodigoCombo(){
  return this.http.get(environment.urlService + "api/SolicitudMantenimiento/listarCodigoCombo" ).map(res=>res.json());
 } 
 public getBienes(){
  return this.http.get(environment.urlService + "api/SolicitudMantenimiento/listarBienes").map(res=>res.json());
}
public setSolicitud(datos) {
  return this.http.post(environment.urlService  + "api/SolicitudMantenimiento/guardarBienes",datos).map(res => res.json());
}


public listarBienesSolicitados(id){
  return this.http.get(environment.urlService + "api/SolicitudMantenimiento/listaBienesSolicitados/"+id ).map(res=>res.json());
 } 
 public listarBienesMantenimiento(){
  return this.http.get(environment.urlService + "api/SolicitudMantenimiento/listarBienesMantenimiento" ).map(res=>res.json());
 } 
 
 public listarDatosSolicitud(id){
  return this.http.get(environment.urlService + "api/SolicitudMantenimiento/DatosSolicitud/"+id ).map(res=>res.json());
 } 

 public aceptarSolicitud(idsolicitud) {
  return this.http.get(environment.urlService  + "api/SolicitudMantenimiento/aceptarSolicitud/"+idsolicitud).map(res => res.json());
}
public cambiarEstado(idBien) {
  return this.http.get(environment.urlService  + "api/SolicitudMantenimiento/cambiarEstado/"+idBien).map(res => res.json());
}
public denegarSolicitud(idsolicitud) {
  return this.http.get(environment.urlService  + "api/SolicitudMantenimiento/denegarSolicitud/"+idsolicitud).map(res => res.json());
}
public cambiarEstadoDenegado(idsolicitud) {
  return this.http.get(environment.urlService  + "api/SolicitudMantenimiento/cambiarEstadoDenegado/"+idsolicitud).map(res => res.json());
}

//metodo para guardar todos los informes de mantenimiento.
public guardarInformeMantenimiento(informe) {
  return this.http.post(environment.urlService  + "api/InformeMantenimiento/guardarInformeMantenimiento",informe).map(res => res.json());
}
public validarFolio(idsolicitud, folio){
return this.http.get(environment.urlService + "api/SolicitudMantenimiento/validarFolio/"+ idsolicitud + "/" + folio).map(res => res.json());
}




}
