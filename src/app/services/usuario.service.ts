import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router'
import { environment } from '../../environments/environment'
@Injectable()
export class UsuarioService {

  constructor(private http: Http, private router: Router) {

  }
  public login(usuario) {
    return this.http.post(environment.urlService + "api/Usuario/login", usuario).map(res => res.json());
  }
  public crearSession() {
    return this.http.get(environment.urlService + "api/Usuario/crearSession").map(res => res.json());
  }
  public validarusuariosRegistrados() {
    return this.http.get(environment.urlService + "api/Usuario/validarUsuariosregistrados").map(res => res.json());
  }
  public validarCooperativasRegistradas() {
    return this.http.get(environment.urlService + "api/Usuario/validarCooperativasRegistradas").map(res => res.json());
  }
  public validarSucursalesRegistradas() {
    return this.http.get(environment.urlService + "api/Usuario/validarSucursalesRegistradas").map(res => res.json());
  }
  public validarAreasRegistrados() {
    return this.http.get(environment.urlService + "api/Usuario/validarAreasRegistradas").map(res => res.json());
  }
  public validarEmpleadosRegistrados() {
    return this.http.get(environment.urlService + "api/Usuario/validarEmpleadosRegistrados").map(res => res.json());
  }
  //SERVICIOS PARA USUARIO
  public getUsuario() {
    return this.http.get(environment.urlService + "api/Usuario/listarUsuario")
      .map(res => res.json());
  }
  public agregarUsuario(usuario) {
    return this.http.post(environment.urlService + "api/Usuario/guardarUsuario", usuario).map(res => res.json());
  }

  public validarUsuario(iidusuario, tipo) {
    return this.http.get(environment.urlService + "api/Usuario/validarUsuario/" + iidusuario + "/" + tipo)
      .map(res => res.json());
  }

  public eliminarUsuario(iidUsuario) {
    return this.http.get(environment.urlService + "api/TipoUsuario/eliminarUsuario/" + iidUsuario).map(res => res.json());
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
  public recuperarDetallesUsuario(id) {
    return this.http.get(environment.urlService + "api/Usuario/RecuperarDetallesusuarios/" + id).map(res => res.json());
  }

  public listarEmpleadoCombo() {
    return this.http.get(environment.urlService + "api/Usuario/listarEmpleadoCombo").map(res => res.json());
  }
  public listarEmpleadoComboAsistente(idEmpleado) {
    return this.http.get(environment.urlService + "api/Usuario/listarEmpleadoAsistente/" + idEmpleado).map(res => res.json());
  }
  public validarEmpleadoComboAsistente(idEmpleado) {
    return this.http.get(environment.urlService + "api/Usuario/ValidarEmpleadoAsistente/" + idEmpleado).map(res => res.json());
  }

  public listarTipoCombo() {
    return this.http.get(environment.urlService + "api/Usuario/listarTipoCombo").map(res => res.json());
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

  public RecuperarTipoUsuario(id) {
    return this.http.get(environment.urlService + "api/TipoUsuario/RecuperarTipoUsuario/" + id).map(res => res.json());
  }

  public modificarTipoUsuario(tipousuario) {
    return this.http.post(environment.urlService + "api/TipoUsuario/modificarTipoUsuario", tipousuario).map(res => res.json());
  }


  public buscarTipoUsuario(buscador) {
    return this.http.get(environment.urlService + "api/TipoUsuario/buscarTipoUsuario/" + buscador).map(res => res.json());
  }

  public validarTipoUsuario(iidtipousuario, tipo) {
    return this.http.get(environment.urlService + "api/TipoUsuario/validarTipoUsuario/" + iidtipousuario + "/" + tipo)
      .map(res => res.json());
  }
  public BitacoraTransaccion(id, descripcion) {
    return this.http.get(environment.urlService + "api/Bitacora/guardarTransaccion/" + id + "/" + descripcion).map(res => res.json());
  }
  public ListarBitacora() {
    return this.http.get(environment.urlService + "api/Seguridad/listarBitacora").map(res => res.json());
  }

  public validarBitacora() {
    return this.http.get(environment.urlService  + "api/Seguridad/validarBitacora").map(res => res.json());
  }

}
