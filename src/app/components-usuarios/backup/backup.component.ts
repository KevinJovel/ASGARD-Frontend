import { Component, OnInit } from '@angular/core';
import { DepreciacionService } from '../../services/depreciacion.service';
import { SeguridadService } from '../../services/seguridad.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent implements OnInit {
  displaybackup = 'none';
  anio: string;
  cooperativa: string;
  constructor(private router: Router, private depreciacionService: DepreciacionService, private seguridadService: SeguridadService) { }

  ngOnInit(): void {
    this.displaybackup = 'block';
    this.depreciacionService.DatosCierre().subscribe(data => {
      this.anio = data.anio;
      this.cooperativa = data.cooperativa;
      // this.periodo.controls["idPeriodo"].setValue(data.idPeriodo);
    });
  }
  GenerarBackup() {
    this.seguridadService.generarbackup().subscribe(res => {
      let timerInterval
        Swal.fire({
          title: '¡Generando Backup!',
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
            if(res==1){
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: '!Backup generado con éxito¡',
                showConfirmButton: false,
                timer: 3000
              });
            } else{
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: '!Ocurrió un error al generar el Backup¡',
                showConfirmButton: false,
                timer: 3000
              });
            }
            this.router.navigate(["./"]);
          }});
    });
  }
  close() {
    this.displaybackup = 'none';
    this.router.navigate(["./"]);
  }

}
