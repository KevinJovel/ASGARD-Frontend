import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
  areas: any;
  cargos: any;
  p: number = 1;
  empleado: FormGroup;
  display = 'none';
  titulo: string;
  edit: number = 0;
  guardar: number=0;
  constructor(private catalogosServices: CatalogosService, private router: Router, private activateRoute: ActivatedRoute) {
    this.empleado = new FormGroup({
      'idempleado': new FormControl("0"),
      'bandera': new FormControl("0"),
      'dui': new FormControl("", [Validators.required], this.noRepetirDui.bind(this)),
      'nombres': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")]),
      'apellidos': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[-a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")]),
      'direccion': new FormControl("", [Validators.required, Validators.maxLength(100), Validators.pattern("^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ.´´,#° ]+$")]),
      'telefono': new FormControl("", [Validators.required]),
      'telefonopersonal': new FormControl("", [Validators.required]),
      'idareadenegocio': new FormControl("", [Validators.required]),
      'idcargo': new FormControl("", [Validators.required]),
      'cargo': new FormControl(""),   
      'idsucursal': new FormControl("")

    });



  }

  ngOnInit() {
    this.catalogosServices.getEmpleado().subscribe(data => {
      this.empleados = data;
    });
    this.catalogosServices.listarAreaCombo().subscribe(data => {
      this.areas = data;
    });
    /*this.catalogosServices.listarCargoCombo().subscribe(data => {
      this.cargos = data;
    });*/


  }
  open() {
    //limpia cache
    this.titulo = "Formulario empleados";
    this.empleado.controls["idempleado"].setValue("0");
    this.empleado.controls["bandera"].setValue("0");
    this.empleado.controls["dui"].setValue("");
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
    this.edit = 0;
  }


  guardarDatos(id) {
    /*this.catalogosServices.noGuardarEmpleado(id).subscribe(data => {
      if (data == 1) {
        this.edit = 1;
      }*/
    if ((this.empleado.controls["bandera"].value) == "0") {
      
      if (this.empleado.valid == true) {
        this.catalogosServices.guardarEmpleado(this.empleado.value).subscribe(data => {
          this.catalogosServices.getEmpleado().subscribe(res => { this.empleados = res });
        });

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Registro guardado con éxito!',
          showConfirmButton: false,
          timer: 3000
        })
      }
    }   

     else {
      //Sino es porque la bandera trae otro valor y solo es posible cuando preciona el boton de recuperar
      this.empleado.controls["bandera"].setValue("0");
      if (this.empleado.valid == true) {
        this.catalogosServices.modificarEmpleado(this.empleado.value).subscribe(data => {
          this.catalogosServices.getEmpleado().subscribe(res => { this.empleados = res });
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
  //});//aqui cierra el guardar

    this.empleado.controls["idempleado"].setValue("0");
    this.empleado.controls["bandera"].setValue("0");
    this.empleado.controls["dui"].setValue("");
    this.empleado.controls["nombres"].setValue("");
    this.empleado.controls["apellidos"].setValue("");
    this.empleado.controls["direccion"].setValue("");
    this.empleado.controls["telefono"].setValue("");
    this.empleado.controls["telefonopersonal"].setValue("");
    this.empleado.controls["idareadenegocio"].setValue("");
    this.empleado.controls["idcargo"].setValue("");
    this.edit = 0;
    this.display = 'none';
    this.catalogosServices.getEmpleado().subscribe(res => { this.empleados = res });

  }

  filtrarCargo(){
    var id = this.empleado.controls["idcargo"].value();
    var empleadojefe = this.empleado.controls["cargo"].setValue("Jefe");
    if(id==true){
    this.catalogosServices.listarCargoCombo(id).subscribe(data=>{this.cargos=data});
  }else{
    this.catalogosServices.listarCargoCombosinJ(id).subscribe(data=>{this.cargos=data});
  }
    
  }

  modif(id) {
    this.catalogosServices.noModificarArea(id).subscribe(data => {
      if (data == 1) {
        this.edit = 1;
      }
      this.titulo = "Modificar Empleado";
      this.display = 'block';
      this.catalogosServices.RecuperarEmpleado(id).subscribe(data => {
        this.empleado.controls["idempleado"].setValue(data.idempleado);
        this.empleado.controls["dui"].setValue(data.dui);
        this.empleado.controls["nombres"].setValue(data.nombres);
        this.empleado.controls["apellidos"].setValue(data.apellidos);
        this.empleado.controls["direccion"].setValue(data.direccion);
        this.empleado.controls["telefono"].setValue(data.telefono);
        this.empleado.controls["telefonopersonal"].setValue(data.telefonopersonal);
        this.empleado.controls["idareadenegocio"].setValue(data.idareadenegocio);
        this.empleado.controls["idcargo"].setValue(data.idcargo);
        this.empleado.controls["bandera"].setValue("1");
        this.catalogosServices.getEmpleado().subscribe(res => { this.empleados = res });
      });
    });
  }
  eliminar(idempleado) {
    this.catalogosServices.noEliminarEmpleado(idempleado).subscribe(data => {
      if (data == 1) {
        Swal.fire({
          icon: 'error',
          title: '¡ERROR!',
          text: 'No es posible eliminar este registro, ya existen activos denominados a este empleado',
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
          confirmButtonText: '¡Si, eliminar!',
          cancelButtonText: "Cancelar"
        }).then((result) => {
          if (result.value) {
            this.catalogosServices.eliminarEmpleado(idempleado).subscribe(data => {
              Swal.fire({
                icon: 'error',
                title: '¡ELIMINADO!',
                text: '¡El registro ha sido eliminado con éxito!',
                confirmButtonText: 'Aceptar'
              })
              this.catalogosServices.getEmpleado().subscribe(
                data => { this.empleados = data }
              );
            });

          }
        })
      }
    })
  }

  buscar(buscador) {
    this.p = 1;
    this.catalogosServices.buscarEmpleado(buscador.value).subscribe(res => { this.empleados = res });
  }


  noRepetirDui(control: FormControl) {

    var promesa = new Promise((resolve, reject) => {

      if (control.value != "" && control.value != null) {

        this.catalogosServices.validardui(this.empleado.controls["idempleado"].value, control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExisteDui: true });
            } else {
              resolve(null);
            }
          });
      }


    });

    return promesa;
  }



}
