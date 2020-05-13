import { Component, OnInit } from '@angular/core';
import { CatalogosService } from './../../services/catalogos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'form-empleado',
  templateUrl: './form-empleado.component.html',
  styleUrls: ['./form-empleado.component.css']
})
export class FormEmpleadoComponent implements OnInit {
  empleados: any;
  cargos: any;
  p: number = 1;
  empleado: FormGroup;
  display = 'none';
  titulo: string;
  constructor(private catalogosServices: CatalogosService,  private router: Router, private activateRoute: ActivatedRoute) {
    this.empleado = new FormGroup({
      'dui': new FormControl("",[Validators.required]),
      'bandera': new FormControl("0"),
      'nombres': new FormControl("",[Validators.required]),
      'apellidos': new FormControl("",[Validators.required]),
      'direccion': new FormControl("",[Validators.required]),
      'telefono': new FormControl("",[Validators.required]),
      'telefonopersonal': new FormControl(""),
      'idareadenegocio': new FormControl("",[Validators.required]),
      'idcargo': new FormControl("",[Validators.required])

    });



  }

  ngOnInit() {
  }
  open() {
    //limpia cache
    this.titulo = "Formulario registro de empleados";
    this.empleado.controls["dui"].setValue("");
    this.empleado.controls["bandera"].setValue("0");
    this.empleado.controls["nombres"].setValue("");
    this.empleado.controls["apellidos"].setValue("");
    this.empleado.controls["direccion"].setValue("");
    this.empleado.controls["telefono"].setValue("");
    this.empleado.controls["telefonopersonal"].setValue("");
    this.empleado.controls["idareadenegocio"].setValue("");
    this.empleado.controls["idcargo"].setValue(""); 
    this.display = 'block';
  }
  close() {
    this.display = 'none';
  }

  modif(id) {}

  eliminar(idclasificacion) {}

  guardarDatos(){

  }

  buscar(buscador) {}
}
