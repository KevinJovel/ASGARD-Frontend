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
//se valida que el folio sea unico en la bd
public validarFolio(idsolicitud, folio){
return this.http.get(environment.urlService + "api/SolicitudMantenimiento/validarFolio/"+ idsolicitud + "/" + folio).map(res => res.json());
}
//buscar las solicitudes de mantenimiento
public buscarSolicitudMante(buscador) {
  return this.http.get(environment.urlService  + "api/SolicitudMantenimiento/buscarSolicitudMante/" + buscador).map(res => res.json());
}
//buscar los bienes que estan en mantenimiento
public buscarBienesMante(buscador) {
  return this.http.get(environment.urlService  + "api/SolicitudMantenimiento/buscarBienesMante/" + buscador).map(res => res.json());
}
//buscar los bienes para eviar a mantenimiento
public buscarBienescodigo(buscador) {
  return this.http.get(environment.urlService  + "api/SolicitudMantenimiento/buscarBienescodigo/" + buscador).map(res => res.json());
}
//buscar informes 
public buscarInformes(buscador) {
  return this.http.get(environment.urlService  + "api/InformeMantenimiento/buscarInformes/" + buscador).map(res => res.json());
}

public ListarInformeMantenimiento(){
  return this.http.get(environment.urlService + "api/InformeMantenimiento/ListarInformeMantenimiento"  ).map(res=>res.json());
 } 
 //listar informes historial
 public historialInformes(idbien){
  return this.http.get(environment.urlService + "api/InformeMantenimiento/historialInformes/"+ idbien ).map(res=>res.json());
 } 



 // insertar la revalorización

 public insertarRevalorizacion(revalorizacion) {
  return this.http.post(environment.urlService + "api/InformeMantenimiento/insertarRevalorizacion", revalorizacion).map(res=>res.json());
  }


  //METODO PARA CAMBIAR DE ESTADO LA EL INFORME CUANDO NO se revaloriza.
 public  estadoInformeRevalorizado (idinformeMantenimiento){
  return this.http.get(environment.urlService + "api/InformeMantenimiento/estadoInformeRevalorizado/" + idinformeMantenimiento ).map(res=>res.json());
 }
  //METODO PARA CAMBIAR DE ESTADO LA EL INFORME CUANDO no se revaloriza.
  public  estadosinrevalorizar (idinformeMantenimiento){
    return this.http.get(environment.urlService + "api/InformeMantenimiento/estadosinrevalorizar/" + idinformeMantenimiento ).map(res=>res.json());
   }
   //listar datos adicionales en el historial.
   public  listardatosHistorial (idbien){
    return this.http.get(environment.urlService + "api/InformeMantenimiento/datosHistorial/" + idbien ).map(res=>res.json());
   }




}
