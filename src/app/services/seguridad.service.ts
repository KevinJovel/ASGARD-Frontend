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
}
