import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CatalogosService } from './../../services/catalogos.service';
import { UsuarioService } from './../../services/usuario.service';
import { ControlService } from './../../services/control.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CargarScriptsService } from './../../services/cargar-scripts.service';
import Swal from 'sweetalert2';
//para compartir parametros de diferentes componentess

@Component({
  selector: 'app-form-edificios-instalaciones',
  templateUrl: './form-edificios-instalaciones.component.html',
  styleUrls: ['./form-edificios-instalaciones.component.css']
})
export class FormEdificiosInstalacionesComponent implements OnInit {
  //Variables
  activoEdiInsta: FormGroup;
  p: number = 1;
  id: any;
  foto: any;
  categorias: any;
  marca: FormGroup;
  proveedores: FormGroup;
  sucursal: FormGroup;
  clasificacion: FormGroup;
  display = 'none';
  display3 = 'none'; //para ayuda
  displayProveedor = 'none';
  displayClasificacion = 'none';
  displaySucursal = 'none';
  disabled: boolean;
  disabledd: boolean;
  donaprov = false; //utilizo boolean para recuperar doannte o prov
  comboAreaSucur: any;
  empleado: any;
  lista: any;
  parametro: string;
  titulo: string;
  titulo2: string;
  titulo3: string;
  titulo4: string;
  edit: number = 0;
  modif: number = 0;
  yaExiste: boolean = false;
  //Para la fecha
  fechaMaxima: any;
  fechaMinima: any;

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
  selectionDisable: string;

  constructor(private _cargarScript: CargarScriptsService, private controlService: ControlService,
    private activateRoute: ActivatedRoute, private router: Router, private catalogoService: CatalogosService, private usuarioService: UsuarioService) {
    this._cargarScript.cargar(['/jquery.stepy', '/sortingTable']);

    this.activoEdiInsta = new FormGroup({
      idbien: new FormControl('0'),
      bandera: new FormControl('0'),
      tipoactivo: new FormControl('1'),
      noformulario: new FormControl('0'),
      fechaingreso: new FormControl('', [Validators.required]),
      estadoingreso: new FormControl('', [Validators.required]),
      tipoadquicicion: new FormControl('', [Validators.required]), //contado credito o donado
      idproveedor: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern("^[a-zA-Z0-9ñÑáéíóú ]+$")]),
      idclasificacion: new FormControl('', [Validators.required]),
      idsucursal: new FormControl('0'),
      vidautil: new FormControl('', [Validators.required, Validators.maxLength(3), Validators.pattern("^[0-9´´ ]+$")]),
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

    //Sucursal
    this.sucursal = new FormGroup({
      'idSucursal': new FormControl("0"),
      'bandera': new FormControl("0"),
      'nombre': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-Z 0-9ÑñáéíóúÁÉÍÓÚ]+$")]),
      'ubicacion': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-Z 0-9Ññáéíóú,ÁÉÍÓÚ#,.]+$")]),
      'correlativo': new FormControl("", [Validators.required, Validators.maxLength(10), Validators.pattern("^[a-zA-Z 0-9Ññ]+$")], this.noRepetirCorrelativoSucursal.bind(this))
    });

