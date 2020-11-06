import { Injectable, Inject  } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import {environment} from '../../environments/environment'
@Injectable()
export class TraspasoService {

  constructor(private http: Http) {
    
  }

  public listarAreaCombo(){
    return this.http.get(environment.urlService + "api/SolicitudTraspaso/listarAreaCombo").map(res=>res.json());
  }
  public listarEmpleadosCombo(){
    return this.http.get(environment.urlService + "api/SolicitudTraspaso/listarEmpleadosCombo").map(res=>res.json());
  }
  
}
