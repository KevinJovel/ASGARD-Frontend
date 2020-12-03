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
  selector: 'app-form-nuevo-bien',
  templateUrl: './form-nuevo-bien.component.html',
  styleUrls: ['./form-nuevo-bien.component.css'],
})
export class FormNuevoBienComponent implements OnInit {
  dataState: State; //hace referencia a la variable donde estan almacenados los datos
  //Variables para combos
  comboProvDon: any;
  clasificaciones: any;
  categorias: any;
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
  display3 = 'none'; //para ayuda
  displayProveedor = 'none';
  displayClasificacion = 'none';
  displayMarca = 'none';
  proveedores: FormGroup;
  clasificacion: FormGroup;
  proveedor: any;
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
  titulo2: string;
  titulo3: string;
  titulo4: string;
  idemp: Number = 0;
  edit: number = 0;
  ban: Number = 0; // para el change
  @Input() bandera = false; //agrego input para hacer uso delas dos funciones
  //Variables de etiqueta
  disabledPrima: string;
  disabledPlazo: string;
  disabledCuota: string;
  disabledInteres: string;
  disabledempleado: string;
  //@Output() clickOpen: EventEmitter<any>;
  constructor(
    private catalogoService: CatalogosService, private _cargarScript: CargarScriptsService, private controlService: ControlService,
    private activateRoute: ActivatedRoute, private router: Router, private stateService: StateService, private usuarioService: UsuarioService) {
    this._cargarScript.cargar(['/jquery.stepy', '/sortingTable']);

    //this.clickOpen = new EventEmitter();
    this.nuevobien = new FormGroup({
      idbien: new FormControl('0'),
      bandera: new FormControl('0'),
      tipoactivo: new FormControl('2'),
      color: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")]),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern("^[a-zA-Z0-9ñÑáéíóú ]+$")]),
      modelo: new FormControl('', [Validators.maxLength(30), Validators.pattern("^[a-zA-Z0-9.´´,#+° ]+$")]),
      tipoadquicicion: new FormControl('0', [Validators.required]), //contado credito o donado
      idmarca: new FormControl('0'),
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
      observaciones: new FormControl('', [Validators.maxLength(70), Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ., ]+$")]),
      cantidad: new FormControl('', [Validators.maxLength(2), Validators.pattern("^[0-9´´ ]+$")]),
      foto: new FormControl(''),
      idresponsable: new FormControl(''),
    });

    //Proveedores
    this.proveedores = new FormGroup({

      'idProveedor': new FormControl("0"),
      'bandera': new FormControl("0"),
      'nombre': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-z A-Z ñÑáÁéÉíÍóÓúÚ]+$")], this.noRepetirProveedor.bind(this)),
      'telefono': new FormControl("", [Validators.required, Validators.maxLength(9), this.validarIguales.bind(this)], this.noRepetirTelProveedor.bind(this)),
      'direccion': new FormControl("", [Validators.required, Validators.maxLength(100), Validators.pattern("^[a-z A-Z 0-9 ñÑáÁéÉíÍóÓúÚ #.°]+$")]),
      'rubro': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-z A-Z  ñÑáÁéÉíÍóÓúÚ]+$")]),
      'encargado': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-z A-Z ñÑáÁéÉíÍóÓúÚ]+$")], this.noRepetirEncargado.bind(this)),
      'telefonoencargado': new FormControl("", [Validators.required, Validators.maxLength(9), this.validarContraIguales.bind(this)], this.noRepetirTelEncargado.bind(this))
    });

    //Clasificación
    this.clasificacion = new FormGroup({
      'idclasificacion': new FormControl("0"),
      'bandera': new FormControl("0"),
      'clasificacion': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[-a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")], this.noRepetirClasificacion.bind(this)),
      'correlativo': new FormControl("", [Validators.required, Validators.maxLength(10), Validators.pattern("^[0-9-a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")], this.noRepetirCorrelativo.bind(this)),
      'descripcion': new FormControl("", [Validators.maxLength(100), Validators.pattern("^[a-zA-Z 0-9-ñÑ@.,#+?¿¡''!áéíóúÁÉÍÓÚ ]+$")]),
      'idcategoria': new FormControl("", [Validators.required])

    });

    //Marca
    this.marca = new FormGroup({
      'idMarca': new FormControl("0"),
      'bandera': new FormControl("0"),
      'marca': new FormControl("", [Validators.required, Validators.maxLength(25), Validators.pattern("^[a-zA-Z 0-9ÑñáéíóúÁÉÍÓÚ]+$")], this.noRepetirMarca.bind(this)),
      'descripcion': new FormControl("", [Validators.maxLength(100), Validators.pattern("^[a-zA-Z 0-9ÑñáéíóúÁÉÍÓÚ.]+$")])
    });

    //Mando el id para comparar si es nuevo ingreso o editar
    this.activateRoute.params.subscribe(parametro => {
      this.parametro = parametro["id"];
      if (this.parametro == "nuevo") {
        this.titulo = "Ingreso de nuevo activo";
      } else {
        this.titulo = "Edición de activo no asignado";
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
    if (this.parametro != "nuevo") {
      this.controlService.RecuperarBienNoAsignado(this.parametro).subscribe(param => {
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
    this.catalogoService.listarCategoriaCombo().subscribe(data => { this.categorias = data });
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
        //condición para validar si el valor residual es mayor al costo
        var vResidual = this.nuevobien.controls['valorresidual'].value;
        var vCosto = this.nuevobien.controls['valoradquicicion'].value;
        if (vResidual > vCosto) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '¡ERROR!',
            text: '¡El valor residual es mayor al costo!',
            showConfirmButton: false,
            timer: 3000
          })
        } else {

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
                    title: '¡Activo Guardado con éxito!',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: '¡OK!',
                  }).then((result) => {
                    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Guardó un activo en el sistema.`).subscribe();
                    this.router.navigate(['./registro-activos/tangibles']);
                  });
                } else {
                  Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: '¡Error!',
                    text: 'Ocurrió un error al registrar el activo',
                    showConfirmButton: false,
                    timer: 3000,
                  });
                  this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó guardar un activo en el sistema.`).subscribe();
                }
              });
            }
          });

        }
      }
    } else {
      //Editar
      this.nuevobien.controls["bandera"].setValue("0");
      if (this.nuevobien.valid == true) {
        // console.log(this.nuevobien.value);
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
            this.controlService.modificarBien(this.nuevobien.value).subscribe((res) => {
              if (res == 1) {
                Swal.fire({
                  title: '¡Registro modificado con éxito!',
                  icon: 'success',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: '¡OK!',
                }).then((result) => {
                  this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Modificó un activo en el sistema.`).subscribe();
                  this.router.navigate(['./registro-activos/tangibles']);
                });
              } else {
                Swal.fire({
                  position: 'center',
                  icon: 'warning',
                  title: '¡Ocurrió un error al modificar el registro!',
                  showConfirmButton: false,
                  timer: 3000,
                });
                this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó modificar un activo intangible en el sistema.`).subscribe();
              }
            })
          }
          else {
            //No modifica
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: '¡Ocurrió un error al modificar el registro!',
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
        this.router.navigate(["./registro-activos/tangibles"]);
      }

    });

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

  limpiar() {
    this.nuevobien.reset();
  }

  //Métodos para proveedores
  openProveedor() {
    //limpia cache
    this.titulo2 = "Formulario proveedor";
    this.proveedores.controls["idProveedor"].setValue("0");
    this.proveedores.controls["bandera"].setValue("0");
    this.proveedores.controls["nombre"].setValue("");
    this.proveedores.controls["telefono"].setValue("");
    this.proveedores.controls["direccion"].setValue("");
    this.proveedores.controls["rubro"].setValue("");
    this.proveedores.controls["encargado"].setValue("");
    this.proveedores.controls["telefonoencargado"].setValue("");
    this.displayProveedor = 'block';
  }
  closeProveedor() {
    this.displayProveedor = 'none';
  }

  guardarProveedor() {
    if ((this.proveedores.controls["bandera"].value) == "0") {
      if (this.proveedores.valid == true) {
        this.catalogoService.agregarProveedor(this.proveedores.value).subscribe(data => {
          //    this.catalogoService.getProveedores().subscribe(res => { this.proveedor = res });
          this.controlService.listarComboProveedor().subscribe((res) => {
            this.comboProvDon = res;
          });
        });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro guardado con éxito',
          showConfirmButton: false,
          timer: 3000
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Guardó un proveedor en el sistema.`).subscribe();
      }
    }
    this.proveedores.controls["idProveedor"].setValue("0");
    this.proveedores.controls["bandera"].setValue("0");
    this.proveedores.controls["nombre"].setValue("");
    this.proveedores.controls["telefono"].setValue("");
    this.proveedores.controls["direccion"].setValue("");
    this.proveedores.controls["rubro"].setValue("");
    this.proveedores.controls["encargado"].setValue("");
    this.proveedores.controls["telefonoencargado"].setValue("");

    this.displayProveedor = 'none';
    this.controlService.listarComboProveedor().subscribe((res) => {
      this.comboProvDon = res;
    });
  }

  noRepetirProveedor(control: FormControl) {

    var promesa = new Promise((resolve, reject) => {

      if (control.value != "" && control.value != null) {

        this.catalogoService.validarProveedor(this.proveedores.controls["idProveedor"].value, control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExisteProveedor: true });
            } else {
              resolve(null);
            }
          });
      }
    });

    return promesa;
  }

  noRepetirEncargado(control: FormControl) {

    var promesa = new Promise((resolve, reject) => {

      if (control.value != "" && control.value != null) {

        this.catalogoService.validarEncargado(this.proveedores.controls["idProveedor"].value, control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExisteEncargado: true });
            } else {
              resolve(null);
            }
          });
      }
    });

    return promesa;
  }

  noRepetirTelProveedor(control: FormControl) {

    var promesa = new Promise((resolve, reject) => {

      if (control.value != "" && control.value != null) {

        this.catalogoService.validarTelProveedor(this.proveedores.controls["idProveedor"].value, control.value)
          .subscribe(data => {

            if (data == 1) {
              resolve({ yaExisteTelProveedor: true });
            } else {
              resolve(null);
            }
          });
      }
    });

    return promesa;
  }

  noRepetirTelEncargado(control: FormControl) {

    var promesa = new Promise((resolve, reject) => {

      if (control.value != "" && control.value != null) {

        this.catalogoService.validarTelEncargado(this.proveedores.controls["idProveedor"].value, control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExisteTelEncargado: true });
            } else {
              resolve(null);
            }
          });
      }
    });

    return promesa;
  }

  validarContraIguales(control: FormControl) {
    //con value sacamos el valor del control
    if (control.value != "" && control.value != null) {
      var aux: String = "";
      aux = control.value;
      if (aux.length == 9) {
        //console.log(control.value);
        if ((this.proveedores.controls["telefono"].value != aux)) {
          return null;
        } else {
          //todo esta bien
          return { noIguales: true };
        }
      }
    }
  }

  validarIguales(control: FormControl) {
    //con value sacamos el valor del control
    if (control.value != "" && control.value != null) {
      var aux: String = "";
      aux = control.value;
      if (aux.length == 9) {
        console.log(control.value);
        //si es diferente mandamos error devolviendo un objeto
        if ((this.proveedores.controls["telefonoencargado"].value != aux)) {
          return null;
        } else {
          //todo esta bien
          return { Iguales: true };
        }
      }
    }
  }

  //Métodos para clasificaciones
  openClasificacion() {
    //limpia cache
    this.titulo3 = "Formulario clasificación";
    this.clasificacion.controls["idclasificacion"].setValue("0");
    this.clasificacion.controls["bandera"].setValue("0");
    this.clasificacion.controls["clasificacion"].setValue("");
    this.clasificacion.controls["correlativo"].setValue("");
    this.clasificacion.controls["idcategoria"].setValue("");
    this.clasificacion.controls["descripcion"].setValue("");
    this.displayClasificacion = 'block';
  }
  closeClasificacion() {
    this.displayClasificacion = 'none';
    this.edit = 0;
  }

  guardarClasificacion() {
    if ((this.clasificacion.controls["bandera"].value) == "0") {
      if (this.clasificacion.valid == true) {
        this.catalogoService.guardarClasificacion(this.clasificacion.value).subscribe(data => {
          this.controlService.listarComboClasificacion().subscribe((data) => {
            this.clasificaciones = data;
          });
        });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Registro guardado con éxito!',
          showConfirmButton: false,
          timer: 3000
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Guardó una clasificación en el sistema.`).subscribe();
      }
    }
    this.clasificacion.controls["idclasificacion"].setValue("0");
    this.clasificacion.controls["bandera"].setValue("0");
    this.clasificacion.controls["clasificacion"].setValue("");
    this.clasificacion.controls["correlativo"].setValue("");
    this.clasificacion.controls["idcategoria"].setValue("");
    this.clasificacion.controls["descripcion"].setValue("");
    this.edit = 0;

    this.displayClasificacion = 'none';
    this.controlService.listarComboClasificacion().subscribe((data) => {
      this.clasificaciones = data;
    });

  }

  noRepetirCorrelativo(control: FormControl) {

    var promesa = new Promise((resolve, reject) => {

      if (control.value != "" && control.value != null) {

        this.catalogoService.validarCorrelativo(this.clasificacion.controls["idclasificacion"].value, control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExisteCorrelativo: true });
            } else {
              resolve(null);
            }

          })

      }


    });

    return promesa;
  }
  noRepetirClasificacion(control: FormControl) {

    var promesa = new Promise((resolve, reject) => {

      if (control.value != "" && control.value != null) {

        this.catalogoService.validarClasificacion(this.clasificacion.controls["idclasificacion"].value, control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExisteClasificacion: true });
            } else {
              resolve(null);
            }

          })

      }


    });

    return promesa;
  }

  //Métodos para marca
  openMarca() {
    //limpia cache
    this.titulo4 = "Formulario marca";
    this.marca.controls["idMarca"].setValue("0");
    this.marca.controls["bandera"].setValue("0");
    this.marca.controls["marca"].setValue("");
    this.marca.controls["descripcion"].setValue("");
    this.displayMarca = 'block';
  }
  closeMarca() {
    this.displayMarca = 'none';
  }

  guardarMarca() {
    if ((this.marca.controls["bandera"].value) == "0") {
      if (this.marca.valid == true) {
        this.catalogoService.setMarca(this.marca.value).subscribe(data => {
          this.controlService.listarComboMarca().subscribe((data) => {
            this.marcas = data;
          });
        });

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Registro Guardado con éxito!',
          showConfirmButton: false,
          timer: 3000
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Guardó una marca en el sistema.`).subscribe();
      }
    }
    this.marca.controls["idMarca"].setValue("0");
    this.marca.controls["bandera"].setValue("0");
    this.marca.controls["marca"].setValue("");
    this.marca.controls["descripcion"].setValue("");
    this.displayMarca = 'none';
    this.controlService.listarComboMarca().subscribe((data) => {
      this.marcas = data;
    });

  }

  noRepetirMarca(control: FormControl) {

    var promesa = new Promise((resolve, reject) => {

      if (control.value != "" && control.value != null) {

        this.catalogoService.validarExisteMarca(this.marca.controls["idMarca"].value, control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExisteMarca: true });
            } else {
              resolve(null);
            }

          })

      }


    });

    return promesa;
  }
  
  open3() { //para modal de ayuda
    this.display3 = 'block';
  }
  close2() { //para modal de ayuda
    this.display3 = "none";
  }


}