    //Mando el id para comparar si es nuevo ingreso o editar
    this.activateRoute.params.subscribe(parametro => {
      this.parametro = parametro["id"];
      if (this.parametro == "nuevo") {
        this.titulo = "Ingreso de edificios e instalaciones";
      } else {
        this.titulo = "Editar edificios e instalaciones";
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

    var idempleado = this.activoEdiInsta.controls['tipoadquicicion'].value;
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
        this.disabledd = true;
      } else {
        this.disabled = false;
        this.donaprov = true;
        this.disabledd = false;
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
      // this.controlService.listarComboDonante().subscribe((res) => {
      //   this.comboProvDon = res;
      // });
    }

    this.controlService.listarComboClasificacionEdi().subscribe((data) => {
      this.clasificaciones = data;
    });

    this.controlService.comboSucursal().subscribe((data) => {
      this.sucursales = data;
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
          this.activoEdiInsta.controls["idbien"].setValue(param.idbien);
          this.activoEdiInsta.controls['bandera'].setValue('1');
          this.activoEdiInsta.controls['descripcion'].setValue(param.descripcion);
          this.activoEdiInsta.controls['tipoadquicicion'].setValue(param.tipoadquicicion);
          this.activoEdiInsta.controls['idclasificacion'].setValue(param.idclasificacion);
          //Validacion para cambiar si es proveedor o donantes
          if (param.isProvDon == 1) {
            this.tipocombo = "Proveedor:";
            this.controlService.listarComboProveedor().subscribe((res) => {
              this.comboProvDon = res;
            });
            this.activoEdiInsta.controls['idproveedor'].setValue(param.idproveedor);
          } else {
            this.tipocombo = "Donante:";
            this.controlService.listarComboDonante().subscribe((res) => {
              this.comboProvDon = res;
            });
            this.activoEdiInsta.controls['idproveedor'].setValue(param.iddonante);
          }

          // console.log(this.comboProvDon);
          //Validación para crédito
          if (param.tipoadquicicion == 1 || param.tipoadquicicion == 3) {
            this.disabled = true;
            this.disabledPrima = 'Inhabilitado';
            this.disabledPlazo = 'Inhabilitado';
            this.disabledCuota = 'Inhabilitado';
            this.disabledInteres = 'Inhabilitado';
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

          if (param.foto == null) {
            this.foto = "";
          } else {
            this.foto = param.foto;
          }
          //Para desbilitar la sucursal
          this.disabledd = true;
          this.selectionDisable = "--Inhabilitado--";
        });
      }
    });

