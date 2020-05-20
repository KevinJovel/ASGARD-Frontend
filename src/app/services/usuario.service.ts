import { Injectable, Inject  } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import {environment} from '../../environments/environment'
@Injectable()
export class UsuarioService {
  
    constructor(private http: Http) {

    }

    //SERVICIOS PARA USUARIO
  public getUsuario() {
    return this.http.get(environment.urlService+ "api/Usuario/listarUsuario")
      .map(res => res.json());
  }
  public agregarUsuario(usuario) {
    return this.http.post(environment.urlService + "api/Usuario/guardarUsuario", usuario).map(res => res.json());
  }

  public validarUsuario(iidusuario, tipo) {
    return this.http.get(environment.urlService + "api/Usuario/validarUsuario/" + iidusuario + "/" + tipo)
      .map(res => res.json());
  }


  public eliminarUsuario(iidusuario) {
    return this.http.get(environment.urlService + "api/Usuario/eliminarUsuario" + iidusuario)
      .map(res => res.json());
  }

  public buscarUsuario(buscador) {
    return this.http.get(environment.urlService + "api/Usuario/buscarUsuario/" + buscador).map(res => res.json());
  }
  public ActualizarUsuario(usuario) {
    return this.http.post(environment.urlService + "api/Usuario/modificarUsuario", usuario).map(res => res.json());
  }
  public recuperarUsuario(id) {
    return this.http.get(environment.urlService + "api/Usuario/RecuperarUsuario/" + id).map(res => res.json());
  }
  
  public listarEmpleadoCombo(){
    return this.http.get(environment.urlService + "api/Usuario/listarEmpleadoCombo" ).map(res=>res.json());
  }

  public listarTipoCombo(){
    return this.http.get(environment.urlService + "api/Usuario/listarTipoCombo" ).map(res=>res.json());
  }


  ////////////////////////////////////////////////////////////////////////
  //SERVICIOS PARA TIPO USUARIO

  public listarTipoUsuarios() {
    return this.http.get(environment.urlService + "api/TipoUsuario/ListarTipoUsuarios")
      .map(res => res.json());
  }

  public agregarTipoUsuario(tipoU) {
    return this.http.post(environment.urlService + "api/TipoUsuario/guardarTipoUsuario", tipoU).map(res => res.json());
  }

  public eliminarTipoUsuario(iidTipoUsuario) {
    return this.http.get(environment.urlService + "api/TipoUsuario/eliminarTipoUsuario/" + iidTipoUsuario)
      .map(res => res.json());
  }
  public ActualizarTipoUsuario(tipousuario) {
    return this.http.post(environment.urlService + "api/TipoUsuario/modificarTipoUsuario", tipousuario).map(res => res.json());
  }

  public recuperarTipoUsuario(id) {
    return this.http.get(environment.urlService  + "api/TipoUsuario/RecuperarTipoUsuario" + id).map(res => res.json());
  }

  public buscarTipoUsuario(buscador) {
    return this.http.get(environment.urlService  + "api/TipoUsuario/buscarTipoUsuario/" + buscador).map(res => res.json());
  }
 

}
