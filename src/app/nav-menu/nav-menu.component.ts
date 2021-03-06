import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CargarScriptsService} from './../services/cargar-scripts.service';
import { MantenimientoService } from './../services/mantenimiento.service';
import { DepreciacionService } from './../services/depreciacion.service';

import {  FormGroup  } from '@angular/forms';
import Swal from 'sweetalert2';
import { ControlService } from '../services/control.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit{
  displayCierre='none';
  datos:FormGroup;
  aceptacion:boolean=false;
  admin:boolean=false;
  jefe:boolean=false;
  constructor( private _cargarScript:CargarScriptsService,private controlService: ControlService ,private mantenimientoService: MantenimientoService,private depreciacionService: DepreciacionService,private router: Router) {
    this._cargarScript.cargar(["/jquery.nicescroll"]);

   }
   ngOnInit(): void {
    let tipousuario=sessionStorage.getItem("tipo");  
    if(tipousuario=="1"){
      this.jefe=false;
      this.admin=true;
    }else if (tipousuario=="2"){
    this.admin=false;
    this.jefe=true;
    }
  }
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }    
  limiarSolicitud(){
   this.mantenimientoService.cambiarEstadoActivosTemporal().subscribe(res=>{});
  
  }
  ValidarActivos(){
    this.collapse();
    this.depreciacionService.validarDatosDepreciar().subscribe(data => {
      if(data==1){
        let timerInterval
            Swal.fire({
              title: '¡Recuperando información!',
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
                this.router.navigate(["/tabla-depreciacion"]);
              }
            })
       
      }else{
        let timerInterval
            Swal.fire({
              title: '¡Recuperando información!',
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
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: '¡No hay activos disponibles para depreciar!',
                  showConfirmButton: false,
                  timer: 3000
                })
                this.router.navigate(["/tabla-tarjeta"]);
              }
            })
      
      }
    });
  }
//Validar activos de revalorización 
  ValidarActivosRevalorizacion(){
    this.collapse();
    this.depreciacionService.validarDatosDepreciar().subscribe(data => {
      if(data==1){
        let timerInterval
            Swal.fire({
              title: '¡Recuperando información!',
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
                this.router.navigate(["/'tabla-revalorizar"]);
              }
            })
       
      }else{
        let timerInterval
            Swal.fire({
              title: '¡Recuperando información!',
              html: 'Espere un momento por favor',
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
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: '¡Los activos ya han sido depreciados en el periodo actual!',
                  showConfirmButton: false,
                  timer: 3000
                })
                this.router.navigate(["/tabla-tarjeta"]);
              }
            })
      
      }
    });
  }

  }

