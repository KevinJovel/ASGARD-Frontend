
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class DepreciacionService {

  constructor(private http: Http) { }
  //Combo de areas de negocio
  public ComboArea(id) {
    return this.http.get(environment.urlService + "api/AreasNegocios/comboAreaDeSucursal/" + id).map(res => res.json());
  }
  public TablaDepreciacion() {
    return this.http.get(environment.urlService + "api/Depreciacion/listarActivosDepreciacion").map(res => res.json());
  }
  public FiltroTablaDepreciacion(id) {
    return this.http.get(environment.urlService + "api/Depreciacion/listarActivosDepreciacionFiltro/" + id).map(res => res.json());
  }
  public DatosDepreciacion(id) {
    return this.http.get(environment.urlService + "api/Depreciacion/DatosDepreciacion/" + id).map(res => res.json());
  }
  public DatosTarjeta(id) {
    return this.http.get(environment.urlService + "api/Depreciacion/TarjetaDatos/" + id).map(res => res.json());
  }
  public TarjetaListaTrasacciones(id) {
    return this.http.get(environment.urlService + "api/Depreciacion/TarjetaListaTrasacciones/" + id).map(res => res.json());
  }

  public transaccionDepreciacion(transac) {
    return this.http.post(environment.urlService + "api/Depreciacion/transaccionDepreciacion", transac).map(res=>res.json());
    }


  //Servicio para el cuadro de control
   public getCuadroControl() {
    return this.http.get(environment.urlService  + "api/CuadroControl/listarCuadroControl").map(res => res.json());
  }

  //Servicio para buscar en cuadro de control
  public buscarCuadro(buscador) {
    return this.http.get(environment.urlService  + "api/CuadroControl/buscarCuadro/" + buscador).map(res => res.json());
  }
}
