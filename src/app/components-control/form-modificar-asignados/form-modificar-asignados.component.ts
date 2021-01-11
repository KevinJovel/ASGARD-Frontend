import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CatalogosService } from './../../services/catalogos.service';
import { UsuarioService } from './../../services/usuario.service';
import { ControlService } from './../../services/control.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CargarScriptsService } from './../../services/cargar-scripts.service';
import Swal from 'sweetalert2';
declare var jQuery: any;
declare var $;
//para compartir parametros de diferentes componentess
import { State, StateService } from './../../services/state.service';

@Component({
  selector: 'app-form-modificar-asignados',
  templateUrl: './form-modificar-asignados.component.html',
  styleUrls: ['./form-modificar-asignados.component.css']
})
export class FormModificarAsignadosComponent implements OnInit {

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
  disabledd: boolean;
  donaprov = false; //utilizo boolean para recuperar doannte o prov
  comboAreaSucur: any;
  empleado: any;
  lista: any;
  parametro: string;
  //Para la fecha
  fechaMaxima: any;
  fechaMinima: any;
  anio: string;
  //fechaa=Date.now();
  lista2: any;
  emple: boolean;//para el disabley enable del editar
  titulo: string;
  idemp: Number = 0;
  ban: Number = 0; // para el change
  @Input() bandera = false; //agrego input para hacer uso delas dos funciones
  //Variables de etiqueta
  disabledPrima: string;
  disabledPlazo: string;
  disabledCuota: string;
  disabledInteres: string;
  disabledempleado: string;

  edit: number = 0;

