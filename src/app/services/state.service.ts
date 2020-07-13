//ng g service state 
//sirve para compartir parametros a otro componente
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _state = new BehaviorSubject<any>({
    data:'test state service'
  });

    state = this._state.asObservable();

    changeValue(newValue: any) {
      const oldState = this._state.getValue()
      this._state.next({ ...oldState, data: newValue });
    }

}

export interface State {
  data: any;
}
