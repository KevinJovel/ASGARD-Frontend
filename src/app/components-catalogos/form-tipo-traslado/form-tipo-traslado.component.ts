import { Component, OnInit } from '@angular/core';
import { CatalogosService } from './../../services/catalogos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-tipo-traslado',
  templateUrl: './form-tipo-traslado.component.html',
  styleUrls: ['./form-tipo-traslado.component.css']
})
export class FormTipoTrasladoComponent implements OnInit {
   //Variables  
   traspasos: any;
   traspaso: FormGroup;
   titulo: string;
   display='none';
   p:number=1;

  constructor(private catalogoService: CatalogosService, private router: Router, private activatedRoute: ActivatedRoute) { 
    this.traspaso =new FormGroup( {

      'idtipo': new FormControl("0"),
      'bandera': new FormControl("0"),
      'nombre': new FormControl("",[Validators.required]),
      'descripcion': new FormControl("",[Validators.required])
    });
  }

  ngOnInit() {
    this.catalogoService.getTipoTraspaso().subscribe(data=> {this.traspasos=data});
  }

  //Métodos
  open() {
  //limpia cache  
  this.titulo = "Formulario Tipo de Traspaso";
  this.traspaso.controls["idtipo"].setValue("0");
  this.traspaso.controls["bandera"].setValue("0");
  this.traspaso.controls["nombre"].setValue("");
  this.traspaso.controls["descripcion"].setValue("");
  this.display = 'block';  
}

close() {
  this.display = 'none';
}

guardarDatos() {
    //Si la vandera es cero que es el que trae por defecto en el metodo open() entra en la primera a insertar  

    if ((this.traspaso.controls["bandera"].value) == "0") {
      if (this.traspaso.valid == true) {
        this.catalogoService.agregarTipoTraspaso(this.traspaso.value).subscribe(data => {
          this.catalogoService.getTipoTraspaso().subscribe(data => { this.traspasos = data });
            });
           
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Dato Guardado con éxito',
                showConfirmButton: false,
                timer: 3000
            })
            this.catalogoService.getTipoTraspaso().subscribe(data=> {this.traspasos=data});
        }
    } else {
        //Sino es porque la bandera trae otro valor y solo es posible cuando preciona el boton de recuperar   
        this.traspaso.controls["bandera"].setValue("0");
        if (this.traspaso.valid == true) {
            this.catalogoService.updateTipoTraspaso(this.traspaso.value).subscribe(data => {
              this.catalogoService.getTipoTraspaso().subscribe(data => { this.traspasos = data }); 
             });
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Dato Modificado con éxito',
                showConfirmButton: false,
                timer: 3000
            })
                   
        }
    }
    this.traspaso.controls["idtipo"].setValue("0");
    this.traspaso.controls["bandera"].setValue("0");
    this.traspaso.controls["nombre"].setValue("");
    this.traspaso.controls["descripcion"].setValue("");
    this.display = 'none';
    this.catalogoService.getTipoTraspaso().subscribe(data => { this.traspasos = data });

}

modif(id) {
  this.titulo = "Modificar Tipo de Traspaso";
  this.display = 'block';
  this.catalogoService.recuperarTipoTraspaso(id).subscribe(data => {
    this.traspaso.controls["idtipo"].setValue(data.idtipo);
    this.traspaso.controls["bandera"].setValue("1");
    this.traspaso.controls["nombre"].setValue(data.nombre);
    this.traspaso.controls["descripcion"].setValue(data.descripcion);
    this.catalogoService.getTipoTraspaso().subscribe(data => { this.traspasos = data });  
  });
}

}
