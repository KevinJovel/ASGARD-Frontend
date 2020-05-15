import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UsuarioService {

  urlBase: string = "";
  constructor(private http: Http, @Inject("BASE_URL") baseUrl: string) {
    this.urlBase = baseUrl;
  }

  public getUsuario() {
    return this.http.get(this.urlBase + "api/Usuario/listarUsuario")
      .map(res => res.json());
  }
  public agregarUsuario(usuario) {
    return this.http.post(this.urlBase + "api/Usuario/guardarUsuario", usuario).map(res => res.json());
  }

  public validarUsuario(iidusuario, nombre) {
    return this.http.get(this.urlBase + "api/Usuario/validarUsuario/" + iidusuario + "/" + nombre)
      .map(res => res.json());
  }


  public eliminarUsuario(iidusuario) {
    return this.http.get(this.urlBase + "api/Usuario/eliminarUsuario" + iidusuario)
      .map(res => res.json());
  }

  public buscarUsuario(buscador) {
    return this.http.get(this.urlBase + "api/Usuario/buscarUsuario/" + buscador).map(res => res.json());
  }
  public ActualizarUsuario(usuario) {
    return this.http.post(this.urlBase + "api/Usuario/modificarUsuario", usuario).map(res => res.json());
  }
  public recuperarUsuario(id) {
    return this.http.get(this.urlBase + "api/Usuario/RecuperarUsuario/" + id).map(res => res.json());
  }

  ////////////////////////////////////////////////////////////////////////

  public listarTipoUsuarios() {
    return this.http.get(this.urlBase + "api/TipoUsuario/listarTipoUsuarios")
      .map(res => res.json());
  }

}
