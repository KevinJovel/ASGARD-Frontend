import { Injectable, Inject  } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import {environment} from '../../environments/environment'
@Injectable()
export class UsuarioService {
  
    constructor(private http: Http) {

    }

  public getUsuario() {
    return this.http.get(environment.urlService+ "api/Usuario/listarUsuario")
      .map(res => res.json());
  }
  public agregarUsuario(usuario) {
    return this.http.post(environment.urlService + "api/Usuario/guardarUsuario", usuario).map(res => res.json());
  }

  public validarUsuario(iidusuario, nombre) {
    return this.http.get(environment.urlService + "api/Usuario/validarUsuario/" + iidusuario + "/" + nombre)
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

  ////////////////////////////////////////////////////////////////////////

  public listarTipoUsuarios() {
    return this.http.get(environment.urlService + "api/TipoUsuario/listarTipoUsuarios")
      .map(res => res.json());
  }

}