  constructor(private catalogoService: CatalogosService, private _cargarScript: CargarScriptsService, private controlService: ControlService,
    private activateRoute: ActivatedRoute, private router: Router, private stateService: StateService, private usuarioService: UsuarioService) {

    this._cargarScript.cargar(['/jquery.stepy', '/sortingTable']);
    this.nuevobien = new FormGroup({
      idbien: new FormControl('0'),
      bandera: new FormControl('0'),
      tipoactivo: new FormControl('2'),
      color: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")]),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern("^[a-zA-Z0-9ñÑáéíóú ]+$")]),
      modelo: new FormControl('', [Validators.maxLength(30), Validators.pattern("^[a-zA-Z0-9.´´,#+° ]+$")]),
      tipoadquicicion: new FormControl('0', [Validators.required]), //contado credito o donado
      idmarca: new FormControl('0'),
      noserie: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      idclasificacion: new FormControl('0', [Validators.required]),
      idproveedor: new FormControl('0', [Validators.required]),
      estadoingreso: new FormControl('0', [Validators.required]),
      valoradquicicion: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern("^[0-9.´´ ]+$")]),
      plazopago: new FormControl('', [Validators.maxLength(2), Validators.pattern("^[0-9´´ ]+$")]),
      prima: new FormControl('', [Validators.maxLength(7), Validators.pattern("^[0-9.´´ ]+$")]),
      cuotaasignada: new FormControl('', [Validators.maxLength(7), Validators.pattern("^[0-9.´´ ]+$")]),
      interes: new FormControl('', [Validators.maxLength(2), Validators.pattern("^[0-9´´ ]+$")]),
      noformulario: new FormControl('0'),
      nofactura: new FormControl('', [Validators.maxLength(30), Validators.pattern("^[a-zA-Z0-9.´´,#+° ]+$")]),
      fechaingreso: new FormControl(''),
      personaentrega: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")]),
      personarecibe: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")]),
      valorresidual: new FormControl('', [Validators.maxLength(10), Validators.pattern("^[0-9.´´ ]+$")]),
      observaciones: new FormControl('', [Validators.maxLength(70), Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")]),
      cantidad: new FormControl('', [Validators.maxLength(2), Validators.pattern("^[0-9´´ ]+$")]),
      foto: new FormControl(''),
      idresponsable: new FormControl(''),
    });

    //Mando el id para comparar si es nuevo ingreso o editar
    this.activateRoute.params.subscribe(parametro => {
      this.parametro = parametro["id"];
      if (this.parametro == "nuevo") {
        this.titulo = "Ingreso de nuevo activo";
      } else {
        this.titulo = "Edición de activo asignado";
      }
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
    var disa = this.nuevobien.controls['idresponsable'].value;//evaluo si es cero
    if (disa == 0) {
      this.emple = true;// si es cero lo desabilito
      // this.titulo = "Ingreso de nuevo activo";
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

    this.controlService.getActivosSinAsignar().subscribe((data) => { this.lista2 = data; });
    this.controlService.getBienesAsignados().subscribe((data) => { this.lista = data; });

    //Método para recuperar año
    this.controlService.mostrarAnio().subscribe((res) => {
      this.fechaMaxima = `${res.anio}-12-31`;
      this.fechaMinima = `${(res.anio).toString()}-01-01`;
    });

    //Recuperación de información
    this.controlService.noEditarfecha(this.parametro).subscribe(data => {
      if (data == 1) {
        this.edit = 1;
      }
      if (this.parametro != "nuevo") {
        this.controlService.recuperarActivoAsignado(this.parametro).subscribe(param => {
          //Valores
          this.nuevobien.controls["idbien"].setValue(param.idbien);
          this.nuevobien.controls['bandera'].setValue('1');
          this.nuevobien.controls['color'].setValue(param.color);
          this.nuevobien.controls['descripcion'].setValue(param.descripcion);
          this.nuevobien.controls['modelo'].setValue(param.modelo);
          this.nuevobien.controls['tipoadquicicion'].setValue(param.tipoadquicicion);
          this.nuevobien.controls['idmarca'].setValue(param.idmarca);
          this.nuevobien.controls['noserie'].setValue(param.noserie);
          this.nuevobien.controls['idclasificacion'].setValue(param.idclasificacion);
          //Validacion para cambiar si es proveedor o donantes
          if (param.isProvDon == 1) {
            this.tipocombo = "Proveedor:";
            this.controlService.listarComboProveedor().subscribe((res) => {
              this.comboProvDon = res;
            });
            this.nuevobien.controls['idproveedor'].setValue(param.idproveedor);
          } else {
            this.tipocombo = "Donante:";
            this.controlService.listarComboDonante().subscribe((res) => {
              this.comboProvDon = res;
            });
            this.nuevobien.controls['idproveedor'].setValue(param.iddonante);
          }
          //Validación para crédito
          if (param.tipoadquicicion == 1 || param.tipoadquicicion == 3) {
            this.disabled = true;
            this.disabledPrima = 'Inhabilitado';
            this.disabledPlazo = 'Inhabilitado';
            this.disabledCuota = 'Inhabilitado';
            this.disabledInteres = 'Inhabilitado';

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
          this.nuevobien.controls['noformulario'].setValue(param.noformularioactivo);
          this.nuevobien.controls['nofactura'].setValue(param.nofactura);
          this.nuevobien.controls['fechaingreso'].setValue(param.fechaingreso);
          this.nuevobien.controls['personaentrega'].setValue(param.personaentrega);
          this.nuevobien.controls['personarecibe'].setValue(param.personarecibe);
          this.nuevobien.controls['observaciones'].setValue(param.observaciones);
          this.nuevobien.controls['cantidad'].setValue(param.cantidad);

          if (param.foto == null) {
            this.foto = "";
          } else {
            this.foto = param.foto;
          }

          //Para desbilitar la cantidad
          this.disabledd = true;

        })
      }
    });

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
    //Le agrego una bandera para englobar los datos y verificar si fueron ingresados o no en el formulario
    if (this.nuevobien.controls['bandera'].value == '0') {
      if (this.nuevobien.valid == true) {
        this.controlService.agregarFormIngreso(this.nuevobien.value).subscribe((data) => {
          //Creo esta condicion, si es contado o donado mando valor 0 sino ingresa lo de credito
          var tip = this.nuevobien.controls['tipoadquicicion'].value;
          var valorR = this.nuevobien.controls['valorresidual'].value;
          if (tip == 1 || tip == 3) {
            this.nuevobien.controls['prima'].setValue('0');
            this.nuevobien.controls['plazopago'].setValue('0');
            this.nuevobien.controls['cuotaasignada'].setValue('0');
            this.nuevobien.controls['interes'].setValue('0');
          } else {
          }
          if (valorR == '') {
            this.nuevobien.controls['valorresidual'].setValue('0');
          }
          //Pasamos la foto
          this.nuevobien.controls['foto'].setValue(this.foto);

          if (data == 1) {
            this.controlService.agregarBien(this.nuevobien.value).subscribe((res) => {
              if (res == 1) {
                Swal.fire({
                  title: '¡Registro guardado con éxito!',
                  icon: 'success',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: '¡OK!',
                }).then((result) => {
                  this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Modificó un activo en el sistema.`).subscribe();
                  this.router.navigate(['./registro-activos/ver']);
                });
              } else {
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  text: 'Ocurrió un error al registrar el activo',
                  showConfirmButton: false,
                  timer: 3000,
                });
                this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó modificar un activo en el sistema.`).subscribe();
              }
              this.edit = 0;
            });
          }
        });
      }
    } else {
      //Editar

      this.nuevobien.controls["bandera"].setValue("0");
      if (this.nuevobien.valid == true) {
        console.log(this.nuevobien.value);
        this.controlService.modificarFormIngreso(this.nuevobien.value).subscribe((data) => {
          if (data == 1) {
            //Creo esta condicion para modificar, si es contado o donado mando valor 0 sino ingresa lo de credito al modificar
            var tip = this.nuevobien.controls['tipoadquicicion'].value;
            var valorR = this.nuevobien.controls['valorresidual'].value;
            if (tip == 1 || tip == 3) {
              this.nuevobien.controls['prima'].setValue('0');
              this.nuevobien.controls['plazopago'].setValue('0');
              this.nuevobien.controls['cuotaasignada'].setValue('0');
              this.nuevobien.controls['interes'].setValue('0');
            } else {
            }
            if (valorR == '') {
              this.nuevobien.controls['valorresidual'].setValue('0');
            }
            //Pasamos la foto para modificarla
            this.nuevobien.controls['foto'].setValue(this.foto);
            console.log(this.nuevobien.value);
            this.controlService.modificarActivoAsignado(this.nuevobien.value).subscribe((res) => {
              if (res == 1) {
                Swal.fire({
                  title: '¡Registro modificado con éxito!',
                  icon: 'success',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: '¡OK!',
                }).then((result) => {
                  this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Modificó un activo en el sistema.`).subscribe();
                  this.router.navigate(['./registro-activos/ver']);
                });
              } else {
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  text: 'Ocurrió un error al registrar el activo',
                  showConfirmButton: false,
                  timer: 3000,
                });
                this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó modificar un activo en el sistema.`).subscribe();
              }
            })
            this.edit = 0;
          }
          else {
            //No modifica
            Swal.fire({
              position: 'center',
              icon: 'error',
              text: 'Ocurrió un error al registrar el activo',
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
      if (result.value) {
        this.router.navigate(["./registro-activos/ver"]);
      }
      this.edit = 0;
    });

  }


}
