import { Injectable, Inject  } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Router} from '@angular/router'
import {environment} from '../../environments/environment'
@Injectable()
export class UsuarioService {
  
    constructor(private http: Http, private router: Router) {

    }
    public login(usuario) {
      return this.http.post(environment.urlService  + "api/Usuario/login", usuario).map(res => res.json());
    }
    public crearSession() {
      return this.http.get(environment.urlService  + "api/Usuario/crearSession").map(res => res.json());
    }
    public obtenervariableSesion() {
      return this.http.get(environment.urlService + "api/Usuario/recuperarSession").map(res =>{
        var data=res.json();
        console.log(data);
        var inf=data.valor;
        
        if(inf==null){
          this.router.navigate(["/pagina-error-login"])
          return false;
        }else{
          return true;
        }
      });
      }
    public obtenerSesion() {
      return this.http.get(environment.urlService + "api/Usuario/validarSession").map(res => {
        var data = res.json();
        if (data.valor == "") {
          return false;
        } else {
          return true;
        }
  
      }
  
      );
  
    }
    public cerrarSesion() {
      return this.http.get(environment.urlService + "api/Usuario/CerrarSesion").map(res => res.json());
  
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

  public eliminarUsuario(iidUsuario) {
    return this.http.get(environment.urlService  + "api/Usuario/eliminarUsuario" + iidUsuario).map(res => res.json());
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

  public RecuperarTipoUsuario(id) {
    return this.http.get(environment.urlService  + "api/TipoUsuario/RecuperarTipoUsuario/" + id).map(res => res.json());
  }

  public modificarTipoUsuario(tipousuario) {
    return this.http.post(environment.urlService + "api/TipoUsuario/modificarTipoUsuario", tipousuario).map(res => res.json());
  }


  public buscarTipoUsuario(buscador) {
    return this.http.get(environment.urlService  + "api/TipoUsuario/buscarTipoUsuario/" + buscador).map(res => res.json());
  }

  public validarTipoUsuario(iidtipousuario, tipo) {
    return this.http.get(environment.urlService + "api/TipoUsuario/validarTipoUsuario/" + iidtipousuario + "/" + tipo)
      .map(res => res.json());
  }
 

}
