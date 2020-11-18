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
   display3 = 'none';
   p:number=1;

  constructor(private catalogoService: CatalogosService, private router: Router, private activatedRoute: ActivatedRoute) {

    this.tecnico =new FormGroup( {
      'idtecnico': new FormControl("0"),
      'bandera': new FormControl("0"),
      'nombre': new FormControl("", [Validators.required, Validators.maxLength(60), Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")],this.noRepetirTecnico.bind(this)),
      'empresa': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")])

    });
   }

  ngOnInit() {
    this.catalogoService.getTecnico().subscribe(data=>{this.tecnicos=data});
  }
  //Métodos   

  open() {
    //limpia cache  
    this.titulo = "Formulario técnico";
    this.tecnico.controls["idtecnico"].setValue("0");
    this.tecnico.controls["bandera"].setValue("0");
    this.tecnico.controls["nombre"].setValue("");
    this.tecnico.controls["empresa"].setValue("");
    this.display = 'block';
}
close() {
    this.display = 'none';
}
open3() { //para modal de ayuda
  this.display3 = 'block';
}
close2() { //para modal de ayuda
  this.display3 = "none";
}
guardarDatos() {
  
 if ((this.tecnico.controls["bandera"].value) == "0") {
    if (this.tecnico.valid == true) {
      this.catalogoService.agregarTecnico(this.tecnico.value).subscribe(data => {
        this.catalogoService.getTecnico().subscribe(data=>{this.tecnicos=data});
          });
         
          Swal.fire({
              position: 'center',
              icon: 'success',
              title: '¡Registro Guardado con éxito!',
              showConfirmButton: false,
              timer: 3000
          })
          
      }
  } else {
      this.tecnico.controls["bandera"].setValue("0");
      if (this.tecnico.valid == true) {
        this.catalogoService.updateTecnico(this.tecnico.value).subscribe(data => { 
          this.catalogoService.getTecnico().subscribe(data=>{this.tecnicos=data});
        });
          Swal.fire({
              position: 'center',
              icon: 'success',
              title: '¡Registro modificado con éxito!',
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
  this.catalogoService.getTecnico().subscribe(data=>{this.tecnicos=data});
}

modif(id) {
  this.titulo = "Modificar técnico";
  this.display = 'block';
  this.catalogoService.recuperarTecnico(id).subscribe(data => {
    this.tecnico.controls["idtecnico"].setValue(data.idtecnico);
    this.tecnico.controls["bandera"].setValue("1");
    this.tecnico.controls["nombre"].setValue(data.nombre);
    this.tecnico.controls["empresa"].setValue(data.empresa);
    this.catalogoService.getTecnico().subscribe(data => { this.tecnicos = data });  
  });
}

eliminar(idtecnico) { 
  Swal.fire({
      title: '¿Estas seguro de eliminar este registro?',
      text: "¡No podras revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, eliminar!',
      cancelButtonText: 'Cancelar'
  }).then((result) => {
      if (result.value) {
          this.catalogoService.eliminarTecnico(idtecnico).subscribe(data => {
              Swal.fire(
                  '¡ELIMINADO!',
                  '¡El registro ha sido eliminado con éxito!',
                  'success'
              )
              this.catalogoService.getTecnico().subscribe(data=>{this.tecnicos=data});
          });
         
      }
  })
}

buscar(buscador) {
  this.p = 1;
  this.catalogoService.buscarTecnico(buscador.value).subscribe(res => this.tecnicos = res);
}

noRepetirTecnico(control: FormControl) {

  var promesa = new Promise((resolve, reject) => {

    if (control.value != "" && control.value != null) {

      this.catalogoService.validarTecnico(this.tecnico.controls["idtecnico"].value, control.value)
        .subscribe(data => {
          if (data == 1) {
            resolve({ yaExisteTecnico: true });
          } else {
            resolve(null);
          }

        })

    }


  });

  return promesa;
}

}
