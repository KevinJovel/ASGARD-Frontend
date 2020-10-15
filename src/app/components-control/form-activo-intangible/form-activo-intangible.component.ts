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
  donaprov = false; //utilizo boolean para recuperar doannte o prov
  

  //Para la fecha
 fecha = Date.now();

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
   }

  ngOnInit() {
    this.tipocombo = 'Proveedor o Donante:';
    this.disabledPrima = 'Ingrese prima';
    this.disabledPlazo = 'Ingrese plazo';
    this.disabledCuota = 'Ingrese cuota';
    this.disabledInteres = 'Ingrese interes';

    var idempleado = this.activoIntangible.controls['tipoadquicicion'].value;
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

    this.controlService.listarComboClasificacionIntan().subscribe((data) => {
      this.clasificaciones=data;
    });

    //Combo para área de negocio
    this.controlService.listarComboArea().subscribe((data) => {
      this.areas=data;
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
                          this.router.navigate(['./tabla-activos']);         
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
