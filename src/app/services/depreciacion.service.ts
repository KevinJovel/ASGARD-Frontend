
import { Injectable, Inject  } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import {environment} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class DepreciacionService {

  constructor(private http: Http) { }
  //Combo de areas de negocio
  public ComboArea(id) {
    return this.http.get(environment.urlService + "api/AreasNegocios/comboAreaDeSucursal/"+id).map(res => res.json());
}
public TablaDepreciacion() {
  return this.http.get(environment.urlService + "api/Depreciacion/listarActivosDepreciacion").map(res => res.json());
}
public FiltroTablaDepreciacion(id) {
  return this.http.get(environment.urlService + "api/Depreciacion/listarActivosDepreciacionFiltro/"+id).map(res => res.json());
}
}
