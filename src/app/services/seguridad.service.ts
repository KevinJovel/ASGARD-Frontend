import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router'
import { environment } from '../../environments/environment'
import { isObject } from 'util';
@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor(private http: Http, private router: Router) {

  }
  public getActivosJefe(idjefe) {
    return this.http.get(environment.urlService + "api/Division/listarActivosAsignadosJefe/"+idjefe).map(res => res.json());
  }
  public buscarActivoAsigJefe(idjefe,buscador) {
    return this.http.get(environment.urlService  + "api/ActivoFijo/buscarActivoAsigJefe/" + idjefe+"/"+buscador).map(res => res.json());
  }
  public getTarjetaJefe(idjefe) {
    return this.http.get(environment.urlService + "api/Depreciacion/listarActivosTarjetaJefe/"+idjefe).map(res => res.json());
  }
  public BuscarTablaTarjetaJefe(idJefe,buscador) {
    return this.http.get(environment.urlService + "api/Division/buscarActivosJefe/"+idJefe+"/" + buscador).map(res => res.json());
  }
  public getCuadroJefe(idJefe) {
    return this.http.get(environment.urlService + "api/CuadroControl/listarCuadroControlJefe/"+idJefe).map(res => res.json());
  }
  public BuscarCuadroJefe(idJefe,buscador) {
    return this.http.get(environment.urlService + "api/CuadroControl/buscarCuadroJefe/"+idJefe+"/" + buscador).map(res => res.json());
  }
  public getActivosSoliMttoJefe(idjefe) {
    return this.http.get(environment.urlService + "api/Division/listarBienesMttoJefe/"+idjefe).map(res => res.json());
  }
  public BuscarBienMttoJefe(idJefe,buscador) {
    return this.http.get(environment.urlService + "api/Division/buscarBienesSoliMtto/"+idJefe+"/" + buscador).map(res => res.json());
  }
  public getActivosEnMttoJefe(idjefe) {
    return this.http.get(environment.urlService + "api/InformeMantenimiento/listarBienesMttInformejefe/"+idjefe).map(res => res.json());
  }
  public BuscarBienEnMttoJefe(idJefe,buscador) {
    return this.http.get(environment.urlService + "api/Division/buscarBienesEnManteJefe/"+idJefe+"/" + buscador).map(res => res.json());
  }
  public getHisorialMttoJefe(idJefe) {
    return this.http.get(environment.urlService + "api/Division/listarActivosHistorialJefe/"+idJefe).map(res => res.json());
  }
  public BuscarBienEnHotorialMttoJefe(idJefe,buscador) {
    return this.http.get(environment.urlService + "api/Division/buscarActivoHistorialJefe/"+idJefe+"/" + buscador).map(res => res.json());
  }
  public getActivosTraspasoJefe(idJefe) {
    return this.http.get(environment.urlService + "api/Division/listarActivosTraspasosJefe/"+idJefe).map(res => res.json());
  }
  public BuscarBienTraspasoJefe(idJefe,buscador) {
    return this.http.get(environment.urlService + "api/Division/buscarBienesTraspasojefe/"+idJefe+"/" + buscador).map(res => res.json());
  }
  public getActivosBajaJefe(idJefe) {
    return this.http.get(environment.urlService + "api/Division/listarBienesBajaJefe/"+idJefe).map(res => res.json());
  }
  public BuscarBienBajaJefe(idJefe,buscador) {
    return this.http.get(environment.urlService + "api/Division/buscarActivosBajaJefe/"+idJefe+"/" + buscador).map(res => res.json());
  }
  public getHistorialBajaJefe(idJefe) {
    return this.http.get(environment.urlService + "api/Division/listarhistorialBajas/"+idJefe).map(res => res.json());
  }
  public BuscarHistorialBajaJefe(idJefe,buscador) {
    return this.http.get(environment.urlService + "api/Division/buscarHistorialBajasJefe/"+idJefe+"/" + buscador).map(res => res.json());
  }
  public generarbackup() {
    return this.http.get(environment.urlService + "api/Usuario/CreateBackup").map(res => res.json());
  }
  public validarCorreo(email) {
    return this.http.get(environment.urlService + "api/Seguridad/ValidaNumeroUsuarios/"+email).map(res => res.json());
  }
  public recuperarUsuarios(email) {
    return this.http.get(environment.urlService + "api/Seguridad/ListarUsuarios/"+email).map(res => res.json());
  }
  public sendEmail(id,email) {
    return this.http.get(environment.urlService + "api/Seguridad/SendEmail/"+id+"/"+email).map(res => res.json());
  }
  public recupUsuario(email) {
    return this.http.get(environment.urlService + "api/Seguridad/recuperarUsuario/"+email).map(res => res.json());
  }
  public verificarCodigo(codigo) {
    return this.http.get(environment.urlService + "api/Seguridad/validarToken/"+codigo).map(res => res.json());
  }
  public changePassword(id,pass) {
    return this.http.get(environment.urlService + "api/Seguridad/recoveryPassword/"+id+"/"+pass).map(res => res.json());
  }
  public ListarTransacciones(anio) {
    return this.http.get(environment.urlService + "api/Revertir/listarTransaccionesActivo/"+anio).map(res => res.json());
  }
  public EliminarTransacciones(id) {
    return this.http.get(environment.urlService + "api/Revertir/EliminarTransaccionesActivo/"+id).map(res => res.json());
  }
  public EliminarActivos(id) {
    return this.http.get(environment.urlService + "api/Revertir/EliminarActivos/"+id).map(res => res.json());
  }
  


}
