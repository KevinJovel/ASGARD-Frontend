import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CatalogosService } from './../../services/catalogos.service';
import { ControlService } from './../../services/control.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CargarScriptsService } from './../../services/cargar-scripts.service';
import { style } from '@angular/animations';
import Swal from 'sweetalert2';
declare var jQuery: any;
declare var $;
//para compartir parametros de diferentes componentess
import { State, StateService } from './../../services/state.service';

@Component({
  selector: 'app-form-nuevo-bien',
  templateUrl: './form-nuevo-bien.component.html',
  styleUrls: ['./form-nuevo-bien.component.css'],
})
export class FormNuevoBienComponent implements OnInit {
  dataState: State; //hace referencia a la variable donde estan almacenados los datos
  //Variables para combos
  comboProvDon: any;
  clasificaciones: any;
  tipocombo: string;
  marcas: any;

  //Variables
  id: any;
  foto: any;
  nuevobien: FormGroup;
  marca: FormGroup;
  sucursal: FormGroup;
  p: number = 1;
  display = 'none';
  disabled: boolean;
  donaprov = false; //utilizo boolean para recuperar doannte o prov
  comboAreaSucur:any;
  empleado : any;
  lista: any;
  parametro: string;
  //recargo: number=0;
  //Para la fecha
  fecha=Date.now();
  lista2: any;
  emple : boolean;//para el disabley enable del editar
  titulo: string;
  idemp:Number = 0;
  ban:Number = 0; // para el change
  @Input() bandera = false; //agrego input para hacer uso delas dos funciones
  //Variables de etiqueta
  disabledPrima: string;
  disabledPlazo: string;
  disabledCuota: string;
  disabledInteres: string;
  disabledempleado: string;
  //@Output() clickOpen: EventEmitter<any>;
  constructor(
    private catalogoService: CatalogosService,private _cargarScript: CargarScriptsService,private controlService: ControlService,
    private activateRoute: ActivatedRoute,private router: Router,private stateService: StateService) {
    this._cargarScript.cargar(['/jquery.stepy', '/sortingTable']);

    //this.clickOpen = new EventEmitter();
    this.nuevobien = new FormGroup({
      idbien: new FormControl('0'),
      bandera: new FormControl('0'),
      tipoactivo: new FormControl('2'),
      color: new FormControl('', [Validators.required,Validators.maxLength(20),Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")]),
      descripcion: new FormControl('', [Validators.required,Validators.maxLength(100),Validators.pattern("^[a-zA-Z0-9ñÑáéíóú ]+$")]),
      modelo: new FormControl('', [Validators.maxLength(30),Validators.pattern("^[a-zA-Z0-9.´´,#+° ]+$")]),
      tipoadquicicion: new FormControl('0',[Validators.required]), //contado credito o donado
      idmarca: new FormControl('0'),
      idclasificacion: new FormControl('0',[Validators.required]),
      idproveedor: new FormControl('0', [Validators.required]),
      estadoingreso: new FormControl('0',[Validators.required]),
      valoradquicicion: new FormControl('',[Validators.required,Validators.maxLength(10),Validators.pattern("^[0-9.´´ ]+$")]),
      plazopago: new FormControl('',[Validators.maxLength(2),Validators.pattern("^[0-9´´ ]+$")]),
      prima: new FormControl('',[Validators.maxLength(7),Validators.pattern("^[0-9.´´ ]+$")]),
      cuotaasignada: new FormControl('',[Validators.maxLength(7),Validators.pattern("^[0-9.´´ ]+$")]),
      interes: new FormControl('',[Validators.maxLength(2),Validators.pattern("^[0-9´´ ]+$")]),
     noformulario: new FormControl('0'),
     nofactura: new FormControl('', [Validators.maxLength(30),Validators.pattern("^[a-zA-Z0-9.´´,#+° ]+$")]),
     fechaingreso: new FormControl(''),
     personaentrega: new FormControl('',[Validators.required, Validators.maxLength(50),Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")]),
     personarecibe: new FormControl('',[Validators.required, Validators.maxLength(50),Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")]),
     valorresidual: new FormControl('',[Validators.maxLength(10),Validators.pattern("^[0-9.´´ ]+$")]),
     observaciones: new FormControl('',[Validators.maxLength(70),Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")]),
     cantidad: new FormControl('', [Validators.maxLength(2),Validators.pattern("^[0-9´´ ]+$")]),
     foto: new FormControl(''),
     idresponsable: new FormControl(''),
    });
    
  }

  ngOnInit() {
    this.tipocombo = 'Proveedor o Donante:';
    this.disabledPrima = 'Ingrese prima';
    this.disabledPlazo = 'Ingrese plazo';
    this.disabledCuota = 'Ingrese cuota';
    this.disabledInteres = 'Ingrese interes';
    this.disabledempleado = 'Inhabilitado';
    this.nuevobien.controls['idresponsable'].setValue(0);//para que muestre el inhabilitado
   // this.nuevobien.controls['idresponsable'].disable();
    var disa =this.nuevobien.controls['idresponsable'].value;//evaluo si es cero
    if(disa ==0){
    this.emple = true;// si es cero lo desabilito
    this.titulo = "Ingreso de nuevo activo";
    }
    this.controlService.listarComboClasificacion().subscribe((data) => {
      this.clasificaciones = data;
    });

    this.controlService.listarComboMarca().subscribe((data) => {
      this.marcas = data;
    });
    this.catalogoService.getEmpleado().subscribe((data) => {
      this.empleado = data;
    });

    this.controlService.getActivosSinAsignar().subscribe((data) => {this.lista2 = data; });
    this.controlService.getBienesAsignados().subscribe((data) => {this.lista = data; });

    //Recuperación de información
    if(this.parametro!="nuevo") {
      this.controlService.RecuperarBienNoAsignado(this.parametro).subscribe(param=>{
        //Valores
        this.nuevobien.controls["idbien"].setValue(param.idbien);
        this.nuevobien.controls['bandera'].setValue('1');
        this.nuevobien.controls['color'].setValue(param.color);
        this.nuevobien.controls['descripcion'].setValue(param.descripcion);
        this.nuevobien.controls['modelo'].setValue(param.modelo);
        this.nuevobien.controls['tipoadquicicion'].setValue(param.tipoadquicicion);
        this.nuevobien.controls['idmarca'].setValue(param.idmarca);
        this.nuevobien.controls['idclasificacion'].setValue(param.idclasificacion);
        //Validacion para cambiar si es proveedor o donantes
         if(param.isProvDon==1) {
            this.tipocombo="Proveedor:";
            this.controlService.listarComboProveedor().subscribe((res) => {
              this.comboProvDon = res;
            });
            this.nuevobien.controls['idproveedor'].setValue(param.idproveedor);
         } else {
            this.tipocombo="Donante:";
            this.controlService.listarComboDonante().subscribe((res) => {
              this.comboProvDon = res;
            });
            this.nuevobien.controls['idproveedor'].setValue(param.iddonante);
        }
        //Validación para crédito
          if (param.tipoadquicicion == 1 || param.tipoadquicicion == 3) {
            this.disabled = true;
          } else {
            this.disabled = false;
            this.nuevobien.controls['plazopago'].setValue(param.plazopago);
            this.nuevobien.controls['prima'].setValue(param.prima);
            this.nuevobien.controls['cuotaasignada'].setValue(param.cuotaasignada);
            this.nuevobien.controls['interes'].setValue(param.interes);
          }
        
        this.nuevobien.controls['estadoingreso'].setValue(param.estadoingreso);
        this.nuevobien.controls['valorresidual'].setValue(param.valorresidual);
        this.nuevobien.controls['valoradquicicion'].setValue(param.valoradquicicion);
        this.nuevobien.controls['noformulario'].setValue(param.noformulario);
        this.nuevobien.controls['nofactura'].setValue(param.nofactura);
        this.nuevobien.controls['fechaingreso'].setValue(param.fechaingreso);
        this.nuevobien.controls['personaentrega'].setValue(param.personaentrega);
        this.nuevobien.controls['personarecibe'].setValue(param.personarecibe);
        this.nuevobien.controls['observaciones'].setValue(param.observaciones);
        this.nuevobien.controls['cantidad'].setValue(param.cantidad);
        if(param.foto==null) {
          this.foto="";
        } else {
          this.foto=param.foto;
        }
        
      })
    }


  }

  //Método para cargar combo al guardar los datos
  ProveedorDonante() {
    var idempleado = this.nuevobien.controls['tipoadquicicion'].value;
    
    if (idempleado == 1 || idempleado == 2) {
      this.tipocombo = 'Proveedor:';
      this.disabledPrima = 'Inhabilitado';
      this.disabledPlazo = 'Inhabilitado';
      this.disabledCuota = 'Inhabilitado';
      this.disabledInteres = 'Inhabilitado';
            this.nuevobien.controls['prima'].setValue('');
            this.nuevobien.controls['plazopago'].setValue('');
            this.nuevobien.controls['cuotaasignada'].setValue('');
            this.nuevobien.controls['interes'].setValue('');
      if (idempleado == 1) {
        this.disabled = true;
      } else {
        this.disabled = false;
        this.disabledPrima = 'Ingrese prima';
        this.disabledPlazo = 'Ingrese plazo';
        this.disabledCuota = 'Ingrese cuota';
        this.disabledInteres = 'Ingrese interes';
      }
      this.controlService.listarComboProveedor().subscribe((res) => {
        this.comboProvDon = res;
      });
    } else {
      this.disabled = true;
      this.tipocombo = 'Donante:';
      this.controlService.listarComboDonante().subscribe((res) => {
        this.comboProvDon = res;
      });
    }
    //lo mando vacio cuando cambia el tipo de adquicicion
      this.nuevobien.controls['idproveedor'].setValue("");
    
  }

  //Evento para guardar foto
  changeFoto() {
    var file = (<HTMLInputElement>document.getElementById('futFoto')).files[0];
    var fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.foto = fileReader.result;
    };

    fileReader.readAsDataURL(file);
  }

  guardarDatoss() {
    // console.log(this.nuevobien.value);
    //Le agrego una bandera para englobar los datos y verificar si fueron ingresados o no en el formulario
    if (this.nuevobien.controls['bandera'].value == '0') {
      if (this.nuevobien.valid == true) {
        this.controlService.agregarFormIngreso(this.nuevobien.value).subscribe((data) => {
            //Creo esta condicion, si es contado o donado mando valor 0 sino ingresa lo de credito
          var tip = this.nuevobien.controls['tipoadquicicion'].value;
          var valorR=this.nuevobien.controls['valorresidual'].value;
          if(tip==1 || tip==3) {
            this.nuevobien.controls['prima'].setValue('0');
            this.nuevobien.controls['plazopago'].setValue('0');
            this.nuevobien.controls['cuotaasignada'].setValue('0');
            this.nuevobien.controls['interes'].setValue('0');
          } else{
          } 
          if(valorR =='') {
            this.nuevobien.controls['valorresidual'].setValue('0');
          }
            //Pasamos la foto
            this.nuevobien.controls['foto'].setValue(this.foto);

            if (data == 1) {
              this.controlService.agregarBien(this.nuevobien.value).subscribe((res) => {
                  if (res == 1) {
                    Swal.fire({
                      title: '¡Registro Guardado con éxito!',
                      icon: 'success',
                      confirmButtonColor: '#3085d6',
                      confirmButtonText: '¡OK!',
                    }).then((result) => {
                        this.router.navigate(['./registro-activos/tangibles']);
                    });
                  } else {
                    Swal.fire({
                      position: 'center',
                      icon: 'warning',
                      title: 'No guardó',
                      showConfirmButton: false,
                      timer: 3000,
                    });
                  }
                });
            }
          });
      }
    }
//inicia el MODIFICAR mandamos 1 a la bandera para identificar q es un editar
else if(this.nuevobien.controls['bandera'].value == '1'){
  //// this.nuevobien.controls['bandera'].setValue('0');
  if (this.nuevobien.valid == true) {
   this.controlService.modificarFormIngreso(this.nuevobien.value).subscribe((data) => {
      //le mando 0 para que reconozca un valor
      if(this.nuevobien.value.tipoadquicicion==1 || this.nuevobien.value.tipoadquicicion==3)
      {
        this.nuevobien.controls['plazopago'].setValue(0);
        this.nuevobien.controls['prima'].setValue(0);
        this.nuevobien.controls['cuotaasignada'].setValue(0);
        this.nuevobien.controls['interes'].setValue(0);
      }
      if(this.nuevobien.value.idmarca==0)
      {
        this.nuevobien.controls['idmarca'].setValue(0);
      }
     
      //Pasamos la foto para modificarla
      this.nuevobien.controls['foto'].setValue(this.foto);
      if (data == 1) {
        this.controlService.modificarBien(this.nuevobien.value).subscribe((res) => {
          if (res == 1) {
          this.modificar(this.nuevobien.value.idbien);
          //this.open(); //limpia cache
          this.controlService.getActivosSinAsignar().subscribe((data) => {this.lista2 = data; });   
          //this.router.navigate(['./tabla-activos']);
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Registro modificado con éxito',
              showConfirmButton: false,
              timer: 3000,
            }).then((result) => {
              this.open();//limpia cache
                this.router.navigate(['tabla-activos']);  
            });
          } else {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'No modificó',
              showConfirmButton: false,
              timer: 3000,
            });
          } //else
        });
        } // de la data
      });   
  }
  this.display = 'none';
  }
 // this.open(); //limpiar cache
 
}

modificar(id) {
 // console.log("Antes"+id);
  this.controlService.RecuperarFormCompleto(id).subscribe((data) => {
    this.nuevobien.controls['idbien'].setValue(data.idbien);
    this.nuevobien.controls['color'].setValue(data.color);
    this.nuevobien.controls['descripcion'].setValue(data.descripcion);
    this.nuevobien.controls['modelo'].setValue(data.modelo);
    this.nuevobien.controls['tipoadquicicion'].setValue(data.tipoadquicicion);
    this.nuevobien.controls['idmarca'].setValue(data.idmarca);
    this.nuevobien.controls['idclasificacion'].setValue(data.idclasificacion);
    this.nuevobien.controls['idproveedor'].setValue(data.idproveedor);
    this.nuevobien.controls['idresponsable'].setValue(data.idresponsable);
    this.nuevobien.controls['estadoingreso'].setValue(data.estadoingreso);
    this.nuevobien.controls['plazopago'].setValue(data.plazopago);
    this.nuevobien.controls['prima'].setValue(data.prima);
    this.nuevobien.controls['cuotaasignada'].setValue(data.cuotaasignada);
    this.nuevobien.controls['interes'].setValue(data.interes);
    this.nuevobien.controls['valorresidual'].setValue(data.valorresidual);
    this.nuevobien.controls['noformulario'].setValue(data.noformulario);
    this.nuevobien.controls['nofactura'].setValue(data.nofactura);
    this.nuevobien.controls['fechaingreso'].setValue(data.fechaingreso);
    this.nuevobien.controls['personaentrega'].setValue(data.personaentrega);
    this.nuevobien.controls['personarecibe'].setValue(data.personarecibe);
    this.nuevobien.controls['observaciones'].setValue(data.observaciones);
    this.nuevobien.controls['cantidad'].setValue(data.cantidad);
    this.nuevobien.controls['foto'].setValue(data.foto);
    this.nuevobien.controls['bandera'].setValue('1');
    
  });
  //this.open();
}

open() {
  //limpia cache
 this.nuevobien.reset();
  this.nuevobien.controls["idbien"].setValue("0");
  this.nuevobien.controls["bandera"].setValue("0");
  this.nuevobien.controls["color"].setValue("");
  this.nuevobien.controls["descripcion"].setValue("");
  this.nuevobien.controls["modelo"].setValue("");
  this.nuevobien.controls["tipoadquicicion"].setValue("");
  this.nuevobien.controls["idmarca"].setValue("");
  this.nuevobien.controls["idclasificacion"].setValue("");
  this.nuevobien.controls["idproveedor"].setValue("");
  this.nuevobien.controls['idresponsable'].setValue("");
  this.nuevobien.controls["estadoingreso"].setValue("");
  this.nuevobien.controls["plazopago"].setValue("");
  this.nuevobien.controls["prima"].setValue("");
  this.nuevobien.controls["cuotaasignada"].setValue("");
  this.nuevobien.controls["interes"].setValue("");
  this.nuevobien.controls["noformulario"].setValue("");
  this.nuevobien.controls["nofactura"].setValue("");
  this.nuevobien.controls["fechaingreso"].setValue("");
  this.nuevobien.controls["personaentrega"].setValue("");
  this.nuevobien.controls["personarecibe"].setValue("");
  this.nuevobien.controls["observaciones"].setValue("");
  this.nuevobien.controls["cantidad"].setValue("");
  this.nuevobien.controls["foto"].setValue("");
  this.display = 'block';

}

limpiar(){
  this.nuevobien.reset();
}
  noPuntoDecimal(control: FormControl) {
    if (control.value != null && control.value != '') {
      if ((<string>control.value.toString()).indexOf('.') > -1) {
        return { puntoDecimal: true };
      }
      return null;
    }
  }



}
