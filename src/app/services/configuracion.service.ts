import { Injectable, Inject  } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import {environment} from '../../environments/environment'
@Injectable()
export class ConfiguracionService { 

    constructor(private http: Http) {

    }

    //Servicios

    //Para listar
    public getCooperativa() {
        return this.http.get(environment.urlService + "api/Cooperativa/listarCooperativa").map(res => res.json());
    }

}