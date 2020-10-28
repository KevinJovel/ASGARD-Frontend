import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CatalogosService } from './../../services/catalogos.service';
import { ControlService } from './../../services/control.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CargarScriptsService } from './../../services/cargar-scripts.service';
import Swal from 'sweetalert2';
declare var jQuery: any;
declare var $;
//para compartir parametros de diferentes componentess
import { State, StateService } from './../../services/state.service';

@Component({
  selector: 'app-form-edificios-instalaciones',
  templateUrl: './form-edificios-instalaciones.component.html',
  styleUrls: ['./form-edificios-instalaciones.component.css']
})
export class FormEdificiosInstalacionesComponent implements OnInit {
  //Variables
  activoEdiInsta: FormGroup;
  p: number=1;
  id: any;
  foto: any;
  marca: FormGroup;
  sucursal: FormGroup;
  display = 'none';
  disabled: boolean;
  donaprov = false; //utilizo boolean para recuperar doannte o prov
  comboAreaSucur:any;
  empleado : any;
  lista: any;
  parametro: string;
  titulo: string;

 //Para la fecha
 fecha = Date.now();

 //Variables para combos
 comboProvDon: any;
 clasificaciones: any;
 sucursales: any;
 tipocombo: string;
 marcas: any;

 //Variables de etiqueta
 disabledPrima: string;
 disabledPlazo: string;
 disabledCuota: string;
 disabledInteres: string;

