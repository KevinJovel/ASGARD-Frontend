import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MantenimientoService } from './../../services/mantenimiento.service';
import { UsuarioService } from './../../services/usuario.service';

@Component({
  selector: 'app-tabla-solicitud',
  templateUrl: './tabla-solicitud.component.html',
  styleUrls: ['./tabla-solicitud.component.css']
})
export class TablaSolicitudComponent implements OnInit {
  solicitudes: any;
  bienes: any;
  bienesS: any;
  p: number = 1;
  solicitud: FormGroup;
  bien: FormGroup;
  display = 'none';
  display5 = 'none'; // para ayuda
  titulo: string;
  estadoActual: any;
  noSolicitud: string;
  fecha: string;
  jefe: string;
  area: string;
  idSoli: any;


  constructor(private mantenimientoService: MantenimientoService, private router: Router, private usuarioService: UsuarioService) {



  }

  ngOnInit(): void {
    //METODO PARA TABLA VACIA
    this.mantenimientoService.validarSolicitudesParaMantenimiento().subscribe(res => {
      if (res == 1) {
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Consultó las solicitudes de mantenimiento.`).subscribe();
        this.mantenimientoService.getSolicitudMantenimiento().subscribe(data => { this.solicitudes = data });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se encontraron solicitudes de mantenimiento.',
          showConfirmButton: false,
          timer: 4000
        });
        this.router.navigate(["/"]);
      }
    })


  }
  open(id) {
    this.mantenimientoService.listarDatosSolicitud(id).subscribe(data => {
      this.noSolicitud = data.noSolicitud;
      this.area = data.areanegocio;
      this.jefe = data.jefe;
      this.fecha = data.fechacadena;

    });
    this.mantenimientoService.listarBienesSolicitados(id).subscribe(res => {
      this.bienes = res;
    });
    this.titulo = "Solicitud de autorización de mantenimiento";
    this.display = 'block';
    this.idSoli = id;
  }
  aprobarSolicitud() {
    var id = this.idSoli;
    // alert(id);

    Swal.fire({
      title: '¿Estas seguro de aprobar esta solicitud?',
      text: "No podras revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Cancelar",
      confirmButtonText: '¡Si, aprobar!'
    }).then((result) => {
      if (result.value) {
        this.mantenimientoService.aceptarSolicitud(id).subscribe(res => {
          if (res == 1) {
            Swal.fire(
              '¡Solicitud aprobada!',
              '¡La solictud ha sido aprobada con éxito!',
              'success'
            );
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Aprobó una solicitud de mantenimiento.`).subscribe();
            this.display = 'none';
            this.mantenimientoService.getSolicitudMantenimiento().subscribe(data => {
              this.solicitudes = data;
            });
          }

        });
        this.mantenimientoService.listarBienesSolicitados(id).subscribe(res => {
          this.bienesS = res;
          for (let bien of this.bienesS) {
            this.mantenimientoService.cambiarEstado(bien.idBien).subscribe(rest => {
            });
          }
          this.mantenimientoService.getSolicitudMantenimiento().subscribe(data => {
            this.solicitudes = data;

          });
        });
      }// del result
    })//de la alerta
  }

  buscar(buscador) {
    this.p = 1;
    this.mantenimientoService.buscarSolicitudMante(buscador.value).subscribe(res => { this.solicitudes = res });
  }

  denegarSolicitud() {
    var id = this.idSoli;
    Swal.fire({
      title: '¿Estas seguro de denegar esta solicitud?',
      text: "¡No podras revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Cancelar",
      confirmButtonText: '¡Si, denegar!'
    }).then((result) => {
      if (result.value) {
        this.mantenimientoService.denegarSolicitud(id).subscribe(res => {
          if (res == 1) {
            Swal.fire(
              '¡Solicitud denegada!',
              '¡La solictud ha sido denegada con éxito!',
              'success'
            );
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Denegó una solicitud de mantenimiento.`).subscribe();
            this.display = 'none';
            this.mantenimientoService.getSolicitudMantenimiento().subscribe(data => {
              this.solicitudes = data;
            });
          }
        });
        this.mantenimientoService.listarBienesSolicitados(id).subscribe(res => {
          this.bienesS = res;
          for (let bien of this.bienesS) {
            this.mantenimientoService.cambiarEstadoDenegado(bien.idBien).subscribe(rest => {
            });
          }
          this.mantenimientoService.getSolicitudMantenimiento().subscribe(data => {
            this.solicitudes = data;
          });
        });
      }// del result
    })//de la alerta
  }
  close() {
    this.display = 'none';
    this.noSolicitud = "";
    this.area = "";
    this.jefe = "";
    this.fecha = "";
  }

  open5() { //para modal de ayuda
    this.display5 = 'block';
  }
  close5() { //para modal de ayuda
    this.display5 = "none";
  }
}
