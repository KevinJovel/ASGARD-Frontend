import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CatalogosService } from './../../services/catalogos.service';
import { ControlService } from './../../services/control.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CargarScriptsService } from './../../services/cargar-scripts.service';
import Swal from 'sweetalert2';
declare var jQuery: any;
declare var $;

@Component({
  selector: 'app-form-activo-intangible',
  templateUrl: './form-activo-intangible.component.html',
  styleUrls: ['./form-activo-intangible.component.css']
})
export class FormActivoIntangibleComponent implements OnInit {
  //Variables
  activoIntangible: FormGroup;
  p:number=1;
  id: any;
  foto: any;
  display = 'none';
  disabled: boolean;
  disabledd: boolean;
  edit: number = 0;
  donaprov = false; //utilizo boolean para recuperar doannte o prov
  

  //Para la fecha
  fechaMaxima: any;
  fechaMinima: any;

 parametro: string;
 titulo: string;

  //Variables para combos
  clasificaciones: any;
  areas: any;
  tipocombo: string;
  comboProvDon: any;

   //Variables de etiqueta
   disabledPrima: string;
   disabledPlazo: string;
   disabledCuota: string;
   disabledInteres: string;
   selectionDisable: string;

  constructor(private catalogosService: CatalogosService, private activateRoute: ActivatedRoute, private router: Router,
    private controlService:ControlService, private _cargarScript: CargarScriptsService) {
      this._cargarScript.cargar(['/jquery.stepy', '/sortingTable']);

    this.activoIntangible=new FormGroup({
      idbien: new FormControl('0'),
      bandera: new FormControl('0'),
      tipoactivo: new FormControl('3'),
      noformulario: new FormControl('0'),
      fechaingreso: new FormControl(''),
      tipoadquicicion: new FormControl('0',[Validators.required]), //contado o donado
      idclasificacion: new FormControl('0',[Validators.required]),
      idproveedor: new FormControl('0',[Validators.required]),
      idarea: new FormControl('0',[Validators.required]),
      descripcion: new FormControl('', [Validators.required,Validators.maxLength(100),Validators.pattern("^[a-zA-Z0-9ñÑáéíóú ]+$")]),
      vidautil: new FormControl('',[Validators.required,Validators.maxLength(2),Validators.pattern("^[0-9´´ ]+$")]),
      valoradquicicion: new FormControl('',[Validators.required,Validators.maxLength(10),Validators.pattern("^[0-9.´´ ]+$")]), //Costo
      plazopago: new FormControl('',[Validators.maxLength(2),Validators.pattern("^[0-9´´ ]+$")]),
      prima: new FormControl('',[Validators.maxLength(7),Validators.pattern("^[0-9.´´ ]+$")]),
      cuotaasignada: new FormControl('',[Validators.maxLength(7),Validators.pattern("^[0-9.´´ ]+$")]),
      interes: new FormControl('',[Validators.maxLength(2),Validators.pattern("^[0-9´´ ]+$")]),
      valorresidual: new FormControl('',[Validators.maxLength(10),Validators.pattern("^[0-9.´´ ]+$")]),
      foto: new FormControl(''),
      personaentrega: new FormControl('',[Validators.required, Validators.maxLength(50),Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")]),
      personarecibe: new FormControl('',[Validators.required, Validators.maxLength(50),Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")]),
      observaciones: new FormControl('',[Validators.maxLength(70),Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")]),

    });

    //Mando el id para comparar si es nuevo ingreso o editar
    this.activateRoute.params.subscribe(parametro => {
      this.parametro=parametro["id"];
      if(this.parametro=="nuevo") {
        this.titulo="Ingreso de activo intangible";
      } else {
        this.titulo="Editar activo intangible";
      }
  });

   }

  ngOnInit() {
    this.tipocombo = 'Proveedor o Donante:';
    this.disabledPrima = 'Ingrese prima';
    this.disabledPlazo = 'Ingrese plazo';
    this.disabledCuota = 'Ingrese cuota';
    this.disabledInteres = 'Ingrese interes';
    this.selectionDisable="--Seleccione--";

    var idempleado = this.activoIntangible.controls['tipoadquicicion'].value;
    if (idempleado == 1 || idempleado == 2) {
      this.tipocombo = 'Proveedor:';
      this.disabledPrima = 'Inhabilitado';
      this.disabledPlazo = 'Inhabilitado';
      this.disabledCuota = 'Inhabilitado';
      this.disabledInteres = 'Inhabilitado';
      this.selectionDisable="--Inhabilitado--";
      if (idempleado == 1) {
        this.disabled = true;
        this.donaprov = true;
      } else {
        this.disabled = false;
        this.donaprov = true;
        this.disabledPrima = 'Ingrese prima';
        this.disabledPlazo = 'Ingrese plazo';
        this.disabledCuota = 'Ingrese cuota';
        this.disabledInteres = 'Ingrese interes';
        this.selectionDisable="--Seleccione--";
      }
      this.controlService.listarComboProveedor().subscribe((res) => {
        this.comboProvDon = res;
      });
    } else {
      this.disabled = true;
      this.donaprov = false;
      this.tipocombo = 'Donante:';
      this.controlService.listarComboDonante().subscribe((res) => {
        this.comboProvDon = res;
      });
    }

    

    this.controlService.listarComboClasificacionIntan().subscribe((data) => {
      this.clasificaciones=data;
    });

    //Combo para área de negocio
    this.controlService.listarComboArea().subscribe((data) => {
      this.areas=data;
    });

     //Método para recuperar año
     this.controlService.mostrarAnio().subscribe((res)=> {
      this.fechaMaxima=`${res.anio}-12-31`;
      this.fechaMinima=`${(res.anio-10).toString()}-01-01`;
    });

    //Recuperación de información
    this.controlService.noEditarfecha(this.parametro).subscribe(data => {
      if (data == 1) {
        this.edit = 1;
      }
    if(this.parametro!="nuevo") {
      this.controlService.RecuperarEdificiosInstalaciones(this.parametro).subscribe(param=>{
        //Valores
        this.activoIntangible.controls["idbien"].setValue(param.idbien);
        this.activoIntangible.controls['bandera'].setValue('1');
        this.activoIntangible.controls['descripcion'].setValue(param.descripcion);
        this.activoIntangible.controls['tipoadquicicion'].setValue(param.tipoadquicicion);
        this.activoIntangible.controls['idclasificacion'].setValue(param.idclasificacion);
        //Validacion para cambiar si es proveedor o donantes
         if(param.isProvDon==1) {
            this.tipocombo="Proveedor:";
            this.controlService.listarComboProveedor().subscribe((res) => {
              this.comboProvDon = res;
            });
            this.activoIntangible.controls['idproveedor'].setValue(param.idproveedor);
         } else {
            this.tipocombo="Donante:";
            this.controlService.listarComboDonante().subscribe((res) => {
              this.comboProvDon = res;
            });
            this.activoIntangible.controls['idproveedor'].setValue(param.iddonante);
        }
        //Validación para crédito
          if (param.tipoadquicicion == 1 || param.tipoadquicicion == 3) {
            this.disabled = true;
          } else {
            this.disabled = false;
            this.activoIntangible.controls['plazopago'].setValue(param.plazopago);
            this.activoIntangible.controls['prima'].setValue(param.prima);
            this.activoIntangible.controls['cuotaasignada'].setValue(param.cuotaasignada);
            this.activoIntangible.controls['interes'].setValue(param.interes);
          }
        
        this.activoIntangible.controls['valorresidual'].setValue(param.valorresidual);
        this.activoIntangible.controls['vidautil'].setValue(param.vidautil);
        this.activoIntangible.controls['valoradquicicion'].setValue(param.valoradquicicion);
        this.activoIntangible.controls['noformulario'].setValue(param.noformularioactivo);
        this.activoIntangible.controls['fechaingreso'].setValue(param.fechaingreso);
        this.activoIntangible.controls['personaentrega'].setValue(param.personaentrega);
        this.activoIntangible.controls['personarecibe'].setValue(param.personarecibe);
        this.activoIntangible.controls['observaciones'].setValue(param.observaciones);
        
        
        if(param.foto==null) {
          this.foto="";
        } else {
          this.foto=param.foto;
        }

        //Para desbilitar el área
        this.disabledd = true;
        this.selectionDisable="--Inhabilitado--";
        
      })
    }
  });
  }

//Método para cargar combo al guardar los datos
ProveedorDonante() {
  var idempleado = this.activoIntangible.controls['tipoadquicicion'].value;
  
  if (idempleado == 1 || idempleado == 2) {
    this.tipocombo = 'Proveedor:';
    this.disabledPrima = 'Inhabilitado';
    this.disabledPlazo = 'Inhabilitado';
    this.disabledCuota = 'Inhabilitado';
    this.disabledInteres = 'Inhabilitado';
          this.activoIntangible.controls['prima'].setValue('');
          this.activoIntangible.controls['plazopago'].setValue('');
          this.activoIntangible.controls['cuotaasignada'].setValue('');
          this.activoIntangible.controls['interes'].setValue('');
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
    this.activoIntangible.controls['idproveedor'].setValue("");
  
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
       console.log(this.activoIntangible.value);
      //Le agrego una bandera para englobar los datos y verificar si fueron ingresados o no en el formulario
      if (this.activoIntangible.controls['bandera'].value == '0') {
        if (this.activoIntangible.valid == true) {
          this.controlService.agregarFormIngreso(this.activoIntangible.value).subscribe((data) => {
              //Creo esta condicion, si es contado o donado mando valor 0 sino ingresa lo de credito
            var tip = this.activoIntangible.controls['tipoadquicicion'].value;
            var valorR=this.activoIntangible.controls['valorresidual'].value;
            if(tip==1 || tip==3) {
              this.activoIntangible.controls['prima'].setValue('0');
              this.activoIntangible.controls['plazopago'].setValue('0');
              this.activoIntangible.controls['cuotaasignada'].setValue('0');
              this.activoIntangible.controls['interes'].setValue('0');
            } else{
            } 
            if(valorR =='') {
              this.activoIntangible.controls['valorresidual'].setValue('0');
            }
              //Pasamos la foto
              this.activoIntangible.controls['foto'].setValue(this.foto);
  
              if (data == 1) {
                this.controlService.agregarBien(this.activoIntangible.value).subscribe((res) => {
                    if (res == 1) {
                      Swal.fire({
                        title: '¡Registro Guardado con éxito!',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: '¡OK!',
                      }).then((result) => {                    
                          this.router.navigate(['./registro-activos/intangible']);         
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
                    this.edit = 0;
                  });
              }
            });
        }
      } else {
        //Editar
        this.activoIntangible.controls["bandera"].setValue("0");
        if(this.activoIntangible.valid==true) {
          console.log(this.activoIntangible.value);
          this.controlService.modificarFormIngreso(this.activoIntangible.value).subscribe((data) => {
            if(data==1) {
              //Creo esta condicion para modificar, si es contado o donado mando valor 0 sino ingresa lo de credito al modificar
            var tip = this.activoIntangible.controls['tipoadquicicion'].value;
            var valorR=this.activoIntangible.controls['valorresidual'].value;
            if(tip==1 || tip==3) {
              this.activoIntangible.controls['prima'].setValue('0');
              this.activoIntangible.controls['plazopago'].setValue('0');
              this.activoIntangible.controls['cuotaasignada'].setValue('0');
              this.activoIntangible.controls['interes'].setValue('0');
            } else{
            } 
            if(valorR =='') {
              this.activoIntangible.controls['valorresidual'].setValue('0');
            }
              //Pasamos la foto para modificarla
              this.activoIntangible.controls['foto'].setValue(this.foto);
              this.controlService.modificarEdificiosInstalaciones(this.activoIntangible.value).subscribe((res) => {
                if (res == 1) {
                  Swal.fire({
                    title: '¡Registro Modificado con éxito!',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: '¡OK!',
                  }).then((result) => {
                      this.router.navigate(['./registro-activos/intangible']);
                  });
                } else {
                  Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'No Modificó',
                    showConfirmButton: false,
                    timer: 3000,
                  });
                }
              })
              this.edit = 0;
            } else {
              //No modifica
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'No Modificó',
                showConfirmButton: false,
                timer: 3000,
              });
  
            }
          })
        }
        
  }
  }

  cancelar() {
    Swal.fire({
      title: '¿Seguro que quieres salir?',
      text: "¡Se perderán todos los datos que no hayas guardado!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.value) {
        this.router.navigate(["./registro-activos/intangible"]); 
      }
      this.edit = 0;
    });

  }


}
