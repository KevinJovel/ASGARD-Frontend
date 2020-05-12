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
  public updateSucursal(sucursal) {
    return this.http.post(environment.urlService  + "api/Sucursal/modificarSucursal", sucursal).map(res => res.json());
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
    return this.http.get(environment.urlService  + "api/Cargo/buscarMarca/" + buscador).map(res => res.json());
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


  //Servicio de Clasificacion de activos

  public guardarClasificacion(clasificacion) {
    return this.http.post(environment.urlService  + "api/Clasificacion/guardarClasificacion", clasificacion).map(res => res.json());
}



  //servicio que enlista la clasificacion de los activos
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



}
