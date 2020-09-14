import { Component } from '@angular/core';
import { CargarScriptsService} from './../services/cargar-scripts.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  display='none';
  datos:FormGroup;
  aceptacion:boolean=false;
  constructor( private _cargarScript:CargarScriptsService) {
    this._cargarScript.cargar(["/jquery.nicescroll"]);
    this.datos = new FormGroup({
      'idBien': new FormControl("0"),
      // 'bandera': new FormControl("0"),
      'codigo': new FormControl(""),
      'descripcion': new FormControl(""),
      'valorAdquicicion': new FormControl(""),
      'valorActual': new FormControl(""),
      'valorDepreciacion': new FormControl("0.00"),
      'fecha': new FormControl("")
  });
   }
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  cierre(){
    this.display='block';
  }
  close(){
    this.display='none';
  }
  Aceptar(aceptar){
    if(aceptar){
      this.aceptacion=true;
    }else{
      this.aceptacion=false;
    }
 
    
  }

}
