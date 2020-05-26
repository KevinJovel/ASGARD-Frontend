import { Component } from '@angular/core';
import { CargarScriptsService} from './../services/cargar-scripts.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  constructor( private _cargarScript:CargarScriptsService) {
    this._cargarScript.cargar(["/jquery.nicescroll"]);
   }
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

}
