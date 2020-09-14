import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CatalogosService } from './../../services/catalogos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.css']
})
export class FormCategoriaComponent implements OnInit {
  categorias: any;
  p: number = 1;
  categoria: FormGroup;
  display = 'none';
  titulo: string;
  edit: number=0;
  constructor(private catalogosServices: CatalogosService,  private router: Router, private activateRoute: ActivatedRoute) {
    this.categoria = new FormGroup({
      'IdCategoria': new FormControl("0"),
      'bandera': new FormControl("0"),
      'VidaUtil': new FormControl("",[Validators.required,Validators.pattern("^[0-9]+$")]),
      'Categoria': new FormControl("",[Validators.required,Validators.maxLength(50),Validators.pattern("^[0-9-a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")]),
      'Descripcion': new FormControl("",[ Validators.maxLength(100),Validators.pattern("^[a-zA-Z 0-9-ñÑ@.,#+?¿¡''!áéíóúÁÉÍÓÚ ]+$")])

    });
   


  }
  ngOnInit(): void {
    this.catalogosServices.getCategorias().subscribe(data => { this.categorias = data} );

  }
  open() {
    //limpia cache
    this.titulo = "Formulario registro de categorias";
    this.categoria.controls["IdCategoria"].setValue("0");
    this.categoria.controls["bandera"].setValue("0");
    this.categoria.controls["VidaUtil"].setValue("");
    this.categoria.controls["Categoria"].setValue("");
    this.categoria.controls["Descripcion"].setValue(""); 
    this.display = 'block';
  }
  close() {
    this.display = 'none';
    this.edit=0;
  }


  guardarDatos() {
    if ((this.categoria.controls["bandera"].value) == "0") {
      if (this.categoria.valid == true) {
        this.catalogosServices.guardarCategorias(this.categoria.value).subscribe(data => {
          this.catalogosServices.getCategorias().subscribe(res => {this.categorias = res});
         });
       
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro Guardado con exito',
          showConfirmButton: false,
          timer: 3000
        })
      }
    } else {
      //Sino es porque la bandera trae otro valor y solo es posible cuando preciona el boton de recuperar
      this.categoria.controls["bandera"].setValue("0");
      if (this.categoria.valid == true) {
        this.catalogosServices.modificarCategorias(this.categoria.value).subscribe(data => {
          this.catalogosServices.getCategorias().subscribe(res => {this.categorias = res});
         });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro modificado con exito',
          showConfirmButton: false,
          timer: 3000
        })
      }
    }
    this.categoria.controls["IdCategoria"].setValue("0");
    this.categoria.controls["bandera"].setValue("0");
    this.categoria.controls["VidaUtil"].setValue("");
    this.categoria.controls["Categoria"].setValue("");
    this.categoria.controls["Descripcion"].setValue("");
    //this.edit=0;
    //this.router.navigate(["/form-marca"])

    this.display = 'none';
    this.catalogosServices.getCategorias().subscribe(res => {this.categorias = res});

  }

  modif(id) {
   /* this.catalogosServices.noEditCorrelativoClasificacion(id).subscribe(data => {
      if (data == 1) {
          this.edit = 1;
      }*/
    this.titulo = "Modificar Categoria";
    this.display = 'block';
    this.catalogosServices.RecuperarClasificacion(id).subscribe(data => {
      this.categoria.controls["IdCategoria"].setValue(data.IdCategoria);
      this.categoria.controls["VidaUtil"].setValue(data.VidaUtil);
      this.categoria.controls["Categoria"].setValue(data.Categoria);
      this.categoria.controls["Descripcion"].setValue(data.Descripcion);
      this.categoria.controls["bandera"].setValue("1");
      this.catalogosServices.getCategorias().subscribe(res => { this.categorias = res });
    });
  //});
  }
  eliminar(idcategorias) {
    this.catalogosServices.validarActivoc(idcategorias).subscribe(data => {
        if (data == 1) {
            Swal.fire({
                icon: 'error',
                title: '¡ERROR!',
                text: 'No es posible eliminar este dato, ya existen activos denominados a esta categoria',
                confirmButtonText: 'Aceptar'

            })
        } else {
            Swal.fire({
                title: '¿Estas seguro de eliminar este registro?',
                text: "No podrás revertir esta acción!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar!',
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.value) {
                    this.catalogosServices.eliminarCategorias(idcategorias).subscribe(data => {
                        Swal.fire({
                            icon: 'error',
                            title: '¡ELIMINADO!',
                            text: 'El registro ha sido eliminado con exito.',
                            confirmButtonText: 'Aceptar'
                        })
                        this.catalogosServices.getCategorias().subscribe(
                          data => { this.categorias = data }
                        );
                    });

                }
            })
        }
    })

}
  eliminar1(idcategorias) {
    Swal.fire({
      title: '¿Estas seguro de eliminar este registro?',
      text: "No podras revertir esta accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.catalogosServices.eliminarCategorias(idcategorias).subscribe(data => {
          Swal.fire(
            'Registro eliminado!',
            'Tu archivo ha sido eliminado con exito.',
            'success'
          )
          this.catalogosServices.getCategorias().subscribe(
            data => { this.categorias = data }
          );
        });

      }
    })
  }


  buscar(buscador) {
    this.p = 1;
    this.catalogosServices.buscarCategorias(buscador.value).subscribe(res => {this.categorias = res});
  }
  noRepetirClasificacion(control: FormControl) {

    var promesa = new Promise((resolve, reject) => {

      if (control.value != "" && control.value != null) {

        this.catalogosServices.validarClasificacion(this.categorias.controls["IdCategoria"].value, control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExisteClasificacion: true });
            } else {
              resolve(null);
            }

          })

      }


    });

    return promesa;
  }
}
