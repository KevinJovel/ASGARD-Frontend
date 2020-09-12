import { Injectable, Inject  } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { EmitterVisitorContext } from '@angular/compiler';
import { Observable } from 'rxjs/Observable';
import {environment} from '../../environments/environment';

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
public agregarNuevoBien(nuevoBien) {
  return this.http.post(environment.urlService + "api/ActivoFijo/guardarnuevoBien", nuevoBien).map(res=>res.json());
  }
  
  public listarComboClasificacion() {
    return this.http.get(environment.urlService + "api/ActivoFijo/listarClasificacionCombo").map(res=>res.json());
  }
  
  public listarComboMarca() {
    return this.http.get(environment.urlService + "api/ActivoFijo/listarMarcasCombo").map(res=>res.json());
  }

  public agregarFormIngreso(formularioIngreso) {
    return this.http.post(environment.urlService + "api/FormularioIngreso/guardarFormIngreso", formularioIngreso).map(res=>res.json());
    }

    public agregarBien(nuevoBien) {
      return this.http.post(environment.urlService + "api/FormularioIngreso/guardarActivoFijo", nuevoBien).map(res=>res.json());
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
public AsignarBien(bien) {
  return this.http.post(environment.urlService + "api/ActivoFIjo/asignarBien", bien).map(res => res.json());
}


//Control de bienes
public getBienes() {
  return this.http.get(environment.urlService  + "api/ActivoFIjo/listarActivos").map(res => res.json());
}

public listarComboArea() {
  return this.http.get(environment.urlService + "api/ActivoFIjo/listarAreaCombo").map(res => res.json());
}

public listarComboSucursal() {
  return this.http.get(environment.urlService + "api/ActivoFIjo/listarSucursalCombo").map(res => res.json());
}

public ComboArea(id) {
  return this.http.get(environment.urlService + "api/AreasNegocios/comboAreaDeSucursal/"+id).map(res => res.json());
}

public FiltroTablaActivos(id) {
return this.http.get(environment.urlService + "api/ActivoFIjo/listarActivosFiltro/"+id).map(res => res.json());
}

/*public modificarBien(activo) {
  return this.http.get(environment.urlService + "api/FormularioIngreso/modificarActivoFijo", activo).map(res => res.json());
}

public modificarFormIngreso(activo2) {
  return this.http.get(environment.urlService + "api/FormularioIngreso/modificarFormIngreso", activo2).map(res => res.json());
}*/

public modificarFormIngreso(formularioIngreso) {
  return this.http.post(environment.urlService + "api/FormularioIngreso/modificarFormularioIngreso", formularioIngreso).map(res=>res.json());
 }

  public modificarBien(nuevoBien) {
    return this.http.post(environment.urlService + "api/FormularioIngreso/modificarActivoFijo", nuevoBien).map(res=>res.json());
    }

public buscarActivo(buscador) {
  return this.http.get(environment.urlService  + "api/ActivoFijo/buscarActivo/" + buscador).map(res => res.json());
}

public DatosVer(id){
  return this.http.get(environment.urlService + "api/ActivoFijo/DatosVer/"+id).map(res=>res.json());
 }

 public RecuperarFormCompleto(id){
  return this.http.get(environment.urlService + "api/ActivoFijo/RecuperarFormCompleto/"+id).map(res=>res.json());
 } 

}


