import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfiguracionService } from './../../services/configuracion.service';
import { CatalogosService } from './../../services/catalogos.service';
import { UsuarioService } from './../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-configuracion-inicio',
  templateUrl: './configuracion-inicio.component.html',
  styleUrls: ['./configuracion-inicio.component.css']
})
export class ConfiguracionInicioComponent implements OnInit {
  displaybienvenida = 'none';
  displayDatos = 'none';
  displaySucursal = 'none';
  displayAreas = 'none';
  displayEmpleado = 'none';
  displayUsuarios = 'none';
  cooperativa: FormGroup;
  logo: any;
  cooperativas: any;
  sucursal: FormGroup;
  titulo: string;
  area: FormGroup;
  sucursales: any;
  empleado: FormGroup;
  cargos: any;
  areas: any;
  usuario: FormGroup;
  tipoUsuarios: any;
  empleados: any;
  constructor(private configuracionService: ConfiguracionService, private catalogoService: CatalogosService, private usuarioService: UsuarioService, private router: Router) {

    this.cooperativa = new FormGroup({
      'idcooperativa': new FormControl("0"),
      'bandera': new FormControl("0"),
      'nombre': new FormControl("", [Validators.required, Validators.maxLength(35), Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ. ]+$")]),
      'logo': new FormControl(""),
      'anio': new FormControl("", [Validators.required]),
      'descripcion': new FormControl("", [Validators.required, Validators.maxLength(150), Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ,. ]+$")])
    });
    this.sucursal = new FormGroup({
      'idSucursal': new FormControl("0"),
      'bandera': new FormControl("0"),
      'nombre': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-Z 0-9ÑñáéíóúÁÉÍÓÚ]+$")]),
      'ubicacion': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-Z 0-9Ññáéíóú,ÁÉÍÓÚ#,.]+$")]),
      'correlativo': new FormControl("", [Validators.required, Validators.maxLength(5), Validators.pattern("^[a-zA-Z 0-9Ññ]+$")])
    });
    this.area = new FormGroup({
      'idAreaNegocio': new FormControl("0"),
      'bandera': new FormControl("0"),
      'nombre': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-Z 0-9ÑñáéíóúÁÉÍÓÚ]+$")]),
      'idSucursal': new FormControl("0", [Validators.required]),
      'correlativo': new FormControl("", [Validators.required, Validators.maxLength(5), Validators.pattern("^[a-zA-Z 0-9]+$")])
    });
    this.empleado = new FormGroup({
      'idempleado': new FormControl("0"),
      'bandera': new FormControl("0"),
      'dui': new FormControl("", [Validators.required]),
      'nombres': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")]),
      'apellidos': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[-a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")]),
      'direccion': new FormControl("", [Validators.required, Validators.maxLength(100), Validators.pattern("^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ.´´,#° ]+$")]),
      'telefono': new FormControl("", [Validators.required]),
      'telefonopersonal': new FormControl("", [Validators.required]),
      'idareadenegocio': new FormControl("", [Validators.required]),
      'idcargo': new FormControl("", [Validators.required]),
      'cargo': new FormControl(""),
      'idsucursal': new FormControl("")

    });
    this.usuario = new FormGroup(
      {

        'iidusuario': new FormControl("0"),
        'bandera': new FormControl("0"),
        'nombreusuario': new FormControl("", [Validators.required, Validators.maxLength(50)]),
        'contra': new FormControl("", [Validators.required, Validators.maxLength(30)]),
        'contra2': new FormControl("", [Validators.required, Validators.maxLength(30), this.validarContraIguales.bind(this)]),
        'iidEmpleado': new FormControl("", [Validators.required]),
        'iidTipousuario': new FormControl("")
      }
    );

  }

  ngOnInit(): void {
    this.displaybienvenida = 'block';
  }
  closeBienvenida() {
    this.displaybienvenida = 'none';
  }
  closeDatos() {
    this.displayDatos = 'none';
  }
  closeSucursal() {
    this.displaySucursal = 'none';
  }
  closeAreas() {
    this.displayAreas = 'none';
  }
  closeEmpleado() {
    this.displayEmpleado = 'none';
  }
  closeUsuarios() {
    this.displayUsuarios = 'none';
  }
  AceptarBienvenida() {
    this.displaybienvenida = 'none';
    let timerInterval
    Swal.fire({
      title: '¡Espera un momento!',
      html: 'Estamos preparando todo para ti',
      timer: 5000,
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          const content = Swal.getContent()
          if (content) {
            const b = content.querySelector('b')
            if (b) {
              Swal.getTimerLeft()
            }
          }
        }, 100)
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        this.usuarioService.validarCooperativasRegistradas().subscribe(res => {
          if (res != 1) {
            this.displayDatos = 'block';
          } else {
            this.usuarioService.validarSucursalesRegistradas().subscribe(res => {
              if (res != 1) {
                this.displaySucursal = 'block';
              } else {
                this.usuarioService.validarAreasRegistrados().subscribe(res => {
                  if (res != 1) {
                    this.catalogoService.getComboSucursal().subscribe(data => { this.sucursales = data });
                    this.displayAreas = 'block';
                  } else {
                    this.usuarioService.validarEmpleadosRegistrados().subscribe(res => {
                      if (res != 1) {
                        this.catalogoService.listarAreaCombo().subscribe(data => {
                          this.areas = data;
                        });
                        this.displayEmpleado = 'block';
                      } else {
                        this.usuarioService.listarEmpleadoCombo().subscribe(data => {
                          this.empleados = data;
                        });
                        this.usuarioService.listarTipoCombo().subscribe(data => {
                          this.tipoUsuarios = data;
                        });
                        this.displayUsuarios = 'block';
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    })



  }
  changeFoto() {
    var file = (<HTMLInputElement>document.getElementById("futFoto")).files[0];
    var fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.logo = fileReader.result;
    }

    fileReader.readAsDataURL(file);
  }

  guardarDatos() {

      if (this.cooperativa.valid==true) {
        if ((this.cooperativa.controls["bandera"].value) == "0") {
          //Pasamos la foto         
          this.cooperativa.controls["logo"].setValue(this.logo);
          if (this.cooperativa.valid == true) {
            this.configuracionService.setCooperativa(this.cooperativa.value).subscribe(data => {
              if (data == 1) {
                this.cooperativa.controls["idcooperativa"].setValue("0");
                this.cooperativa.controls["bandera"].setValue("0");
                this.cooperativa.controls["nombre"].setValue("");
                this.cooperativa.controls["logo"].setValue("");
                this.cooperativa.controls["anio"].setValue("");
                this.cooperativa.controls["descripcion"].setValue("");
                this.displayDatos = 'none';
                this.displaySucursal = 'block';
              }
            });
          }
        }
      }

  }
  guardarDatosSucursal() {
    //Si la vandera es cero que es el que trae por defecto en el metodo open() entra en la primera a insertar
    if (this.sucursal.valid == true) {
      this.catalogoService.setSucursal(this.sucursal.value).subscribe(data => {
        if (data == 1) {
          this.displaySucursal = 'none';
          this.sucursal.controls["idSucursal"].setValue("0");
          this.sucursal.controls["bandera"].setValue("0");
          this.sucursal.controls["nombre"].setValue("");
          this.sucursal.controls["ubicacion"].setValue("");
          this.sucursal.controls["correlativo"].setValue("");
          this.displaySucursal = 'none';
          this.catalogoService.getComboSucursal().subscribe(data => { this.sucursales = data });
          this.displayAreas='block';
        } else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title:'¡Ocurrio un error al guardar el registro!',
            showConfirmButton: false,
            timer: 3000
          })
        }
      });
    }
  }
  guardarDatosArea() {
    if (this.area.valid == true) {
      this.catalogoService.setArea(this.area.value).subscribe(data => {
        if (data == 1) {
          this.area.controls["idAreaNegocio"].setValue("0");
          this.area.controls["bandera"].setValue("0");
          this.area.controls["nombre"].setValue("");
          this.area.controls["idSucursal"].setValue("");
          this.area.controls["correlativo"].setValue("");
          this.displayAreas = 'none';
          this.catalogoService.listarAreaCombo().subscribe(data => {
            this.areas = data;
          });
          this.displayEmpleado = 'block';
        }else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title:'¡Ocurrio un error al guardar el registro!',
            showConfirmButton: false,
            timer: 3000
          })
        }
      });
    }
  }
  guardarDatosEmpleado() {
    if (this.empleado.valid == true) {
      this.catalogoService.guardarEmpleado(this.empleado.value).subscribe(data => {
        if (data == 1) {
          this.empleado.controls["idempleado"].setValue("0");
          this.empleado.controls["bandera"].setValue("0");
          this.empleado.controls["dui"].setValue("");
          this.empleado.controls["nombres"].setValue("");
          this.empleado.controls["apellidos"].setValue("");
          this.empleado.controls["direccion"].setValue("");
          this.empleado.controls["telefono"].setValue("");
          this.empleado.controls["telefonopersonal"].setValue("");
          this.empleado.controls["idareadenegocio"].setValue("");
          this.empleado.controls["idcargo"].setValue("");
          this.displayEmpleado = 'none';
          this.usuarioService.listarEmpleadoCombo().subscribe(data => {
            this.empleados = data;
          });
          this.usuarioService.listarTipoCombo().subscribe(data => {
            this.tipoUsuarios = data;
          });
          this.titulo = "Creacion de usuarios"
          this.displayUsuarios = 'block';
        }else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title:'¡Ocurrio un error al guardar el registro!',
            showConfirmButton: false,
            timer: 3000
          })
        }
      });
    }
  }
  filtrarCargo() {
    var idArea = this.empleado.controls['idareadenegocio'].value;
    this.catalogoService.ValidarAreaJefe(idArea).subscribe(data => {
      if (data == 1) {
        this.catalogoService.listarCargoCombosinJ().subscribe(data => { this.cargos = data });
      } else {
        this.catalogoService.listarCargoCombo().subscribe(data => { this.cargos = data });
      }
    });

  }
  guardarDatosUsuario() {
    if (this.usuario.valid == true) {
      this.usuarioService.agregarUsuario(this.usuario.value).subscribe(data => {
        if (data == 1) {
          this.usuario.controls["iidusuario"].setValue("0");
          this.usuario.controls["bandera"].setValue("0");
          this.usuario.controls["nombreusuario"].setValue("");
          this.usuario.controls["contra"].setValue("1");
          this.usuario.controls["contra2"].setValue("1");
          this.usuario.controls["iidEmpleado"].setValue("1");
          this.usuario.controls["iidTipousuario"].setValue("");
          this.displayUsuarios = 'none';
          let timerInterval
          Swal.fire({
            title: '¡Creando usuario!',
            html: 'Espere un momento',
            timer: 1000,
            timerProgressBar: true,
            onBeforeOpen: () => {
              Swal.showLoading()
              timerInterval = setInterval(() => {
                const content = Swal.getContent()
                if (content) {
                  const b = content.querySelector('b')
                  if (b) {
                    Swal.getTimerLeft()
                  }
                }
              }, 100)
            },
            onClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              let timerInterval
              Swal.fire({
                title: '¡Recuperando información!',
                html: 'Espere un momento',
                timer: 5000,
                timerProgressBar: true,
                onBeforeOpen: () => {
                  Swal.showLoading()
                  timerInterval = setInterval(() => {
                    const content = Swal.getContent()
                    if (content) {
                      const b = content.querySelector('b')
                      if (b) {
                        Swal.getTimerLeft()
                      }
                    }
                  }, 100)
                },
                onClose: () => {
                  clearInterval(timerInterval)
                }
              }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                  Swal.fire({
                    icon: 'success',
                    title: '¡Bienvenido a ASGARD!',
                    text: 'De ahora en adelante eres el administrador principal, puedes acceder ahora mismo con las credenciales recién creadas',
                    confirmButtonText: 'Aceptar'

                  })
                  this.router.navigate(["/login"]);
                }
              })
            }
          })
        }else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title:'¡Ocurrio un error al guardar el registro!',
            showConfirmButton: false,
            timer: 3000
          })
        }
      });
    }
  }
  validarContraIguales(control: FormControl) {
    //con value sacamos el valor del control
    if (control.value != "" && control.value != null) {
      if (this.usuario.controls["contra"].value != control.value) {
        //si es diferente mandamos error devolviendo un objeto
        return { noIguales: true };
      } else {
        //todo esta bien
        return null;
      }
    }
  }
}





