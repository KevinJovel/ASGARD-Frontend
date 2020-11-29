import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { DepreciacionService } from '../../services/depreciacion.service';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cierre-anio',
  templateUrl: './cierre-anio.component.html',
  styleUrls: ['./cierre-anio.component.css']
})
export class CierreAnioComponent implements OnInit {
  displayCierre = 'none';
  aceptacion: boolean = false;
  anio: string;
  cooperativa: string;
  periodo: FormGroup;

  constructor(private router: Router, private depreciacionService: DepreciacionService,private usuarioService:UsuarioService) {
    this.periodo = new FormGroup({
      'idPeriodo': new FormControl("0"),
      'terminos': new FormControl()
    });
  }

  ngOnInit(): void {
    this.displayCierre = 'block';
    this.depreciacionService.DatosCierre().subscribe(data => {
      this.anio = data.anio;
      this.cooperativa = data.cooperativa;
      this.periodo.controls["idPeriodo"].setValue(data.idPeriodo);
    });

  }
  cierre() {
    this.depreciacionService.validarDatosDepreciar().subscribe(data => {
      if(data==1){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡El proceso de cierre de año no se puede realizar, porque hay activos pendientes de depreciación !',
          showConfirmButton: true,
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó realizar el cierre de año activo.`).subscribe();
      }else{
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
  Aceptar(aceptar) {
    if (aceptar) {
      this.aceptacion = true;
    } else {
      this.aceptacion = false;
    }
  }
}
