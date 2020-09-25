import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CatalogosService } from './../../services/catalogos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-tipo-descargo',
  templateUrl: './form-tipo-descargo.component.html',
  styleUrls: ['./form-tipo-descargo.component.css']
})
export class FormTipoDescargoComponent implements OnInit {

  descargos: FormGroup;
  @Input() descargo: any;
  display = 'none';
  titulo: string;
  //parametro: string;
  p: number = 1;
  constructor(private catalogoService: CatalogosService, private router: Router,
    private activateRoute: ActivatedRoute) {

    this.descargos = new FormGroup({

      'idTipo': new FormControl("0"),
      'bandera': new FormControl("0"),
      'nombre': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-z A-Z ñÑáÁéÉíÍóÓúÚ]+$")],this.noRepetirDescargo.bind(this)),
      'descripcion': new FormControl("", [Validators.maxLength(100), Validators.pattern("^[a-z A-Z 0-9 ñÑáÁéÉíÍóÓúÚ #.°]+$")]),
    });

  }

  ngOnInit() {
    this.catalogoService.getTipoDescargo().subscribe(res => { this.descargo = res });
  }

  open() {
    //limpia cache
    this.titulo = "Formulario registro tipos de descargo";
    this.descargos.controls["idTipo"].setValue("0");
    this.descargos.controls["bandera"].setValue("0");
    this.descargos.controls["nombre"].setValue("");
    this.descargos.controls["descripcion"].setValue("");
    
    this.display = 'block';
  }

  close() {
    this.display = 'none';
  }

  guardarDatos() {
    this.display = 'none';
    if ((this.descargos.controls["bandera"].value) == "0") {
      if (this.descargos.valid == true) {
        this.catalogoService.agregarTipoDescargo(this.descargos.value).subscribe(data => {
          this.catalogoService.getTipoDescargo().subscribe(res => { this.descargo = res });
        });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro guardado con éxito',
          showConfirmButton: false,
          timer: 3000
        })
      }
    }
    else {
      //Sino es porque la bandera trae otro valor y solo es posible cuando preciona el boton de recuperar

      this.descargos.controls["bandera"].setValue("0");
      if (this.descargos.valid == true) {
        this.catalogoService.ActualizarTipoDescargo(this.descargos.value).subscribe(data => {
          this.catalogoService.getTipoDescargo().subscribe(res => { this.descargo = res });
        });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro modificado con éxito',
          showConfirmButton: false,
          timer: 3000
        })
      }
    }
    this.descargos.controls["idTipo"].setValue("0");
    this.descargos.controls["bandera"].setValue("0");
    this.descargos.controls["nombre"].setValue("");
    this.descargos.controls["descripcion"].setValue("");
    

    
    this.catalogoService.getTipoDescargo().subscribe(res => { this.descargo = res });
  }

  modificar(id) {

    this.titulo = "Modificar tipo de descargo";
    this.display = 'block';
    this.catalogoService.recuperarTipoDescargo(id).subscribe(data => {

      this.descargos.controls["idTipo"].setValue(data.idTipo);
      this.descargos.controls["nombre"].setValue(data.nombre);
      this.descargos.controls["descripcion"].setValue(data.descripcion);
      
      this.descargos.controls["bandera"].setValue("1");

      this.catalogoService.getTipoDescargo().subscribe(res => { this.descargo = res });
    });
  }

  eliminar(idTipo) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este registro?',
      text: "No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.catalogoService.eliminarTipoDescargo(idTipo).subscribe(data => {
          Swal.fire({
              icon: 'success',
              title: '¡ELIMINADO!',
              text: 'El registro ha sido eliminado con éxito.',
              confirmButtonText: 'Aceptar'
          })
          this.catalogoService.getTipoDescargo().subscribe(data => { this.descargo = data });
        });

      }
  }) 
  
}


  buscar(buscador) {
    this.p = 1;
    this.catalogoService.buscarTipoDescargo(buscador.value).subscribe(res => { this.descargo = res });
   }


  noRepetirDescargo(control: FormControl) {

    var promesa = new Promise((resolve, reject) => {

      if (control.value != "" && control.value != null) { 
        
          this.catalogoService.validarTipoDescargo(this.descargos.controls["idTipo"].value,control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExisteDescargo: true });
            } else {
              resolve(null);
            }
          });
        }
    });

    return promesa;
  }

}
