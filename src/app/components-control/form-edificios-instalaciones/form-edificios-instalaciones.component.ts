import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CatalogosService } from './../../services/catalogos.service';
import { ControlService } from './../../services/control.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CargarScriptsService } from './../../services/cargar-scripts.service';
import Swal from 'sweetalert2';
declare var jQuery: any;
declare var $;
//para compartir parametros de diferentes componentess
import { State, StateService } from './../../services/state.service';

@Component({
  selector: 'app-form-edificios-instalaciones',
  templateUrl: './form-edificios-instalaciones.component.html',
  styleUrls: ['./form-edificios-instalaciones.component.css']
})
export class FormEdificiosInstalacionesComponent implements OnInit {
  //Variables
  activoEdiInsta: FormGroup;
  p: number=1;
 //Para la fecha
 fecha = Date.now();

  constructor(private catalogosService: CatalogosService,private _cargarScript: CargarScriptsService ,private catalogoService: CatalogosService, private controlService:ControlService,
    private activateRoute: ActivatedRoute,private router: Router) {
      this._cargarScript.cargar(['/jquery.stepy', '/sortingTable']);

      this.activoEdiInsta=new FormGroup({
        fechaingreso: new FormControl(''),
      });

     }

  ngOnInit(){
  }

}
