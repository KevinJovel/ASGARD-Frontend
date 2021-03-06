
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
  public TablaDepreciacionEdificios() {
    return this.http.get(environment.urlService + "api/Depreciacion/listarActivosEdificiosDepreciacion").map(res => res.json());
  }
  public TablaDepreciacionIntangibles() {
    return this.http.get(environment.urlService + "api/Depreciacion/listarActivosIntangiblesDepreciacion").map(res => res.json());
  }
  public BuscarTablaDepreciacion(buscador) {
    return this.http.get(environment.urlService + "api/Depreciacion/buscarActivos/" + buscador).map(res => res.json());
  }
  public BuscarTablaTarjeta(buscador) {
    return this.http.get(environment.urlService + "api/Depreciacion/buscarActivosTarjeta/" + buscador).map(res => res.json());
  }
  public TablaTarjeta() {
    return this.http.get(environment.urlService + "api/Depreciacion/listarActivosTarjeta").map(res => res.json());
  }
  public FiltroTablaDepreciacion(id) {
    return this.http.get(environment.urlService + "api/Depreciacion/listarActivosDepreciacionFiltro/" + id).map(res => res.json());
  }
  public FiltroTablaTarjeta(id) {
    return this.http.get(environment.urlService + "api/Depreciacion/listarActivosTarjetaFiltro/" + id).map(res => res.json());
  }
  public DatosDepreciacion(id) {
    return this.http.get(environment.urlService + "api/Depreciacion/DatosDepreciacion/" + id).map(res => res.json());
  }
  public DatosTarjeta(id) {
    return this.http.get(environment.urlService + "api/Depreciacion/TarjetaDatos/" + id).map(res => res.json());
  }
  public DatosTarjetaEdificiosIntangibles(id) {
    return this.http.get(environment.urlService + "api/Depreciacion/TarjetaDatosEdificios/" + id).map(res => res.json());
  }
  public TarjetaListaTrasacciones(id) {
    return this.http.get(environment.urlService + "api/Depreciacion/TarjetaListaTrasacciones/" + id).map(res => res.json());
  }

  public TarjetaExcelTrasacciones(id) {
    return this.http.get(environment.urlService + "api/Depreciacion/TarjetaTrasaccionesExcel/" + id).map(res => res.json());
  }

  public transaccionDepreciacion(transac) {
    return this.http.post(environment.urlService + "api/Depreciacion/transaccionDepreciacion", transac).map(res=>res.json());
    }
 public ListaActivosDepreciar() {
      return this.http.get(environment.urlService + "api/Depreciacion/ListaActivosADepreciar").map(res=>res.json());
      }
    public transaccionDepreciacionTotal() {
      return this.http.get(environment.urlService + "api/Depreciacion/DepreciacionTotal").map(res=>res.json());
      }
      public validarDatosDepreciar() {
        return this.http.get(environment.urlService + "api/Depreciacion/ValidarActivosADepreciar").map(res=>res.json());
        }
  


  //Servicio para el cuadro de control
   public getCuadroControl() {
    return this.http.get(environment.urlService  + "api/CuadroControl/listarCuadroControl").map(res => res.json());
  }

  public validarCuadroControl() {
    return this.http.get(environment.urlService  + "api/CuadroControl/validarCuadroControl").map(res => res.json());
  }

  public getCuadroControlEdificios() {
    return this.http.get(environment.urlService  + "api/CuadroControl/listarCuadroEdificios").map(res => res.json());
  }

  public validarCuadroEdificios() {
    return this.http.get(environment.urlService  + "api/CuadroControl/validarCuadroControlEdificios").map(res => res.json());
  }

  public getCuadroControlIntangibles() {
    return this.http.get(environment.urlService  + "api/CuadroControl/listarCuadroIntangibles").map(res => res.json());
  }

  public validarCuadroIntangibles() {
    return this.http.get(environment.urlService  + "api/CuadroControl/validarCuadroControlIntangibles").map(res => res.json());
  }

  //Servicio para los datos del archivo excel
  public CuadroControlExcel() {
    return this.http.get(environment.urlService  + "api/CuadroControl/DatosCuadroExcel").map(res => res.json());
  }

  public CuadroControlJefeExcel(idJefe) {
    return this.http.get(environment.urlService  + "api/CuadroControl/listarCuadroControlJefeExcel/"+idJefe).map(res => res.json());
  }

  public CuadroEdificiosExcel() {
    return this.http.get(environment.urlService  + "api/CuadroControl/CuadroEdificiosExcel").map(res => res.json());
  }

  public CuadroIntangiblesExcel() {
    return this.http.get(environment.urlService  + "api/CuadroControl/CuadroIntangiblesExcel").map(res => res.json());
  }

  //Servicio para buscar en cuadro de control
  public buscarCuadro(buscador) {
    return this.http.get(environment.urlService  + "api/CuadroControl/buscarCuadro/" + buscador).map(res => res.json());
  }
  public DatosCierre() {
    return this.http.get(environment.urlService  + "api/Depreciacion/DatosCierre").map(res => res.json());
  }
  public EjecutarCierre(periodo) {
    return this.http.post(environment.urlService + "api/Depreciacion/EjecutarCierre/", periodo).map(res=>res.json());
    }
    public recuperarFoto(id) {
      return this.http.get(environment.urlService  + "api/Depreciacion/recuperarFoto/" + id).map(res => res.json());
    }
    public validarCierre(anio) {
      return this.http.get(environment.urlService  + "api/Depreciacion/ValidarCierre/"+anio).map(res => res.json());
    }
}
