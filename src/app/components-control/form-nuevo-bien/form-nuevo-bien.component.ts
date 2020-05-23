import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import { CatalogosService } from './../../services/catalogos.service';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-form-nuevo-bien',
  templateUrl: './form-nuevo-bien.component.html',
  styleUrls: ['./form-nuevo-bien.component.css']
})
export class FormNuevoBienComponent implements OnInit {

  perfilFormGroup: FormGroup;
  direccionFormGroup: FormGroup;
  telefonoFormGroup: FormGroup;

  //Variables 
  donantes: FormGroup;

  constructor(private catalogoService: CatalogosService, private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.perfilFormGroup = new FormGroup({

      'iidDonante': new FormControl("0"),
      'nombre': new FormControl(""),
      

    });

    this.direccionFormGroup=new FormGroup({

      'direccion': new FormControl("")
    });

   }

  ngOnInit() {
 
  }

  guardarDatos() {


      //Siempre tiene que estar valido antes de agregar o editar


        this.catalogoService.agregarDonante(this.perfilFormGroup.value & this.direccionFormGroup.value).subscribe(data => { this.router.navigate(["/form-donantes"]) });     
 

  }

}
