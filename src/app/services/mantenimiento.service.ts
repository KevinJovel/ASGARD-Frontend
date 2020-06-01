import { Injectable, Inject  } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {

  constructor(private http: Http) { }
}
