import { Component, OnInit } from '@angular/core';
import { CatalogosService } from './../../services/catalogos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  constructor(private catalogoService: CatalogosService) { 
    this.traspaso =new FormGroup( {
      'idtipo': new FormControl("0"),
      'bandera': new FormControl("0"),
      'nombre': new FormControl("",[Validators.required,Validators.maxLength(25),Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")],this.noRepetirNombre.bind(this)),
      'descripcion': new FormControl("",[Validators.maxLength(50),Validators.pattern("^[a-zA-Z 0-9ÑñáéíóúÁÉÍÓÚ.]+$")])
    });
  }
  ngOnInit() {
    this.catalogoService.getTipoTraspaso().subscribe(data=> {this.traspasos=data});
  }
  open() {
  //limpia cache  
  this.titulo = "Formulario tipo de traspaso";
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
                title: '¡Registro Guardado con éxito!',
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
                title: '¡Registro modificado con éxito!',
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
  this.titulo = "Modificar tipo de traspaso";
  this.display = 'block';
  this.catalogoService.recuperarTipoTraspaso(id).subscribe(data => {
    this.traspaso.controls["idtipo"].setValue(data.idtipo);
    this.traspaso.controls["bandera"].setValue("1");
    this.traspaso.controls["nombre"].setValue(data.nombre);
    this.traspaso.controls["descripcion"].setValue(data.descripcion);
    this.catalogoService.getTipoTraspaso().subscribe(data => { this.traspasos = data });  
  });
}

eliminar(idtipo) { 
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
          this.catalogoService.eliminarTipoTraspaso(idtipo).subscribe(data => {
            this.catalogoService.getTipoTraspaso().subscribe(data=> {this.traspasos=data});
              Swal.fire({
                icon: 'success',
                title: '¡ELIMINADO!',
                text: '¡El registro ha sido eliminado con éxito!',
                confirmButtonText: 'Aceptar'
  
            })
          });
         
      }
  })
}

buscar(buscador) {
  this.p = 1;
  this.catalogoService.buscarTipoTraspaso(buscador.value).subscribe(res => this.traspasos = res);
}

noRepetirNombre(control: FormControl) {

  var promesa = new Promise((resolve, reject) => {
    if (control.value != "" && control.value != null) {
      this.catalogoService.validarTipoTraspaso(this.traspaso.controls["idtipo"].value, control.value)
        .subscribe(data => {
          if (data == 1) {
            resolve({ yaExisteNombre: true });
          } else {
            resolve(null);
          }
        })
    }
  });
  return promesa;
}

}
