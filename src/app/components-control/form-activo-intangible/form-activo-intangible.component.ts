import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CatalogosService } from './../../services/catalogos.service';
import { UsuarioService } from './../../services/usuario.service';
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
  proveedores: FormGroup;
  clasificacion: FormGroup;
  p: number = 1;
  id: any;
  foto: any;
  areas: any;
  sucursales: any;
  area: FormGroup;
  categorias: any;
  display = 'none';
  display3 = 'none'; //para ayuda
  displayProveedor = 'none';
  displayClasificacion = 'none';
  displayArea = 'none';
  disabled: boolean;
  disabledd: boolean;
  edit: number = 0;
  yaExiste: boolean = false;
  donaprov = false; //utilizo boolean para recuperar doannte o prov
  modif: number = 0;


  //Para la fecha
  fechaMaxima: any;
  fechaMinima: any;

  parametro: string;
  titulo: string;
  titulo2: string;
  titulo3: string;
  titulo4: string;

  //Variables para combos
  clasificaciones: any;
  tipocombo: string;
  comboProvDon: any;

  //Variables de etiqueta
  disabledPrima: string;
  disabledPlazo: string;
  disabledCuota: string;
  disabledInteres: string;
  selectionDisable: string;

  constructor(private catalogosService: CatalogosService, private activateRoute: ActivatedRoute, private router: Router,
    private controlService: ControlService, private _cargarScript: CargarScriptsService, private usuarioService: UsuarioService) {
    this._cargarScript.cargar(['/jquery.stepy', '/sortingTable']);

    this.activoIntangible = new FormGroup({
      idbien: new FormControl('0'),
      bandera: new FormControl('0'),
      tipoactivo: new FormControl('3'),
      noformulario: new FormControl('0'),
      fechaingreso: new FormControl(''),
      tipoadquicicion: new FormControl('0', [Validators.required]), //contado o donado
      idclasificacion: new FormControl('0', [Validators.required]),
      idproveedor: new FormControl('0', [Validators.required]),
      idarea: new FormControl('0', [Validators.required]),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern("^[a-zA-Z0-9ñÑáéíóú ]+$")]),
      vidautil: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.pattern("^[0-9´´ ]+$")]),
      valoradquicicion: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern("^[0-9.´´ ]+$")]), //Costo
      plazopago: new FormControl('', [Validators.maxLength(2), Validators.pattern("^[0-9´´ ]+$")]),
      prima: new FormControl('', [Validators.maxLength(7), Validators.pattern("^[0-9.´´ ]+$")]),
      cuotaasignada: new FormControl('', [Validators.maxLength(7), Validators.pattern("^[0-9.´´ ]+$")]),
      interes: new FormControl('', [Validators.maxLength(2), Validators.pattern("^[0-9´´ ]+$")]),
      valorresidual: new FormControl('', [Validators.maxLength(10), Validators.pattern("^[0-9.´´ ]+$")]),
      foto: new FormControl(''),
      personaentrega: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")]),
      personarecibe: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")]),
      observaciones: new FormControl('', [Validators.maxLength(70), Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ., ]+$")]),

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

    //Área de negocio
    this.area = new FormGroup({
      'idAreaNegocio': new FormControl("0"),
      'bandera': new FormControl("0"),
      'nombre': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-Z 0-9ÑñáéíóúÁÉÍÓÚ]+$")]),
      'idSucursal': new FormControl("0", [Validators.required]),
      'correlativo': new FormControl("", [Validators.required, Validators.maxLength(10), Validators.pattern("^[a-zA-Z 0-9]+$")], this.noRepetirCorrelativoArea.bind(this))
    });

    //Mando el id para comparar si es nuevo ingreso o editar
    this.activateRoute.params.subscribe(parametro => {
      this.parametro = parametro["id"];
      if (this.parametro == "nuevo") {
        this.titulo = "Ingreso de activo intangible";
      } else {
        this.titulo = "Editar activo intangible";
      }
    });

  }

  ngOnInit() {
    this.tipocombo = 'Proveedor o Donante:';
    this.disabledPrima = 'Ingrese prima';
    this.disabledPlazo = 'Ingrese plazo';
    this.disabledCuota = 'Ingrese cuota';
    this.disabledInteres = 'Ingrese interes';
    this.selectionDisable = "--Seleccione--";

    var idempleado = this.activoIntangible.controls['tipoadquicicion'].value;
    if (idempleado == 1 || idempleado == 2) {
      this.tipocombo = 'Proveedor:';
      this.disabledPrima = 'Inhabilitado';
      this.disabledPlazo = 'Inhabilitado';
      this.disabledCuota = 'Inhabilitado';
      this.disabledInteres = 'Inhabilitado';
      this.selectionDisable = "--Inhabilitado--";
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
        this.selectionDisable = "--Seleccione--";
      }
      this.controlService.listarComboProveedor().subscribe((res) => {
        this.comboProvDon = res;
      });
    } else {
      this.disabled = true;
      this.donaprov = false;
      this.tipocombo = 'Donante:';
    }
    this.controlService.listarComboClasificacionIntan().subscribe((data) => {
      this.clasificaciones = data;
    });
    this.controlService.listarComboArea().subscribe((data) => {
      this.areas = data;
    });

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
        this.controlService.RecuperarEdificiosInstalaciones(this.parametro).subscribe(param => {
          //Valores
          this.activoIntangible.controls["idbien"].setValue(param.idbien);
          this.activoIntangible.controls['bandera'].setValue('1');
          this.activoIntangible.controls['descripcion'].setValue(param.descripcion);
          this.activoIntangible.controls['tipoadquicicion'].setValue(param.tipoadquicicion);
          this.activoIntangible.controls['idclasificacion'].setValue(param.idclasificacion);
          //Validacion para cambiar si es proveedor o donantes
          if (param.isProvDon == 1) {
            this.tipocombo = "Proveedor:";
            this.controlService.listarComboProveedor().subscribe((res) => {
              this.comboProvDon = res;
            });
            this.activoIntangible.controls['idproveedor'].setValue(param.idproveedor);
          } else {
            this.tipocombo = "Donante:";
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


          if (param.foto == null) {
            this.foto = "";
          } else {
            this.foto = param.foto;
          }

          //Para desbilitar el área
          this.disabledd = true;
          this.selectionDisable = "--Inhabilitado--";

        })
      }
    });
    this.catalogosService.listarCategoriaCombo().subscribe(data => { this.categorias = data });
    this.catalogosService.getAreas().subscribe(data => { this.areas = data });
    this.catalogosService.getComboSucursal().subscribe(data => { this.sucursales = data });
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
    //Le agrego una bandera para englobar los datos y verificar si fueron ingresados o no en el formulario
    if (this.activoIntangible.controls['bandera'].value == '0') {
      if (this.activoIntangible.valid == true) {
        //condición para validar si el valor residual es mayor al costo
        var vResidual = this.activoIntangible.controls['valorresidual'].value;
        var vCosto = this.activoIntangible.controls['valoradquicicion'].value;
        if (vResidual > vCosto) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '¡ERROR!',
            text: '¡El valor residual es mayor al costo!',
            showConfirmButton: false,
            timer: 3000
          });
        } else {
          this.controlService.agregarFormIngreso(this.activoIntangible.value).subscribe((data) => {

            //Creo esta condicion, si es contado o donado mando valor 0 sino ingresa lo de credito
            var tip = this.activoIntangible.controls['tipoadquicicion'].value;
            var valorR = this.activoIntangible.controls['valorresidual'].value;
            if (tip == 1 || tip == 3) {
              this.activoIntangible.controls['prima'].setValue('0');
              this.activoIntangible.controls['plazopago'].setValue('0');
              this.activoIntangible.controls['cuotaasignada'].setValue('0');
              this.activoIntangible.controls['interes'].setValue('0');
            } else {
            }
            if (valorR == '') {
              this.activoIntangible.controls['valorresidual'].setValue('0');
            }
            //Pasamos la foto
            this.activoIntangible.controls['foto'].setValue(this.foto);

            if (data == 1) {
              this.controlService.agregarBien(this.activoIntangible.value).subscribe((res) => {
                if (res == 1) {
                  Swal.fire({
                    title: '¡Activo guardado con éxito!',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: '¡OK!',
                  }).then((result) => {
                    this.router.navigate(['./registro-activos/intangible']);
                  });
                  this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Guardó un activo intangible en el sistema.`).subscribe();
                } else {
                  Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: '¡Error!',
                    text: 'Ocurrió un error al registrar el activo',
                    showConfirmButton: false,
                    timer: 3000,
                  });
                  this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó guardar un activo intangible en el sistema.`).subscribe();
                }
                this.edit = 0;
              });
            }
          });
        }
      }
    } else {
      //Editar
      this.activoIntangible.controls["bandera"].setValue("0");
      if (this.activoIntangible.valid == true) {
        console.log(this.activoIntangible.value);
        this.controlService.modificarFormIngreso(this.activoIntangible.value).subscribe((data) => {
          if (data == 1) {
            //Creo esta condicion para modificar, si es contado o donado mando valor 0 sino ingresa lo de credito al modificar
            var tip = this.activoIntangible.controls['tipoadquicicion'].value;
            var valorR = this.activoIntangible.controls['valorresidual'].value;
            if (tip == 1 || tip == 3) {
              this.activoIntangible.controls['prima'].setValue('0');
              this.activoIntangible.controls['plazopago'].setValue('0');
              this.activoIntangible.controls['cuotaasignada'].setValue('0');
              this.activoIntangible.controls['interes'].setValue('0');
            } else {
            }
            if (valorR == '') {
              this.activoIntangible.controls['valorresidual'].setValue('0');
            }
            //Pasamos la foto para modificarla
            this.activoIntangible.controls['foto'].setValue(this.foto);
            this.controlService.modificarEdificiosInstalaciones(this.activoIntangible.value).subscribe((res) => {
              if (res == 1) {
                Swal.fire({
                  title: '¡Activo modificado con éxito!',
                  icon: 'success',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: '¡OK!',
                }).then((result) => {
                  this.router.navigate(['./registro-activos/intangible']);
                });
                this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Modificó un activo intangible en el sistema.`).subscribe();
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
            this.edit = 0;
          } else {
            //No modifica
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: '¡Ocurrió un error al modificar el registro!',
              showConfirmButton: false,
              timer: 3000,
            });
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó modificar un activo intangible en el sistema.`).subscribe();
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
        this.router.navigate(["./registro-activos/intangible"]);
      }
      this.edit = 0;
    });

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
        this.catalogosService.agregarProveedor(this.proveedores.value).subscribe(data => {
          if (data == 1) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Registro guardado con éxito',
              showConfirmButton: false,
              timer: 3000
            });
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Guardó un proveedor en el sistema.`).subscribe();
            this.controlService.listarComboProveedor().subscribe((res) => {
              this.comboProvDon = res;
            });
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: '¡Ocurrió un error al guardar el registro!',
              showConfirmButton: false,
              timer: 3000
            });
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó guardar un proveedor en el sistema.`).subscribe();
          }
        });
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
        this.catalogosService.validarProveedor(this.proveedores.controls["idProveedor"].value, control.value)
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
        this.catalogosService.validarEncargado(this.proveedores.controls["idProveedor"].value, control.value)
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
        this.catalogosService.validarTelProveedor(this.proveedores.controls["idProveedor"].value, control.value)
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

        this.catalogosService.validarTelEncargado(this.proveedores.controls["idProveedor"].value, control.value)
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
        this.catalogosService.guardarClasificacion(this.clasificacion.value).subscribe(data => {
          this.controlService.listarComboClasificacionIntan().subscribe((data) => {
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
        this.catalogosService.validarCorrelativo(this.clasificacion.controls["idclasificacion"].value, control.value)
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

        this.catalogosService.validarClasificacion(this.clasificacion.controls["idclasificacion"].value, control.value)
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

  //Métodos área de negocio
  openArea() {
    this.titulo4 = "Formulario áreas de negocio"
    this.area.controls["idAreaNegocio"].setValue("0");
    this.area.controls["bandera"].setValue("0");
    this.area.controls["nombre"].setValue("");
    this.area.controls["idSucursal"].setValue("");
    this.area.controls["correlativo"].setValue("");
    this.displayArea = 'block';

  }

  closeArea() {
    this.displayArea = "none";
    this.yaExiste = false;
    this.modif = 0;
  }

  guardarArea() {
    if ((this.area.controls["bandera"].value) == "0") {
      if (this.area.valid == true) {
        this.catalogosService.setArea(this.area.value).subscribe(data => {
          this.controlService.listarComboArea().subscribe((data) => {
            this.areas = data;
          });
        });

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Registro guardado con éxito!',
          showConfirmButton: false,
          timer: 3000
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Guardó una área de negocios en el sistema.`).subscribe();
      }
    }
    this.area.controls["idAreaNegocio"].setValue("0");
    this.area.controls["bandera"].setValue("0");
    this.area.controls["nombre"].setValue("");
    this.area.controls["idSucursal"].setValue("");
    this.area.controls["correlativo"].setValue("");
    this.displayArea = 'none';
  }

  noRepetirCorrelativoArea(control: FormControl) {

    var promesa = new Promise((resolve, reject) => {

      if (control.value != "" && control.value != null) {

        this.catalogosService.validarCorrelativoArea(this.area.controls["idAreaNegocio"].value, control.value)
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

  validarArea() {
    if (this.area.controls["nombre"].value != "" && this.area.controls["idSucursal"].value != 0) {
      this.catalogosService.validarAreaSucursal(this.area.controls["idAreaNegocio"].value, this.area.controls["nombre"].value, this.area.controls["idSucursal"].value)
        .subscribe(data => {
          if (data == 1) {
            this.yaExiste = true;
          } else {
            this.yaExiste = false;
          }

        });
    }

  }
  open3() { //para modal de ayuda
    this.display3 = 'block';
  }
  close2() { //para modal de ayuda
    this.display3 = "none";
  }

}
