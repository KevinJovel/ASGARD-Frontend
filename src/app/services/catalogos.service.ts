import { Injectable, Inject  } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import {environment} from '../../environments/environment'
@Injectable()
export class CatalogosService {
  
    constructor(private http: Http) {

    }
    
    //Servicios para marcas
    public getMarcas() {
        return this.http.get(environment.urlService + "api/Marcas/listarMarcas").map(res => res.json());
    }
    public setMarca(marca) {
        return this.http.post(environment.urlService + "api/Marcas/guardarMarca", marca).map(res => res.json());
    }
    public eliminarMarca(idMarca) {
        return this.http.get(environment.urlService  + "api/Marcas/eliminarMarca/" + idMarca).map(res => res.json());
    }
    public buscarMarca(buscador) {
        return this.http.get(environment.urlService  + "api/Marca/buscarMarca/" + buscador).map(res => res.json());
    }
    public recuperarMarcas(id) {
        return this.http.get(environment.urlService  + "api/Marcas/RecuperarMarca/" + id).map(res => res.json());
    }
    public updateMarca(marca) {
        return this.http.post(environment.urlService  + "api/Marca/modificarMarca", marca).map(res => res.json());
    }
    public validarExisteMarca(idMarca, Marca){
      return this.http.get(environment.urlService  + "api/Marca/validarMarca/" + idMarca+ "/"+ Marca).map(res => res.json());
    }
    public validarReferenciaMarcaActivos(idMarca){
      return this.http.get(environment.urlService  + "api/Marca/validarRefereciaActivo/" + idMarca).map(res => res.json());
    }
   
   
    
    //Servicios Sucursales

    public getSucursales() {
        return this.http.get(environment.urlService  + "api/Sucursal/listarSucursales").map(res => res.json());
    }
    public setSucursal(sucursal) {
        return this.http.post(environment.urlService  + "api/Sucursal/guardarSucursal", sucursal).map(res => res.json());
    }
    public deleteSucursal(idSucursal) {
        return this.http.get(environment.urlService  + "api/Sucursal/eliminarSucursal/" + idSucursal).map(res => res.json());
    }
    public recuperarSucursal(id) {
      return this.http.get(environment.urlService  + "api/Sucursal/RecuperarSucursal/" + id).map(res => res.json());
  }
    public buscarSucursal(buscador) {
      return this.http.get(environment.urlService + "api/Sucursal/buscarSucursal/" + buscador).map(res => res.json());
  }
  public validarCorrelativoSucursal(idSucursal, correlativo){
    return this.http.get(environment.urlService  + "api/Sucursal/validarCorrelativo/" + idSucursal+ "/"+ correlativo).map(res => res.json());
  }
  public validarSucursalUbicacion(idSucursal, nombre,ubicacion){
    return this.http.get(environment.urlService  + "api/Sucursal/noRepetirSucursalUbicacion/" + idSucursal+ "/"+ nombre+"/"+ubicacion).map(res => res.json());
  }
 
  public updateSucursal(sucursal) {
    return this.http.post(environment.urlService  + "api/Sucursal/modificarSucursal", sucursal).map(res => res.json());
}
public validarDependeArea(idSucursal) {
  return this.http.get(environment.urlService  + "api/Sucursal/validarArea/" + idSucursal).map(res => res.json());
}
public validarDepenActivo(idSucursal) {
  return this.http.get(environment.urlService  + "api/Sucursal/validarRefereciaActivo/" + idSucursal).map(res => res.json());
}
  //Service Cargo

  public agregarCargo(cargo) {
    return this.http.post(environment.urlService  + "api/Cargo/guardarCargo", cargo).map(res => res.json());
  }

  public getCargo() {
    return this.http.get(environment.urlService  + "api/Cargo/listarCargo").map(res => res.json());
  }

  public recuperarCargo(id) {
    return this.http.get(environment.urlService  + "api/Cargo/recuperarCargo/" + id).map(res => res.json());
  }

  public updateCargo(cargo) {
    return this.http.post(environment.urlService  + "api/Cargo/modificarCargo", cargo).map(res => res.json());
  }

  public eliminarCargo(idDonante) {
    return this.http.get(environment.urlService  + "api/Cargo/eliminarCargo/" + idDonante).map(res => res.json());
  }

  public buscarCargo(buscador) {
    return this.http.get(environment.urlService  + "api/Cargo/buscarCargo/" + buscador).map(res => res.json());
  }

  public validarCargo(idCargo, cargo) {
    return this.http.get(environment.urlService + "api/Cargo/validarCargo/" + idCargo + "/" + cargo).map(res=>res.json());
  }

