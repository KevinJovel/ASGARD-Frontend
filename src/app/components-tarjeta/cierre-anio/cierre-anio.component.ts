import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { DepreciacionService } from '../../services/depreciacion.service';
import { SeguridadService } from '../../services/seguridad.service';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cierre-anio',
  templateUrl: './cierre-anio.component.html',
  styleUrls: ['./cierre-anio.component.css']
})
export class CierreAnioComponent implements OnInit {
  displayCierre = 'none';
  displayOpcion = 'none';
  displayRevertir = 'none';
  aceptacion: boolean = false;
  anio: string;
  cooperativa: string;
  periodo: FormGroup;

  constructor(private router: Router, private depreciacionService: DepreciacionService, private usuarioService: UsuarioService, private seguridadService: SeguridadService) {
    this.periodo = new FormGroup({
      'idPeriodo': new FormControl("0"),
      'terminos': new FormControl()
    });
  }

  ngOnInit(): void {

    //cuando los anios activos sean mayor a 1 se mostrara la opcion
    // this.displayOpcion='block';
    // this.displayCierre = 'block';
    this.depreciacionService.DatosCierre().subscribe(data => {
      this.anio = data.anio;
      this.cooperativa = data.cooperativa;
      this.periodo.controls["idPeriodo"].setValue(data.idPeriodo);
      // this.displayCierre = 'block';
      this.depreciacionService.validarCierre(data.anio).subscribe(data => {
        if (data.anioAnterior == 0 && data.anioSiguiente == 0) {
          this.displayCierre = 'block';
        } else if (data.anioAnterior == 1 && data.anioSiguiente == 0) {
          this.displayOpcion = 'block';
        } else if (data.anioAnterior == 0 && data.anioSiguiente == 1) {
          this.displayCierre = 'block';
        } else if (data.anioAnterior == 1 && data.anioSiguiente == 1) {
          this.displayCierre = 'block';
        }
      });


    });
  }
  cierre() {
    this.depreciacionService.validarDatosDepreciar().subscribe(data => {
      if (data == 1) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡El proceso de cierre de año no se puede realizar, porque hay activos pendientes de depreciación !',
          showConfirmButton: true,
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó realizar el cierre de año activo.`).subscribe();
      } else {
        this.depreciacionService.EjecutarCierre(this.periodo.value).subscribe(data => {
          if (data == 1) {
            this.displayCierre = 'none';
            this.router.navigate(["./"]);
            let timerInterval
            Swal.fire({
              title: 'Ejecutando cierre de año!',
              html: 'Procesando',
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
                  position: 'center',
                  icon: 'success',
                  title: '¡Se realizó el cierre correctamente!',
                  showConfirmButton: false,
                  timer: 3000
                });
                this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Realizó el cierre de año activo.`).subscribe();
              }
            })

          } else {
            this.displayCierre = 'none';
            this.router.navigate(["./"]);
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Ocurrió un problema al realizar el cierre',
              showConfirmButton: false,
              timer: 3000
            });
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó realizar el cierre de año activo.`).subscribe();
          }
        });
      }
    });

  }
  close() {
    this.displayCierre = 'none';
    this.router.navigate(["./"]);
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'El cierre no fue ejcutado.',
      showConfirmButton: false,
      timer: 3000
    })

  }
  close2() {
    this.displayCierre = 'none';
    this.router.navigate(["./"]);
  }
  opcionCierre() {
    this.depreciacionService.DatosCierre().subscribe(data => {
      this.anio = data.anio;
      this.cooperativa = data.cooperativa;
      this.periodo.controls["idPeriodo"].setValue(data.idPeriodo);
      this.displayCierre = 'block';
    });
  }
  opcionRevertir() {
    this.depreciacionService.DatosCierre().subscribe(data => {
      this.anio = data.anio;
      this.cooperativa = data.cooperativa;
      this.periodo.controls["idPeriodo"].setValue(data.idPeriodo);
      this.displayRevertir = 'block';
    });
  }
  Aceptar(aceptar) {
    if (aceptar) {
      this.aceptacion = true;
    } else {
      this.aceptacion = false;
    }
  }
  Revertir() {
    this.seguridadService.ListarTransacciones(this.anio).subscribe(data => {
      if (data.length > 0) {
        data.forEach(item => {
          this.seguridadService.EliminarTransacciones(item.id).subscribe(res => {
            if (res == 1) {
              this.seguridadService.EliminarActivos(item.idBien).subscribe(res => {
                if (res == 1) {
                  this.seguridadService.Revertir(this.anio).subscribe(res => {
                    if (res == 1) {
                      let anioNuevo = parseInt(this.anio) - 1;
                      this.seguridadService.ListarTransaccionesrevertir(anioNuevo).subscribe(data1 => {
                        data1.forEach(element => {
                          this.seguridadService.EliminarTransaccionesRevertir(element.id).subscribe(res => {
                            if (res == 1) {
                              Swal.fire({
                                position: 'center',
                                icon: 'info',
                                title: 'El proceso de reversion fue ejcutado con exito.',
                                showConfirmButton: false,
                                timer: 3000
                              })
                            }
                          });
                        });
                      })
                    }
                  });
                }
              });
            }
          })
        });
      } else {
        this.seguridadService.Revertir(this.anio).subscribe(res => {
          if (res == 1) {
            let anioNuevo = parseInt(this.anio) - 1;
            this.seguridadService.ListarTransaccionesrevertir(anioNuevo).subscribe(data1 => {
              data1.forEach(element => {
                this.seguridadService.EliminarTransaccionesRevertir(element.id).subscribe(res => {
                  if (res == 1) {
                    Swal.fire({
                      position: 'center',
                      icon: 'info',
                      title: 'El proceso de reversion fue ejcutado con exito.',
                      showConfirmButton: false,
                      timer: 3000
                    })
                  }
                });
              });
            })
          }
        });
      }

    });
  }

}
