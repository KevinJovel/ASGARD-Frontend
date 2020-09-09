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

//BIENES BAJA
    public listarBienes() {
      return this.http.get(environment.urlService  + "api/SolicitudBaja/listarBienes").map(res => res.json());
    }
    public guardarSolicitud(soli) {
      return this.http.post(environment.urlService + "api/SolicitudBaja/guardarSolicitud", soli).map(res => res.json());
    } 
    public validarFolio(idsolicitud, folio){
      return this.http.get(environment.urlService + "api/SolicitudBaja/validarFolio/"+ idsolicitud + "/" + folio).map(res => res.json());
    }
    public validarAcuerdo(idsolicitud, acuerdo){
      return this.http.get(environment.urlService + "api/SolicitudBaja/validarAcuerdo/"+ idsolicitud + "/" + acuerdo).map(res => res.json());
    }
    public buscarBien(buscador) {
      return this.http.get(environment.urlService  + "api/SolicitudBaja/buscarBienesBaja/" + buscador).map(res => res.json());
    }
    public FiltroTablaActivos(id) {
      return this.http.get(environment.urlService + "api/SolicitudBaja/listarActivosFiltro/"+id).map(res => res.json());
    }
    public ComboArea(id) {
      return this.http.get(environment.urlService + "api/AreasNegocios/comboAreaDeSucursal/"+id).map(res => res.json());
    }

    //SOLICITUDES
    public listarSolicitud() {
      return this.http.get(environment.urlService  + "api/SolicitudBaja/listarSolicitud").map(res => res.json());
    }
    public aceptarSolicitud(idsolicitud) {
      return this.http.get(environment.urlService  + "api/SolicitudBaja/aceptarSolicitud/"+idsolicitud).map(res => res.json());
    }
    public cambiarEstadoAceptado(idbien) {
      return this.http.get(environment.urlService  + "api/SolicitudBaja/cambiarEstado/"+idbien).map(res => res.json());
    }

    public guardarAcuerdo(acuerdo) {
      return this.http.post(environment.urlService + "api/SolicitudBaja/guardarAcuerdo", acuerdo).map(res => res.json());
    }
    public denegarSolicitud(idsolicitud) {
      return this.http.get(environment.urlService  + "api/SolicitudBaja/denegarSolicitud/"+idsolicitud).map(res => res.json());
    }
    public cambiarEstadoRechazado(idbien) {
      return this.http.get(environment.urlService  + "api/SolicitudBaja/cambiarEstadoRechazado/"+idbien).map(res => res.json());
    }
    public verSolicitud(idSolicitud){
      return this.http.get(environment.urlService + "api/SolicitudBaja/verSolicitud/"+idSolicitud).map(res=>res.json());
    }
    public validarSolicitud(idsolicitud, id){
        return this.http.get(environment.urlService + "api/SolicitudBaja/validarSolicitud/"+ idsolicitud + "/" + id).map(res => res.json());
    }
    public guardarBien(datos) {
          return this.http.post(environment.urlService  + "api/SolicitudBaja/guardarBienes",datos).map(res => res.json());
    }
    public buscarSolicitud(buscador) {
        return this.http.get(environment.urlService  + "api/SolicitudBaja/buscarSolicitud/" + buscador).map(res => res.json());
    }
    
    ///// DESGARGO DE BIEN
    public listarBajas() {
      return this.http.get(environment.urlService  + "api/SolicitudBaja/listarBajas").map(res => res.json());
    }
    public buscarBajas(buscador) {
      return this.http.get(environment.urlService  + "api/SolicitudBaja/buscarBaja/" + buscador).map(res => res.json());
    }

}