  public existenCargosAsignados(idCargo){
    return this.http.get(environment.urlService  + "api/Cargo/validarCargos/" + idCargo).map(res => res.json());
  }

  //Prueba para reporte
  public reportePrueba() {
    return this.http.get(environment.urlService  + "api/Reporte/reporte").map(res => res.arrayBuffer());
  }
  //Serve para Tipo de Traspaso

  public agregarTipoTraspaso(tipotraspaso) {
    return this.http.post(environment.urlService  + "api/TipoTraspaso/guardarTraspaso", tipotraspaso).map(res => res.json());
  }

  public getTipoTraspaso() {
    return this.http.get(environment.urlService  + "api/TipoTraspaso/listarTipoTraspaso").map(res => res.json());
  }

  public recuperarTipoTraspaso(id) {
    return this.http.get(environment.urlService  + "api/TipoTraspaso/recuperarTipoTraspaso" + id).map(res => res.json());
  }

  public updateTipoTraspaso(cargo) {
    return this.http.post(environment.urlService  + "api/TipoTraspaso/modificarTipoTraspaso", cargo).map(res => res.json());
  }

  public eliminarTipoTraspaso(idTipoTraspaso) {
    return this.http.get(environment.urlService  + "api/TipoTraspaso/eliminarTipoTraspaso/" + idTipoTraspaso).map(res => res.json());
  }

  public buscarTipoTraspaso(buscador) {
    return this.http.get(environment.urlService  + "api/TipoTraspaso/buscarTipoTraspaso/" + buscador).map(res => res.json());
  }

  public validarTipoTraspaso(idTipoTraspaso, nombre) {
    return this.http.get(environment.urlService + "api/TipoTraspaso/validarTipoTraspaso/" + idTipoTraspaso + "/" + nombre).map(res=>res.json());
  }

  // Service Técnicos

  public agregarTecnico(tecnico) {
    return this.http.post(environment.urlService + "api/Tecnico/guardarTecnico", tecnico).map(res=>res.json());
  }

  public getTecnico() {
    return this.http.get(environment.urlService + "api/Tecnico/listarTenico").map(res=>res.json());
  }

  public recuperarTecnico(id) {
    return this.http.get(environment.urlService + "api/Tecnico/recuperarTecnico/" + id).map(res=>res.json());
  }

  public updateTecnico(tecnico) {
    return this.http.post(environment.urlService + "api/Tecnico/modificarTecnico", tecnico).map(res=>res.json());
  }

  public eliminarTecnico(idTecnico) {
    return this.http.get(environment.urlService + "api/Tecnico/eliminarTecnico/" + idTecnico).map(res=>res.json());
  }

  public buscarTecnico(buscador) {
    return this.http.get(environment.urlService  + "api/Tecnico/buscarTecnico/" + buscador).map(res => res.json());
  }

  public validarTecnico(idTecnico, nombre) {
    return this.http.get(environment.urlService + "api/Tecnico/validarTecnico/" + idTecnico + "/" + nombre).map(res=>res.json());
  }

  //Service Donantes

  public agregarDonante(donante) {
    return this.http.post(environment.urlService  + "api/Donantes/guardarDonante", donante).map(res => res.json());
  }
  public getDonantes() {
    return this.http.get(environment.urlService  + "api/Donantes/listarDonantes").map(res => res.json());
  }

  public RecuperarDonante(idDonante) {
    return this.http.get(environment.urlService + "api/Donantes/RecuperarDonante/" + idDonante).map(res => res.json());
  }

  public updateDonante(donante) {
    return this.http.post(environment.urlService  + "api/Donantes/modificarDonante", donante).map(res => res.json());
  }

  public eliminarDonante(idDonante) {
    return this.http.get(environment.urlService  + "api/Donantes/eliminarDonante/" + idDonante).map(res => res.json());
  }

  public buscarDonante(buscador) {
    return this.http.get(environment.urlService  + "api/Donantes/buscarDonantes/" + buscador).map(res => res.json());
  }

  public validarDonante(idDonante, donante) {
    return this.http.get(environment.urlService + "api/Cargo/validarDonante/" + idDonante + "/" + donante).map(res=>res.json());
  }


  //SERVICIOS PARA CLASIFICACIÓN.

  public guardarClasificacion(clasificacion) {
    return this.http.post(environment.urlService  + "api/Clasificacion/guardarClasificacion", clasificacion).map(res => res.json());
}
  //servicio que enlistar la clasificacion de los activos
  public getClasificacion() {
    return this.http.get(environment.urlService  + "api/Clasificacion/listarClasificacion").map(res => res.json());
  }
  //para eliminar los registros de clasificacion de acitvo

