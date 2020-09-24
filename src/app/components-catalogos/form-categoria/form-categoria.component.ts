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
      'VidaUtil': new FormControl("",[Validators.pattern("^[0-9]+$")]),
      'Categoria': new FormControl("",[Validators.required, Validators.maxLength(50),Validators.pattern("^[-a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")],this.noRepetirCategoria.bind(this)),
      'Descripcion': new FormControl("",[ Validators.maxLength(100),Validators.pattern("^[a-zA-Z 0-9-ñÑ.,#+?¿!¡áéíóúÁÉÍÓÚ ]+$")])
    });
   


  }
  ngOnInit(): void {
    this.catalogosServices.getCategorias().subscribe(data => { this.categorias = data} );

  }
  open() {
    //limpia cache
    this.titulo = "Formulario categoría";
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
          title: '¡Registro guardado con éxito!',
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
          title: '¡Registro modificado con éxito!',
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
    this.edit=0;

    this.display = 'none';
    this.catalogosServices.getCategorias().subscribe(res => {this.categorias = res});

  }

  modif(id) {
    this.catalogosServices.noEditarCategoria(id).subscribe(data => {
      if (data == 1) {
          this.edit = 1;
      }
    this.titulo = "Modificar categoría";
    this.display = 'block';
    this.catalogosServices.RecuperarCategorias(id).subscribe(data => {
      this.categoria.controls["IdCategoria"].setValue(data.idCategoria);
      this.categoria.controls["VidaUtil"].setValue(data.vidaUtil);
      this.categoria.controls["Categoria"].setValue(data.categoria);
      this.categoria.controls["Descripcion"].setValue(data.descripcion);
      this.categoria.controls["bandera"].setValue("1");

      this.catalogosServices.getCategorias().subscribe(res => { this.categorias = res });
    });
  });
  }

  

  eliminar(idcategoria) {
    this.catalogosServices.validarActivoc(idcategoria).subscribe(data => {
        if (data == 1) {
            Swal.fire({
                icon: 'error',
                title: '¡ERROR!',
                text: 'No es posible eliminar este registro, esta categoía ya tiene activos asignados.',
                confirmButtonText: 'Aceptar'

            })
        } else {
            Swal.fire({
                title: '¿Estas seguro de eliminar este registro?',
                text: "¡No podrás revertir esta acción!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '!Si, eliminar!',
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.value) {
                    this.catalogosServices.eliminarCategorias(idcategoria).subscribe(data => {
                        Swal.fire({
                            icon: 'error',
                            title: '¡ELIMINADO!',
                            text: '¡El registro ha sido eliminado con éxito!',
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



  buscar(buscador) {
    this.p = 1;
    this.catalogosServices.buscarCategorias(buscador.value).subscribe(res => {this.categorias = res});
  }

  noRepetirCategoria(control: FormControl) {

    var promesa = new Promise((resolve, reject) => {

      if (control.value != "" && control.value != null) {

        this.catalogosServices.validarCategoria(this.categoria.controls["IdCategoria"].value, control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExisteCategoria: true });
            } else {
              resolve(null);
            }

          })

      }


    });

    return promesa;
  }
}
