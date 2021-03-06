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

  public listarComboClasificacionEdi() {
    return this.http.get(environment.urlService + "api/ActivoFijo/listarClasificacionComboEdi").map(res=>res.json());
  }

  public listarComboClasificacionIntan() {
    return this.http.get(environment.urlService + "api/ActivoFijo/listarClasificacionComboIntan").map(res=>res.json());
  }

  public comboSucursal() {
    return this.http.get(environment.urlService + "api/ActivoFijo/comboSucursal").map(res=>res.json());
  }

  public comboArea() {
    return this.http.get(environment.urlService + "api/ActivoFijo/listarAreaCombo").map(res=>res.json());
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
public validarActivosAsignar() {
  return this.http.get(environment.urlService + "api/ActivoFIjo/validarActivosAsignar").map(res => res.json());
}
public getVidaUtil(idBien) {
  return this.http.get(environment.urlService + "api/ActivoFIjo/RecuperarVidaUtil/"+idBien).map(res => res.json());
}
public DatosCodigoBarras(idBien) {
  return this.http.get(environment.urlService + "api/ActivoFijo/datosCodigoBarra/"+idBien).map(res => res.json());
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

//validaciones
public validarActivosTransacciones() {
  return this.http.get(environment.urlService + "api/ActivoFijo/validarTransacciones").map(res => res.json());
}

public validarActivoxAnio(anio) {
  return this.http.get(environment.urlService + "api/ActivoFijo/validarActivo/" + anio).map(res => res.json());
}

public validarActivoDepreciadoAnio(anio) {
  return this.http.get(environment.urlService + "api/ActivoFijo/validarActivoDepreciadoAnio/" + anio).map(res => res.json());
}

public validarActivoRevalorizadoAnio(anio) {
  return this.http.get(environment.urlService + "api/ActivoFijo/validarActivoRevalorizadoAnio/" + anio).map(res => res.json());
}

public validarActivoMes(mes,anio) {
  return this.http.get(environment.urlService + "api/ActivoFijo/validarActivoMes/" + mes +"/"+ anio).map(res => res.json());
}

public validarBitacoraxAnio(anio) {
  return this.http.get(environment.urlService + "api/ActivoFijo/validarBitacoraAnio/" + anio).map(res => res.json());
}



//Control de bienes
public getBienesAsignados() {
  return this.http.get(environment.urlService  + "api/ActivoFIjo/listarActivosAsignados").map(res => res.json());
}
public getBienesAsignadosEdificios() {
  return this.http.get(environment.urlService  + "api/ActivoFIjo/listarActivosEdificios").map(res => res.json());
}
public getBienesAsignadosIntengibles() {
  return this.http.get(environment.urlService  + "api/ActivoFIjo/listarActivosIntangibles").map(res => res.json());
}

public validarActivosAsignados() {
  return this.http.get(environment.urlService  + "api/ActivoFIjo/validarActivosAsignados").map(res => res.json());
}

public validarActivosNoAsignados() {
  return this.http.get(environment.urlService  + "api/ActivoFIjo/validarActivosNoAsignados").map(res => res.json());
}

public validarEdificiosInstalaciones() {
  return this.http.get(environment.urlService  + "api/ActivoFIjo/validarActivosEdificios").map(res => res.json());
}

public validarActivosIntengibles() {
  return this.http.get(environment.urlService  + "api/ActivoFIjo/validarActivosIntangibles").map(res => res.json());
}

public validarCodigoBarra() {
  return this.http.get(environment.urlService  + "api/ActivoFIjo/validarCodigoBarra").map(res => res.json());
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

public modificarEdificiosInstalaciones(nuevoBien) {
      return this.http.post(environment.urlService + "api/FormularioIngreso/modificarEdificiosInstalaciones", nuevoBien).map(res=>res.json());
      }
  // MODIFICAR ACTIVOS ASIGNADOS.
public modificarActivoAsignado(nuevoBien) {
 return this.http.post(environment.urlService + "api/FormularioIngreso/modificarActivoAsignado", nuevoBien).map(res=>res.json());
      }

 
// Buscadores de activos asignados 
public buscarActivoAsig(buscador) {
  return this.http.get(environment.urlService  + "api/ActivoFijo/buscarActivoAsig/" + buscador).map(res => res.json());
}
public buscarActivoEdificioAsig(buscador) {
  return this.http.get(environment.urlService  + "api/ActivoFijo/buscarActivoEdificioAsig/" + buscador).map(res => res.json());
}
public buscarActivoIntengibleAsig(buscador) {
  return this.http.get(environment.urlService  + "api/ActivoFijo/buscarActivoIntengibleAsig/" + buscador).map(res => res.json());
}
//FIn de buscadores asignados
public buscarActivoNoAsig(buscador) {
  return this.http.get(environment.urlService  + "api/ActivoFijo/buscarActivoNoAsig/" + buscador).map(res => res.json());
}

public VerDatosActivosAsig(id){
  return this.http.get(environment.urlService + "api/ActivoFijo/DatosGeneralesActivosAsignados/"+id).map(res=>res.json());
 }
 public VerDatosActivosNoAsig(id){
  return this.http.get(environment.urlService + "api/ActivoFijo/DatosGeneralesActivosNoAsignados/"+id).map(res=>res.json());
 }

 public RecuperarFormCompleto(id){
  return this.http.get(environment.urlService + "api/ActivoFijo/RecuperarFormCompleto/"+id).map(res=>res.json());
 } 

 public RecuperarBienNoAsignado(id){
  return this.http.get(environment.urlService + "api/ActivoFijo/recuperarBienMueble/"+id).map(res=>res.json());
 } 
 //RECUPERAR DATOS DE ACTIVOS ASIGNADOS
 public recuperarActivoAsignado(id){
  return this.http.get(environment.urlService + "api/ActivoFijo/recuperarActivoAsignado/"+id).map(res=>res.json());
 } 

 //Recuperar año
 public mostrarAnio(){
  return this.http.get(environment.urlService + "api/Depreciacion/RecuperarAnio").map(res=>res.json());
 }
 

 public RecuperarEdificiosInstalaciones(id){
  return this.http.get(environment.urlService + "api/ActivoFijo/recuperarEdificioInsta/"+id).map(res=>res.json());
 }

 //Datos generales de eficios
 public DatosGeneralesEdificios(id){
  return this.http.get(environment.urlService + "api/ActivoFijo/DatosGeneralesEdificios/"+id).map(res=>res.json());
 }

 //Datos generales de activos intangibles
 public DatosGeneralesIntangibles(id){
  return this.http.get(environment.urlService + "api/ActivoFijo/DatosGeneralesIntangibles/"+id).map(res=>res.json());
 }
 public listarActivosRevalorizar(){
  return this.http.get(environment.urlService + "api/Revalorizar/listarActivosRevalorizar").map(res=>res.json());
 }
 public listarActivosEdificiosRevalorizar(){
  return this.http.get(environment.urlService + "api/Revalorizar/listarActivosEdificiosRevalorizar").map(res=>res.json());
 }
 public listarActivosIntangiblesRevalorizar(){
  return this.http.get(environment.urlService + "api/Revalorizar/listarActivosIntangiblesRevalorizar").map(res => res.json());
}
public VidaUtilRevalorizar(id){
  return this.http.get(environment.urlService + "api/Revalorizar/VidaUtilRevalorizar/"+id).map(res=>res.json());
 }

 
public listarActivosFiltroRev(id) {
  return this.http.get(environment.urlService + "api/Revalorizar/listarActivosFiltroRev/"+id).map(res => res.json());
  }



//buscadores de revalorización
public buscarActivoRevalorizar(buscador) {
  return this.http.get(environment.urlService  + "api/Revalorizar/buscarActivoRevalorizar/" + buscador).map(res => res.json());
}
public buscarEdificiosRevalorizar(buscador) {
  return this.http.get(environment.urlService  + "api/Revalorizar/buscarEdificiosRevalorizar/" + buscador).map(res => res.json());
}
public buscarActivoIntangibleRevalorizar(buscador) {
  return this.http.get(environment.urlService  + "api/Revalorizar/buscarActivoIntangibleRevalorizar/" + buscador).map(res => res.json());
}

public ValidarActivosARevalorizar(){
  return this.http.get(environment.urlService + "api/Revalorizar/ValidarActivosARevalorizar").map(res=>res.json());
 }
 //para tabla vacía
 public validarActivosRevalorizar(){
  return this.http.get(environment.urlService + "api/Revalorizar/validarActivosRevalorizar").map(res=>res.json());
 }
 
 public comboAreaDeSucursal(id) {
  return this.http.get(environment.urlService + "api/AreasNegocios/comboAreaDeSucursal/" + id).map(res => res.json());
}
 

 public noEditarfecha(idbien){
  return this.http.get(environment.urlService + "api/ActivoFijo/noEditarfecha/"+ idbien).map(res=>res.json());
 }
 public validarcomboMarcas(idmarca){
  return this.http.get(environment.urlService + "api/ReportesSeguridad/validarcomboMarcas/" + idmarca).map(res=>res.json());
 }
 public validarcomboClasificaciones(idclasificacion){
  return this.http.get(environment.urlService + "api/ReportesSeguridad/validarcomboClasificaciones/" + idclasificacion).map(res=>res.json());
 }
 public validarlistarUsuarios(){
  return this.http.get(environment.urlService + "api/ReportesSeguridad/validarlistarUsuarios").map(res=>res.json());
 }
 
 
 
}