  public eliminarCasificacion(idclasificacion) {
    return this.http.get(environment.urlService  + "api/Clasificacion/eliminarCasificacion/" + idclasificacion).map(res => res.json());
  }

  buscarClasificacion(buscador) {
    return this.http.get(environment.urlService  + "api/Clasificacion/buscarClasificacion/" + buscador).map(res => res.json());
  }

  public RecuperarClasificacion(id) {
    return this.http.get(environment.urlService  + "api/Clasificacion/RecuperarClasificacion/" + id).map(res => res.json());
  }
  public modificarclasificacion(clasificacion) {
    return this.http.post(environment.urlService  + "api/Clasificacion/modificarclasificacion", clasificacion).map(res => res.json());
  }
  public validarCorrelativo(idclasificacion, correlativo){
    return this.http.get(environment.urlService  + "api/Clasificacion/validarCorrelativo/" + idclasificacion+ "/"+ correlativo).map(res => res.json());
  }
  public validarClasificacion (idclasificacion, clasificacion){
    return this.http.get(environment.urlService  + "api/Clasificacion/validarClasificacion/" + idclasificacion+ "/"+ clasificacion).map(res => res.json());
  }
  public validarActivo(idclasificacion) {
    return this.http.get(environment.urlService  + "api/Clasificacion/validarActivo/" + idclasificacion).map(res => res.json());
  }
  public noEditCorrelativoClasificacion(idclasificacion) {
    return this.http.get(environment.urlService  + "api/Clasificacion/noEditCorrelativoClasificacion/" + idclasificacion).map(res => res.json());
  }
  public listarCategoriaCombo(){
    return this.http.get(environment.urlService + "api/Clasificacion/listarCategoriaCombo" ).map(res=>res.json());
  }

  

  //SERVICIOS PARA CATEGORIAS.
  public guardarCategorias(categorias) {
    return this.http.post(environment.urlService  + "api/Categorias/guardarCategorias", categorias).map(res => res.json());
}
  public getCategorias() {
    return this.http.get(environment.urlService  + "api/Categorias/listarCategorias").map(res => res.json());
  }
  public eliminarCategorias(idCategorias) {
    return this.http.get(environment.urlService  + "api/Categorias/eliminarCategorias/" + idCategorias).map(res => res.json());
  }
  buscarCategorias(buscador) {
    return this.http.get(environment.urlService  + "api/Categorias/buscarCategorias/" + buscador).map(res => res.json());
  }
  public RecuperarCategorias(id) {
    return this.http.get(environment.urlService  + "api/Categorias/RecuperarCategorias/" + id).map(res => res.json());
  }
  public modificarCategorias(Categorias) {
    return this.http.post(environment.urlService  + "api/Categorias/modificarCategorias", Categorias).map(res => res.json());
  }
    //este validar categoria es para no eliminar una categoría que ya esté asginada a una clasificación
  public validarActivoc(idcategorias) {
    return this.http.get(environment.urlService  + "api/Categorias/validarActivoc/" + idcategorias).map(res => res.json());
  }

  public validarCategoria (idcategoria, categoria){
    return this.http.get(environment.urlService  + "api/Categorias/validarCategoria/" + idcategoria+ "/"+ categoria).map(res => res.json());
  }
  public noEditarCategoria (idcategorias){
    return this.http.get(environment.urlService  + "api/Categorias/noEditarCategoria/" + idcategorias).map(res => res.json());
  }
  //SERVICIOS PARA PROVEEDOR

