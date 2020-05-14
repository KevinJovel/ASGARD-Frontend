import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CatalogosService } from './../../services/catalogos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-tecnico',
  templateUrl: './form-tecnico.component.html',
  styleUrls: ['./form-tecnico.component.css']
})
export class FormTecnicoComponent implements OnInit {

   //Variables  
   tecnicos: any;
   tecnico: FormGroup;
   titulo: string;
   display='none';
   p:number=1;

  constructor(private catalogoService: CatalogosService, private router: Router, private activatedRoute: ActivatedRoute) {

    this.tecnico =new FormGroup( {

      'idtecnico': new FormControl("0"),
      'bandera': new FormControl("0"),
      'nombre': new FormControl("", [Validators.required, Validators.maxLength(100)]),
      'empresa': new FormControl("", [Validators.required, Validators.maxLength(50)])

    });
   }

  ngOnInit(): void {
  }
  //Métodos   

  open() {
    //limpia cache  
    this.titulo = "Formulario Cargo";
    this.tecnico.controls["idtecnico"].setValue("0");
    this.tecnico.controls["bandera"].setValue("0");
    this.tecnico.controls["nombre"].setValue("");
    this.tecnico.controls["empresa"].setValue("");
    this.display = 'block';
}
close() {
    this.display = 'none';
}

guardarDatos() {
  
 if ((this.tecnico.controls["bandera"].value) == "0") {
    if (this.tecnico.valid == true) {
      this.catalogoService.agregarTecnico(this.tecnico.value).subscribe(data => {
       //Método get tecnico
          });
         
          Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Dato Guardado con éxito',
              showConfirmButton: false,
              timer: 3000
          })
          
      }
  } else {
      this.tecnico.controls["bandera"].setValue("0");
      if (this.tecnico.valid == true) {
          // Método update técnico
          Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Dato Modificado con éxito',
              showConfirmButton: false,
              timer: 3000
          })
                  
      }
  }
  this.tecnico.controls["idtecnico"].setValue("0");
  this.tecnico.controls["bandera"].setValue("0");
  this.tecnico.controls["nombre"].setValue("");
  this.tecnico.controls["empresa"].setValue("");
  this.display = 'none';
 //Método get técnico
}

}