    this.catalogoService.listarCategoriaCombo().subscribe(data => { this.categorias = data });
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
        //condición para validar si el valor residual es mayor al costo
        var vResidual = this.activoEdiInsta.controls['valorresidual'].value;
        var vCosto = this.activoEdiInsta.controls['valoradquicicion'].value;
        if (vResidual >= vCosto) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '¡ERROR!',
            text: '¡El valor residual es mayor al costo!',
            showConfirmButton: false,
            timer: 3000
          })
        } else {

          this.controlService.agregarFormIngreso(this.activoEdiInsta.value).subscribe((data) => {
            //Creo esta condicion, si es contado o donado mando valor 0 sino ingresa lo de credito
            var tip = this.activoEdiInsta.controls['tipoadquicicion'].value;
            var valorR = this.activoEdiInsta.controls['valorresidual'].value;
            if (tip == 1 || tip == 3) {
              this.activoEdiInsta.controls['prima'].setValue('0');
              this.activoEdiInsta.controls['plazopago'].setValue('0');
              this.activoEdiInsta.controls['cuotaasignada'].setValue('0');
              this.activoEdiInsta.controls['interes'].setValue('0');
            } else {
            }
            if (valorR == '') {
              this.activoEdiInsta.controls['valorresidual'].setValue('0');
            }
            //Pasamos la foto
            this.activoEdiInsta.controls['foto'].setValue(this.foto);

            if (data == 1) {
              this.controlService.agregarBien(this.activoEdiInsta.value).subscribe((res) => {
                if (res == 1) {
                  Swal.fire({
                    title: '¡Activo guardado con éxito!',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: '¡OK!',
                  }).then((result) => {
                    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Guardó un activo edificio en el sistema.`).subscribe();
                    this.router.navigate(['./registro-activos/edificios']);
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
                  this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó guardar un activo edificio en el sistema.`).subscribe();
                }
                this.edit = 0;
              });
            }
          });
        }
      }
    } else {
      //Editar
      this.activoEdiInsta.controls["bandera"].setValue("0");
      if (this.activoEdiInsta.valid == true) {
        console.log(this.activoEdiInsta.value);
        this.controlService.modificarFormIngreso(this.activoEdiInsta.value).subscribe((data) => {
          if (data == 1) {
            //Creo esta condicion para modificar, si es contado o donado mando valor 0 sino ingresa lo de credito al modificar
            var tip = this.activoEdiInsta.controls['tipoadquicicion'].value;
            var valorR = this.activoEdiInsta.controls['valorresidual'].value;
            if (tip == 1 || tip == 3) {
              this.activoEdiInsta.controls['prima'].setValue('0');
              this.activoEdiInsta.controls['plazopago'].setValue('0');
              this.activoEdiInsta.controls['cuotaasignada'].setValue('0');
              this.activoEdiInsta.controls['interes'].setValue('0');
            } else {
            }
            if (valorR == '') {
              this.activoEdiInsta.controls['valorresidual'].setValue('0');
            }
            //Pasamos la foto para modificarla
            this.activoEdiInsta.controls['foto'].setValue(this.foto);
            this.controlService.modificarEdificiosInstalaciones(this.activoEdiInsta.value).subscribe((res) => {
              if (res == 1) {
                Swal.fire({
                  title: '¡Registro modificado con éxito!',
                  icon: 'success',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: '¡OK!',
                }).then((result) => {
                  this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Modificó un activo edificio en el sistema.`).subscribe();
                  this.router.navigate(['./registro-activos/edificios']);
                });
              } else {
                Swal.fire({
                  position: 'center',
                  icon: 'warning',
                  title: '¡Ocurrió un error al modificar el registro!',
                  showConfirmButton: false,
                  timer: 3000,
                });
                this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó modificar un activo edificio en el sistema.`).subscribe();
              }
            })
            this.edit = 0;
          } else {
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
        this.router.navigate(["./registro-activos/edificios"]);
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
          this.controlService.listarComboClasificacionEdi().subscribe((data) => {
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

  //Métodos para sucursal
  openSucursal() {
    //limpia cache
    this.titulo4 = "Formulario sucursal";
    this.sucursal.controls["idSucursal"].setValue("0");
    this.sucursal.controls["bandera"].setValue("0");
    this.sucursal.controls["nombre"].setValue("");
    this.sucursal.controls["ubicacion"].setValue("");
    this.sucursal.controls["correlativo"].setValue("");
    this.displaySucursal = 'block';
  }
  closeSucursal() {
    this.displaySucursal = 'none';
    this.modif = 0;
    this.yaExiste = false;
  }

  validar() {
    if (this.sucursal.controls["nombre"].value != "" && this.sucursal.controls["ubicacion"].value != "") {
      this.catalogoService.validarSucursalUbicacion(this.sucursal.controls["idSucursal"].value, this.sucursal.controls["nombre"].value, this.sucursal.controls["ubicacion"].value)
        .subscribe(data => {
          if (data == 1) {
            this.yaExiste = true;
          } else {
            this.yaExiste = false;
          }
        });
    }
  }

  noRepetirCorrelativoSucursal(control: FormControl) {

    var promesa = new Promise((resolve, reject) => {

      if (control.value != "" && control.value != null) {

        this.catalogoService.validarCorrelativoSucursal(this.sucursal.controls["idSucursal"].value, control.value)
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

  guardarSucursal() {
    //Si la vandera es cero que es el que trae por defecto en el metodo open() entra en la primera a insertar
    if ((this.sucursal.controls["bandera"].value) == "0") {
      if (this.sucursal.valid == true) {
        this.catalogoService.setSucursal(this.sucursal.value).subscribe(data => {
          this.controlService.comboSucursal().subscribe((data) => {
            this.sucursales = data;
          });
          this.display = 'none';
        });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Registro guardado con éxito!',
          showConfirmButton: false,
          timer: 3000
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Guardó una sucursal en el sistema.`).subscribe();
      }
    }
    this.sucursal.controls["idSucursal"].setValue("0");
    this.sucursal.controls["bandera"].setValue("0");
    this.sucursal.controls["nombre"].setValue("");
    this.sucursal.controls["ubicacion"].setValue("");
    this.sucursal.controls["correlativo"].setValue("");
    this.displaySucursal = 'none';
    this.modif = 0;
    this.controlService.comboSucursal().subscribe((data) => {
      this.sucursales = data;
    });
  }
  open3() { //para modal de ayuda
    this.display3 = 'block';
  }
  close2() { //para modal de ayuda
    this.display3 = "none";
  }

}