  constructor(private catalogosService: CatalogosService,private _cargarScript: CargarScriptsService ,private catalogoService: CatalogosService, private controlService:ControlService,
    private activateRoute: ActivatedRoute,private router: Router) {
      this._cargarScript.cargar(['/jquery.stepy', '/sortingTable']);

      this.activoEdiInsta=new FormGroup({
        idbien: new FormControl('0'),
        bandera: new FormControl('0'),
        tipoactivo: new FormControl('1'),
        noformulario: new FormControl('0'),
        fechaingreso: new FormControl(''),
        estadoingreso: new FormControl('0',[Validators.required]),
        tipoadquicicion: new FormControl('0',[Validators.required]), //contado credito o donado
        idproveedor: new FormControl('0',[Validators.required]),
        descripcion: new FormControl('', [Validators.required,Validators.maxLength(100),Validators.pattern("^[a-zA-Z0-9ñÑáéíóú ]+$")]),
        idclasificacion: new FormControl('0',[Validators.required]),
       idsucursal: new FormControl('0'),
        vidautil: new FormControl('',[Validators.required,Validators.maxLength(3),Validators.pattern("^[0-9´´ ]+$")]),
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
        this.titulo="Ingreso de Edificios e Instalaciones";
      } else {
        this.titulo="Editar Edificios e Instalaciones"; 
      }
  });

     }

  ngOnInit(){
    this.tipocombo = 'Proveedor o Donante:';
    this.disabledPrima = 'Ingrese prima';
    this.disabledPlazo = 'Ingrese plazo';
    this.disabledCuota = 'Ingrese cuota';
    this.disabledInteres = 'Ingrese interes';

    var idempleado = this.activoEdiInsta.controls['tipoadquicicion'].value;
    if (idempleado == 1 || idempleado == 2) {
      this.tipocombo = 'Proveedor:';
      this.disabledPrima = 'Inhabilitado';
      this.disabledPlazo = 'Inhabilitado';
      this.disabledCuota = 'Inhabilitado';
      this.disabledInteres = 'Inhabilitado';
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

    this.controlService.listarComboClasificacionEdi().subscribe((data) => {
      this.clasificaciones=data;
    });

    this.controlService.comboSucursal().subscribe((data) => {
      this.sucursales=data;
    });

    //Recuperación de información
    if(this.parametro!="nuevo") {
      this.controlService.RecuperarEdificiosInstalaciones(this.parametro).subscribe(param=>{
        //Valores
        this.activoEdiInsta.controls["idbien"].setValue(param.idbien);
        this.activoEdiInsta.controls['bandera'].setValue('1');
        this.activoEdiInsta.controls['descripcion'].setValue(param.descripcion);
        this.activoEdiInsta.controls['tipoadquicicion'].setValue(param.tipoadquicicion);
        this.activoEdiInsta.controls['idclasificacion'].setValue(param.idclasificacion);
        //Validacion para cambiar si es proveedor o donantes
         if(param.isProvDon==1) {
            this.tipocombo="Proveedor:";
            this.controlService.listarComboProveedor().subscribe((res) => {
              this.comboProvDon = res;
            });
            this.activoEdiInsta.controls['idproveedor'].setValue(param.idproveedor);
         } else {
            this.tipocombo="Donante:";
            this.controlService.listarComboDonante().subscribe((res) => {
              this.comboProvDon = res;
            });
            this.activoEdiInsta.controls['idproveedor'].setValue(param.iddonante);
        }
        //Validación para crédito
          if (param.tipoadquicicion == 1 || param.tipoadquicicion == 3) {
            this.disabled = true;
          } else {
            this.disabled = false;
            this.activoEdiInsta.controls['plazopago'].setValue(param.plazopago);
            this.activoEdiInsta.controls['prima'].setValue(param.prima);
            this.activoEdiInsta.controls['cuotaasignada'].setValue(param.cuotaasignada);
            this.activoEdiInsta.controls['interes'].setValue(param.interes);
          }
        
        this.activoEdiInsta.controls['estadoingreso'].setValue(param.estadoingreso);
        this.activoEdiInsta.controls['valorresidual'].setValue(param.valorresidual);
        this.activoEdiInsta.controls['valoradquicicion'].setValue(param.valoradquicicion);
        this.activoEdiInsta.controls['noformulario'].setValue(param.noformularioactivo);
        this.activoEdiInsta.controls['fechaingreso'].setValue(param.fechaingreso);
        this.activoEdiInsta.controls['personaentrega'].setValue(param.personaentrega);
        this.activoEdiInsta.controls['personarecibe'].setValue(param.personarecibe);
        this.activoEdiInsta.controls['observaciones'].setValue(param.observaciones);
        this.activoEdiInsta.controls['vidautil'].setValue(param.vidautil);
        
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
    var idempleado = this.activoEdiInsta.controls['tipoadquicicion'].value;
    
    if (idempleado == 1 || idempleado == 2) {
      this.tipocombo = 'Proveedor:';
      this.disabledPrima = 'Inhabilitado';
      this.disabledPlazo = 'Inhabilitado';
      this.disabledCuota = 'Inhabilitado';
      this.disabledInteres = 'Inhabilitado';
            this.activoEdiInsta.controls['prima'].setValue('');
            this.activoEdiInsta.controls['plazopago'].setValue('');
            this.activoEdiInsta.controls['cuotaasignada'].setValue('');
            this.activoEdiInsta.controls['interes'].setValue('');
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
      this.activoEdiInsta.controls['idproveedor'].setValue("");
    
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
    if (this.activoEdiInsta.controls['bandera'].value == '0') {
      if (this.activoEdiInsta.valid == true) {
        this.controlService.agregarFormIngreso(this.activoEdiInsta.value).subscribe((data) => {
            //Creo esta condicion, si es contado o donado mando valor 0 sino ingresa lo de credito
          var tip = this.activoEdiInsta.controls['tipoadquicicion'].value;
          var valorR=this.activoEdiInsta.controls['valorresidual'].value;
          if(tip==1 || tip==3) {
            this.activoEdiInsta.controls['prima'].setValue('0');
            this.activoEdiInsta.controls['plazopago'].setValue('0');
            this.activoEdiInsta.controls['cuotaasignada'].setValue('0');
            this.activoEdiInsta.controls['interes'].setValue('0');
          } else{
          } 
          if(valorR =='') {
            this.activoEdiInsta.controls['valorresidual'].setValue('0');
          }
            //Pasamos la foto
            this.activoEdiInsta.controls['foto'].setValue(this.foto);

            if (data == 1) {
              this.controlService.agregarBien(this.activoEdiInsta.value).subscribe((res) => {
                  if (res == 1) {
                    Swal.fire({
                      title: '¡Registro Guardado con éxito!',
                      icon: 'success',
                      confirmButtonColor: '#3085d6',
                      confirmButtonText: '¡OK!',
                    }).then((result) => {                    
                        this.router.navigate(['./registro-activos/edificios']);         
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
}



}
