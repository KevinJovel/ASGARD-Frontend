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

public getBienesAsignadosEdificios() {
  return this.http.get(environment.urlService  + "api/SolicitudBaja/listarActivosEdificios").map(res => res.json());
}
public getBienesAsignadosIntengibles() {
  return this.http.get(environment.urlService  + "api/SolicitudBaja/listarActivosIntangibles").map(res => res.json());
}

public FiltroTablaActivos(id) {
return this.http.get(environment.urlService + "api/SolicitudBaja/listarActivosFiltro/"+id).map(res => res.json());
}

    public listarBienesAsignados() {
      return this.http.get(environment.urlService  + "api/SolicitudBaja/listarBienesAsignados").map(res => res.json());
    }
    public listarBienesNoAsignados() {
      return this.http.get(environment.urlService  + "api/SolicitudBaja/listarBienes").map(res => res.json());
    }
    public guardarSolicitud(soli) {
      return this.http.post(environment.urlService + "api/SolicitudBaja/guardarSolicitudBaja", soli).map(res => res.json());
    } 
   
    public validarFolio(idsolicitud, folio){
      return this.http.get(environment.urlService + "api/SolicitudBaja/validarFolio/"+ idsolicitud + "/" + folio).map(res => res.json());
    }
    public validarAcuerdo(idsolicitud, acuerdo){
      return this.http.get(environment.urlService + "api/SolicitudBaja/validarAcuerdo/"+ idsolicitud + "/" + acuerdo).map(res => res.json());
    }
    public buscarDescargos(buscador) {
      return this.http.get(environment.urlService  + "api/SolicitudBaja/buscarDescargos/" + buscador).map(res => res.json());
    }
    public ComboArea(id) {
      return this.http.get(environment.urlService + "api/AreasNegocios/comboAreaDeSucursal/"+id).map(res => res.json());
    }

    // Buscadores de activos asignados 
  public buscarBienAsig(buscador) {
      return this.http.get(environment.urlService  + "api/SolicitudBaja/buscarBienesBajaAsig/" + buscador).map(res => res.json());
    }
public buscarActivoEdificioAsig(buscador) {
  return this.http.get(environment.urlService  + "api/SolicitudBaja/buscarActivoEdificioAsig/" + buscador).map(res => res.json());
}
public buscarActivoIntengibleAsig(buscador) {
  return this.http.get(environment.urlService  + "api/SolicitudBaja/buscarActivoIntengibleAsig/" + buscador).map(res => res.json());
}
//FIn de buscadores asignados
public buscarActivoNoAsig(buscador) {
  return this.http.get(environment.urlService  + "api/SolicitudBaja/buscarActivoNoAsig/" + buscador).map(res => res.json());
}

    //SOLICITUDES
    public listarSolicitud() {
      return this.http.get(environment.urlService  + "api/SolicitudBaja/listarSolicitudBaja").map(res => res.json());
    }
  

    public aceptarSolicitudBaja(idsolicitud) {
      return this.http.get(environment.urlService  + "api/SolicitudBaja/aceptarSolicitudBaja/" + idsolicitud).map(res => res.json());
    }

    public cambiarEstadoAceptoBaja(baja) {
      return this.http.post(environment.urlService  + "api/SolicitudBaja/cambiarEstadoAceptoBaja",baja).map(res => res.json());
    }

    public verAcuerdo(id){
      return this.http.get(environment.urlService + "api/SolicitudBaja/verAcuerdo/"+id).map(res=>res.json());
    }


    public denegarSolicitud(idsolicitud) {
      return this.http.get(environment.urlService  + "api/SolicitudBaja/denegarSolicitudBaja/"+idsolicitud).map(res => res.json());
    }
    public cambiarEstadoDenegado(idbien) {
      return this.http.get(environment.urlService  + "api/SolicitudBaja/cambiarEstadoDenegado/"+idbien).map(res => res.json());
    }
    public verDetallesSolicitud(idSolicitud){
      return this.http.get(environment.urlService + "api/SolicitudBaja/verDetallesSolicitudBaja/"+idSolicitud).map(res=>res.json());
    }
    public verDetallesDescargos(idSolicitud){
      return this.http.get(environment.urlService + "api/SolicitudBaja/verDetallesDescargos/"+idSolicitud).map(res=>res.json());
    }

    public validarSolicitud(idsolicitud, id){
        return this.http.get(environment.urlService + "api/SolicitudBaja/validarSolicitud/"+ idsolicitud + "/" + id).map(res => res.json());
    }
    public guardarBien(datos) {
          return this.http.post(environment.urlService  + "api/SolicitudBaja/guardarBienesBaja",datos).map(res => res.json());
    }
    public buscarSolicitud(buscador) {
        return this.http.get(environment.urlService  + "api/SolicitudBaja/buscarSolicitud/" + buscador).map(res => res.json());
    }
   
     public validarSolicitudesParaBaja(){
      return this.http.get(environment.urlService + "api/SolicitudBaja/validarSolicitudesParaBaja"  ).map(res=>res.json());
     }
     public validarInformesBaja(){
      return this.http.get(environment.urlService + "api/SolicitudBaja/validarInformesBaja"  ).map(res=>res.json());
     }
     public validarHistorialParaBaja(){
      return this.http.get(environment.urlService + "api/SolicitudBaja/validarHistorialParaBaja"  ).map(res=>res.json());
     }

     public validarHistorialBajaNoAsig(){
      return this.http.get(environment.urlService + "api/SolicitudBaja/validarHistorialBajaNoAsig"  ).map(res=>res.json());
     }
     
    ///// DESGARGO DE BIEN
    public listarBienesAsignadosBajas() {
      return this.http.get(environment.urlService  + "api/SolicitudBaja/listarBienesAsignadosBajas").map(res => res.json());
    }
    public listarBienesNoAsignadosBajas() {
      return this.http.get(environment.urlService  + "api/SolicitudBaja/listarBienesBajas").map(res => res.json());
    }
    public getBienesAsignadosEdificiosBajas() {
      return this.http.get(environment.urlService  + "api/SolicitudBaja/listarActivosEdificiosBajas").map(res => res.json());
    }
    public getBienesAsignadosIntengiblesBajas() {
      return this.http.get(environment.urlService  + "api/SolicitudBaja/listarActivosIntangiblesBajas").map(res => res.json());
    }
    public FiltroTablaActivosBajas(id) {
      return this.http.get(environment.urlService + "api/SolicitudBaja/listarActivosFiltroBajas/"+id).map(res => res.json());
      }

          // Buscadores de activos asignados 
  public buscarBienAsigBajas(buscador) {
    return this.http.get(environment.urlService  + "api/SolicitudBaja/buscarBienesBajaAsigBajas/" + buscador).map(res => res.json());
  }
 
public buscarActivoEdificioAsigBajas(buscador) {
return this.http.get(environment.urlService  + "api/SolicitudBaja/buscarActivoEdificioAsigBajas/" + buscador).map(res => res.json());
}
public buscarActivoIntengibleAsigBajas(buscador) {
return this.http.get(environment.urlService  + "api/SolicitudBaja/buscarActivoIntengibleAsigBajas/" + buscador).map(res => res.json());
}
//FIn de buscadores asignados
public buscarActivoNoAsigBajas(buscador) {
return this.http.get(environment.urlService  + "api/SolicitudBaja/buscarActivoNoAsigBajas/" + buscador).map(res => res.json());
}

}
