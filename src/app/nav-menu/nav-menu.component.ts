import { Component } from '@angular/core';
import { CargarScriptsService} from './../services/cargar-scripts.service';
import { MantenimientoService } from './../services/mantenimiento.service';
import {  FormGroup  } from '@angular/forms';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  displayCierre='none';
  datos:FormGroup;
  aceptacion:boolean=false;
  constructor( private _cargarScript:CargarScriptsService,private mantenimientoService: MantenimientoService) {
    this._cargarScript.cargar(["/jquery.nicescroll"]);

   }
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }    
  limiarSolicitud(){
   this.mantenimientoService.cambiarEstadoActivosTemporal().subscribe(res=>{});
  
  }
  }

