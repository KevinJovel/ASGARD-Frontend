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
  areas:any;
  p: number = 1;
  empleado: FormGroup;
  display = 'none';
  titulo: string;
  Observable: any;
  constructor(private catalogosServices: CatalogosService,  private router: Router, private activateRoute: ActivatedRoute) {
    this.empleado = new FormGroup({
      'dui': new FormControl("",[Validators.required], this.noRepetirDui.bind(this)),
      'bandera': new FormControl("0"),
      'nombres': new FormControl("",[Validators.required,Validators.maxLength(50)]),
      'apellidos': new FormControl("",[Validators.required,Validators.maxLength(50)]),
      'direccion': new FormControl("",[Validators.required,Validators.maxLength(100)]),
      'telefono': new FormControl("",[Validators.required]),
      'telefonopersonal': new FormControl("",[Validators.required]),
      'idareadenegocio': new FormControl("",[Validators.required]),
      'idcargo': new FormControl("",[Validators.required])

    });



  }
  /*trackByFn(index: number, dui:string): string{
   return dui;
  }*/

  ngOnInit() {
 this.catalogosServices.getEmpleado().subscribe(data =>{
  this.empleados =data;
});
this.catalogosServices.listarCargoCombo().subscribe(data =>{
  this.cargos =data;
});
this.catalogosServices.listarAreaCombo().subscribe(data =>{
  this.areas =data;
});

  
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


  guardarDatos() {
    if ((this.empleado.controls["bandera"].value) == "0") {
      if (this.empleado.valid == true) {
        this.catalogosServices.guardarEmpleado(this.empleado.value).subscribe(data => {
          this.catalogosServices.getEmpleado().subscribe(res => {this.empleados = res});
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
      this.empleado.controls["bandera"].setValue("0");
      if (this.empleado.valid == true) {
        this.catalogosServices.modificarEmpleado(this.empleado.value).subscribe(data => {
          this.catalogosServices.getEmpleado().subscribe(res => {this.empleados = res});
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

    this.empleado.controls["dui"].setValue("");
    this.empleado.controls["bandera"].setValue("0");
    this.empleado.controls["nombres"].setValue("");
    this.empleado.controls["apellidos"].setValue("");
    this.empleado.controls["direccion"].setValue("");
    this.empleado.controls["telefono"].setValue("");
    this.empleado.controls["telefonopersonal"].setValue("");
    this.empleado.controls["idareadenegocio"].setValue("");
    this.empleado.controls["idcargo"].setValue("");

    this.display = 'none';
    this.catalogosServices.getEmpleado().subscribe(res => {this.empleados = res});

  }

  modif(id) {
    this.titulo = "Modificar Empleado";
    this.display = 'block';
    this.catalogosServices.RecuperarEmpleado(id).subscribe(data => {
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
   
  }
  eliminar(dui) {
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
        this.catalogosServices.eliminarEmpleado(dui).subscribe(data => {
          Swal.fire(
            'Registro eliminado!',
            'Tu archivo ha sido eliminado con exito.',
            'success'
          )
          this.catalogosServices.getEmpleado().subscribe(
            data => { this.empleados = data }
          );
        });

      }
    })
  }

  buscar(buscador) {
    this.p = 1;
    this.catalogosServices.buscarEmpleado(buscador.value).subscribe(res => {this.empleados = res});
  }

 /* duiExist(control: FormControl): Promise<any>  {
    return new Promise((resolv, reject) => {
      setTimeout(() => {
        this.catalogosServices.validardui(this.empleado.controls["dui"].value)
        if (control.value === 'dui') {
          
          resolv({ existedui: true });
        } else {
          resolv(null);
        }
      }, 3000);
    });
  }*/

  noRepetirDui(control: FormControl) {

    var promesa = new Promise((resolve, reject) => {

      if (control.value != "" && control.value != null) {

        if((this.empleado.controls["bandera"].value) == "1")
        {
          this.catalogosServices.validardui(this.empleado.controls["nombres"].value,control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExisteDui: true });
            } else {
              resolve(null);
            }
          //  this.empleado.controls["dui"]!=this.empleado.controls["id"]
          })
        }
      }
      if((this.empleado.controls["bandera"].value) == "0"){
        this.catalogosServices.validardui(this.empleado.controls["dui"].value,control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExisteDui: true });
            } else {
              resolve(null);
            }
          //  this.empleado.controls["dui"]!=this.empleado.controls["id"]
          })

      }


    });

    return promesa;
  }
 

  
}
