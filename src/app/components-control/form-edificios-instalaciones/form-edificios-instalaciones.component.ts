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
        estadoingreso: new FormControl('0'),
        tipoadquicicion: new FormControl('0'), //contado credito o donado
        idproveedor: new FormControl('0'),
        descripcion: new FormControl(''),
        idclasificacion: new FormControl('0'),
      //  idsucursal: new FormControl('0'),
        vidautil: new FormControl(''),
        valoradquicicion: new FormControl(''), //Costo
        plazopago: new FormControl(''),
        prima: new FormControl(''),
        cuotaasignada: new FormControl(''),
        interes: new FormControl(''),
        valorresidual: new FormControl(''),
        foto: new FormControl(''),
        personaentrega: new FormControl(''),
        personarecibe: new FormControl(''),
        observaciones: new FormControl(''),
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