  public agregarProveedor(proveedor) {
    return this.http.post(environment.urlService  + "api/Proveedor/guardarProveedor", proveedor).map(res => res.json());
  }
  public getProveedores() {
    return this.http.get(environment.urlService  + "api/Proveedor/listarProveedores").map(res => res.json());
  }
  public recuperarProveedores(id) {
    return this.http.get(environment.urlService  + "api/Proveedor/RecuperarProveedor/" + id).map(res => res.json());
  }
  public eliminarProveedor(idProveedor) {
    return this.http.get(environment.urlService  + "api/Proveedor/eliminarProveedor/" + idProveedor).map(res => res.json());
  }
  public buscarProveedor(buscador) {
    return this.http.get(environment.urlService  + "api/Proveedor/buscarProveedor/" + buscador).map(res => res.json());
  }
  public ActualizarProveedor(proveedor) {
    return this.http.post(environment.urlService  + "api/Proveedor/modificarProveedor", proveedor).map(res => res.json());
  }
  //
  public validarProveedor(idproveedor, nombre){
  return this.http.get(environment.urlService  + "api/Proveedor/validarProveedor/" + idproveedor +"/"+ nombre).map(res => res.json());
  }
  public validarEncargado(idproveedor, nombre){
    return this.http.get(environment.urlService  + "api/Proveedor/validarEncargado/" + idproveedor +"/"+ nombre).map(res => res.json());
  }
  public validarTelProveedor(idproveedor, telefono){
    return this.http.get(environment.urlService  + "api/Proveedor/validarTelProveedor/" + idproveedor +"/"+ telefono).map(res => res.json());
  }
  public validarTelEncargado(idproveedorr, telefonoe){
    return this.http.get(environment.urlService  + "api/Proveedor/validarTelEncargado/" + idproveedorr +"/"+ telefonoe).map(res => res.json());
  }
  public validarDependeActivo(idProveedor) {
    return this.http.get(environment.urlService  + "api/Proveedor/validarActivo/" + idProveedor).map(res => res.json());
  }

//servicios exclusivos para catálogo de  empleados
public ValidarAreaJefe(idArea){
  return this.http.get(environment.urlService + "api/Empleado/validarExisteCargo/"+idArea).map(res=>res.json());
}
public listarCargoCombo(){
  return this.http.get(environment.urlService + "api/Empleado/listarCargoCombo").map(res=>res.json());
}
public listarAreaCombo(){
  return this.http.get(environment.urlService + "api/Empleado/listarAreaCombo").map(res=>res.json());
}
public listarCargoCombosinJ(){
  return this.http.get(environment.urlService + "api/Empleado/listarCargoCombosinJ/").map(res=>res.json());
}


public guardarEmpleado(idempleado) {
  return this.http.post(environment.urlService  + "api/Empleado/guardarEmpleado", idempleado).map(res => res.json());
}
public EsEmpleadoJefe(idempleado) {
  return this.http.get(environment.urlService  + "api/Empleado/EsEmpleadojefe/"+ idempleado).map(res => res.json());
}

public getEmpleado() {
  return this.http.get(environment.urlService  + "api/Empleado/listarEmpleado").map(res => res.json());
}

public modificarEmpleado(idempleado){
  return this.http.post(environment.urlService  + "api/Empleado/modificarEmpleado", idempleado).map(res => res.json());
}
public RecuperarEmpleado(idempleado) {
  return this.http.get(environment.urlService  + "api/Empleado/RecuperarEmpleado/" + idempleado).map(res => res.json());
}

public VerDatosEmpleado(id){
  return this.http.get(environment.urlService + "api/Empleado/DatosGeneralesEmpleado/"+id).map(res=>res.json());
 }

public buscarEmpleado(buscador) {
  return this.http.get(environment.urlService  + "api/Empleado/buscarEmpleado/" + buscador).map(res => res.json());
}
public eliminarEmpleado(idempleado) {
  return this.http.get(environment.urlService  + "api/Empleado/eliminarEmpleado/" + idempleado).map(res => res.json());
}

public validardui(idempleado, dui)
{
  return this.http.get(environment.urlService  + "api/Empleado/validardui/" + idempleado +"/"+ dui).map(res => res.json());
}
public noModificarArea(idempleado) {
  return this.http.get(environment.urlService  + "api/Empleado/noModificarArea/" + idempleado).map(res => res.json());
}
public noEliminarEmpleado(idempleado) {
  return this.http.get(environment.urlService  + "api/Empleado/noEliminarEmpleado/" + idempleado).map(res => res.json());
}


//Services Areas de negcio
public getAreas() {
  return this.http.get(environment.urlService  + "api/AreasNegocios/listarAreas").map(res => res.json());
}
public getComboSucursal() {
  return this.http.get(environment.urlService  + "api/AreasNegocios/comboSucursal").map(res => res.json());
}
public setArea(area) {
  return this.http.post(environment.urlService + "api/AreasNegocios/agregarSucursal", area).map(res => res.json());
}
public DeleteArea(idArea){
  return this.http.get(environment.urlService  + "api/AreasNegocios/eliminarArea/" + idArea).map(res => res.json());
}
public buscarArea(buscador) {
  return this.http.get(environment.urlService  + "api/AreasNegocio/buscarArea/" + buscador).map(res => res.json());
}
public RecuperarArea(id) {
  return this.http.get(environment.urlService  + "api/AreasNegocios/RecuperarAreaNegocio/" + id).map(res => res.json());
}
public updateArea(area) {
  return this.http.post(environment.urlService  + "api/AreasNegocios/modificarArea", area).map(res => res.json());
}
public validarCorrelativoArea(idArea, correlativo){
  return this.http.get(environment.urlService  + "api/AreasNegocios/validarCorrelativo/" + idArea+ "/"+ correlativo).map(res => res.json());
}
public validarAreaSucursal(idSucursal, area,sucursal){
  return this.http.get(environment.urlService  + "api/AreasNEgocios/validarAreaSucursal/" + idSucursal+ "/"+ area+"/"+sucursal).map(res => res.json());
}
public existenEmpleadosAsignados(idArea){
  return this.http.get(environment.urlService  + "api/AreasNegocios/validarEmpleados/" + idArea).map(res => res.json());
}
public ValidarActivosReferenciadosArea(idArea){
  return this.http.get(environment.urlService  + "api/AreaNegocios/validarRefereciaActivo/" + idArea).map(res => res.json());
}

//SERVICIOS PARA TIPOS DE DESCARGO

public agregarTipoDescargo(descargo) {
  return this.http.post(environment.urlService  + "api/TipoDescargo/guardarTipoDescargo", descargo).map(res => res.json());
}
public getTipoDescargo() {
  return this.http.get(environment.urlService  + "api/TipoDescargo/listarTipoDescargo").map(res => res.json());
}
public recuperarTipoDescargo(id) {
  return this.http.get(environment.urlService  + "api/TipoDescargo/RecuperarTipoDescargo/" + id).map(res => res.json());
}
public eliminarTipoDescargo(idTipo) {
  return this.http.get(environment.urlService  + "api/TipoDescargo/eliminarTipoDescargo/" + idTipo).map(res => res.json());
}
public buscarTipoDescargo(buscador) {
  return this.http.get(environment.urlService  + "api/TipoDescargo/buscarTipoDescargo/" + buscador).map(res => res.json());
}
public ActualizarTipoDescargo(descargo) {
  return this.http.post(environment.urlService  + "api/TipoDescargo/modificarTipoDescargo", descargo).map(res => res.json());
}
//
public validarTipoDescargo(idtipo, nombre){
return this.http.get(environment.urlService  + "api/TipoDescargo/validarTipoDescargo/" + idtipo +"/"+ nombre).map(res => res.json());
}

//para listar el combo de clasificaciones en reportes
public comboClasificaciones() {
  return this.http.get(environment.urlService  + "api/ReportesSeguridad/comboClasificaciones").map(res => res.json());
}

//para lista el combo de marcas en reportes
public comboMarcas() {
  return this.http.get(environment.urlService  + "api/ReportesSeguridad/comboMarcas").map(res => res.json());
}

//VALIDAR LISTAS VACIAS 
public validarlistarSucursales(){
  return this.http.get(environment.urlService + "api/Sucursal/validarlistarSucursales"  ).map(res=>res.json());
 } 
 public validarlistarAreas(){
  return this.http.get(environment.urlService + "api/AreasNegocios/validarlistarAreas"  ).map(res=>res.json());
 } 
 public validarlistarCategoria(){
  return this.http.get(environment.urlService + "api/Categorias/validarlistarCategorias"  ).map(res=>res.json());
 } 
 public validarlistarClasificacion(){
  return this.http.get(environment.urlService + "api/Clasificacion/validarlistarClasificacion"  ).map(res=>res.json());
 } 
 public validarlistarCargo(){
  return this.http.get(environment.urlService + "api/Cargo/validarlistarCargo"  ).map(res=>res.json());
 } 
 public validarlistarEmpleado(){
  return this.http.get(environment.urlService + "api/Empleado/validarlistarEmpleado"  ).map(res=>res.json());
 } 
 public validarlistarProveedores(){
  return this.http.get(environment.urlService + "api/Proveedor/validarlistarProveedores"  ).map(res=>res.json());
 } 
 public validarlistarDonantes(){
  return this.http.get(environment.urlService + "api/Donantes/validarlistarDonantes"  ).map(res=>res.json());
 } 
 public validarlistarMarcas(){
  return this.http.get(environment.urlService + "api/Marcas/validarlistarMarcas"  ).map(res=>res.json());
 } 
 public validarlistarTenico(){
  return this.http.get(environment.urlService + "api/Tecnico/validarlistarTenico"  ).map(res=>res.json());
 } 
 public validarlistarTipoDescargo(){
  return this.http.get(environment.urlService + "api/TipoDescargo/validarlistarTipoDescargo"  ).map(res=>res.json());
 } 
 public validarempleadosPorAreapdf(idempleado){
  return this.http.get(environment.urlService + "api/Reporte/validarempleadosPorAreapdf/" + idempleado  ).map(res=>res.json());
 } 


 
 



}




