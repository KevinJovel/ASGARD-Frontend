import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { DepreciacionService } from '../../services/depreciacion.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tipo-depreciacion',
  templateUrl: './tipo-depreciacion.component.html',
  styleUrls: ['./tipo-depreciacion.component.css']
})
export class TipoDepreciacionComponent implements OnInit {
  displayCierre = 'none';
  aceptacion: boolean = false;
  anio: string;
  cooperativa: string;
  periodo: FormGroup;
  constructor(private router: Router,private depreciacionService: DepreciacionService) {

   }

  ngOnInit(): void {
    this.displayCierre = 'block';
    this.depreciacionService.DatosCierre().subscribe(data => {
      this.anio = data.anio;
      this.cooperativa = data.cooperativa;
      this.periodo.controls["idPeriodo"].setValue(data.idPeriodo);
    });
  }
  close() {
    this.displayCierre = 'none';
    this.router.navigate(["./"]);
  }
  Total(){
    this.depreciacionService.transaccionDepreciacionTotal().subscribe(data => {
     
        let timerInterval
        Swal.fire({
          title: '¡Ejecutando depreciación!',
          html: 'Procesando',
          timer: 10000,
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
            if(data==1){
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: '!Depreciación realizada con exito¡',
                showConfirmButton: false,
                timer: 3000
              })
            } else{
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: '¡Los activos ya han sido depreciados en el periodo actual!',
                showConfirmButton: false,
                timer: 3000
              })
            }
            this.router.navigate(["./"]);
          }});
      })
  }
  ValidarActivos(){
    this.depreciacionService.validarDatosDepreciar().subscribe(data => {
      if(data==1){
        
        this.router.navigate(["/tabla-depreciacion"]);
      }else{
           Swal.fire({
      position: 'center',
      icon: 'error',
      title: '¡Los activos ya han sido depreciados en el periodo actual!',
      showConfirmButton: false,
      timer: 3000
    })
    this.close();
      }
    });
  }

}
