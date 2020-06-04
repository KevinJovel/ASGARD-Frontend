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
//ingreso de bienes
public listarComboProveedor() {
  return this.http.get(environment.urlService + "api/ActivoFijo/listarProveedoresCombo").map(res => res.json());
}
public listarComboDonante() {
  return this.http.get(environment.urlService + "api/ActivoFijo/listarDonantesCombo").map(res => res.json());
}


//asignacion de bienes
public getActivosSinAsignar() {
  return this.http.get(environment.urlService + "api/ActivoFIjo/listarActivosNoAsignados").map(res => res.json());
}
public listarComboAsigar() {
  return this.http.get(environment.urlService + "api/ActivoFijo/listarEmpleadosCombo").map(res => res.json());
}
public GenerarCodigo(idempleado,idbien) {
  return this.http.get(environment.urlService + "api/Empleado/GenerarCodigo/"+idempleado+"/"+idbien).map(res => res.json());
}

//
public getBienes() {
  return this.http.get(environment.urlService  + "api/Bienes/listarBienes").map(res => res.json());
}

public recuperarBienes(id) {
  return this.http.get(environment.urlService  + "api/Bienes/RecuperarBienes/" + id).map(res => res.json());
}


}


