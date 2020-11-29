import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MantenimientoService } from './../../services/mantenimiento.service';
import { UsuarioService } from './../../services/usuario.service';
import { ControlService } from './../../services/control.service';

@Component({
  selector: 'app-tabla-informe',
  templateUrl: './tabla-informe.component.html',
  styleUrls: ['./tabla-informe.component.css']
})
export class TablaInformeComponent implements OnInit {
  solicitudes: any;
  bienes: any;
  Phone: any;
  tecnicos: any;
  p: number = 1;
  informe: FormGroup;
  display = 'none';
  titulo: string;
  noSolicitud: string;
  jefe: string;
  area: string;
  idmante: any;
  cotomo: any;
  costomateriales: any;
  costototal: any;
  fechaMaxima: any;
  fechaMinima: any;
  // fecha = Date.now();

  constructor(private mantenimientoService: MantenimientoService, private controlService: ControlService, private router: Router, private usuarioService: UsuarioService) {
    this.informe = new FormGroup({
      'idinformematenimiento': new FormControl("0"),
      'idmantenimiento': new FormControl("0"),
      'idBien': new FormControl("0"),
      'idtecnico': new FormControl("0", [Validators.required]),
      'descripcion': new FormControl("", [Validators.required, Validators.maxLength(100), Validators.pattern("^[0-9-a-zA-ZñÑáéíóúÁÉÍÓÚ,. ]+$")]),
      'costomateriales': new FormControl("", [Validators.required, Validators.pattern("^[0-9.]+$")]),
      'fechainforme': new FormControl("", [Validators.required]),
      'costomo': new FormControl("", [Validators.required, Validators.pattern("^[0-9.]+$")]),
    });
  }

  ngOnInit(): void {
    //METODO PARA TABLA VACIA
    this.mantenimientoService.validarActivosEnMantenimiento().subscribe(res => {
      if (res == 1) {
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Consultó los activos en mantenimiento.`).subscribe();
        this.mantenimientoService.listarBienesMantenimientoInforme().subscribe(res => {
          this.bienes = res;
        });
        this.mantenimientoService.listarTecnicoCombo().subscribe(data => {
          this.tecnicos = data;
        });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se encontraron activos en mantenimiento.',
          showConfirmButton: false,
          timer: 4000
        });
        this.router.navigate(["/"]);
      }
    })
  }
  open(id, idbien, fecha) {
    // alert(id);
    this.informe.controls["fechainforme"].setValue(fecha);
    var fecharecup = this.informe.controls["fechainforme"].value.split("-");
    let dia = fecharecup[0];
    let mes = fecharecup[1];
    let anio = fecharecup[2];
    this.controlService.mostrarAnio().subscribe((res) => {
      this.fechaMaxima = `${res.anio}-12-31`;
      this.fechaMinima = `${anio}-${mes}-${dia}`;
    });
    this.titulo = "Informe de mantenimiento";
    this.display = 'block';
    this.informe.controls["idinformematenimiento"].setValue("0");
    this.informe.controls["idmantenimiento"].setValue(id);
    this.informe.controls["idBien"].setValue(idbien);
    this.informe.controls["idtecnico"].setValue("");
    this.informe.controls["descripcion"].setValue("");
    this.informe.controls["costomateriales"].setValue("");
    this.informe.controls["costomo"].setValue("");
    this.mantenimientoService.listarBienesMantenimientoInforme().subscribe(res => {
      this.bienes = res;
    });
  }

  buscar(buscador) {
    this.p = 1;
    this.mantenimientoService.buscarBienesMante(buscador.value).subscribe(res => { this.bienes = res });
  }
  public sinSignos(event: any) {
    const pattern = /^[a-zA-Z0-9]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z0-9" "Ññ]/g, "");
    }
  }

  public solonumerosypunto(event: any) {
    const pattern = /^[0-9.]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9.]/g, "");

    }
  }
  guardarDatos() {
    this.mantenimientoService.guardarInformeMantenimiento(this.informe.value).subscribe(res => {
      if (res == 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Informe guardado con éxito!',
          showConfirmButton: false,
          timer: 3000
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Realizó un informe de mantenimiento.`).subscribe();
        this.display = 'none';
        this.mantenimientoService.cambiarEstadoActivoMantenimiento(this.informe.controls["idBien"].value).subscribe(rest => {
          if (rest == 1) {
            this.mantenimientoService.listarBienesMantenimientoInforme().subscribe(data => { this.bienes = data });
          }
        });
        var fecha = this.bienes.controls["fechainforme"].value.split("-");
        var anio = fecha[0];
        var mes = fecha[1];
        var dia = fecha[2];
        this.bienes.controls["fechainforme"].setValue(mes + "/" + dia + "/" + anio);

      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al guardar el informe',
          showConfirmButton: false,
          timer: 3000
        })
      }


    });
    this.informe.controls["idinformematenimiento"].setValue("0");
    this.informe.controls["idmantenimiento"].setValue("");
    this.informe.controls["fechainforme"].setValue("");
    this.informe.controls["idtecnico"].setValue("");
    this.informe.controls["descripcion"].setValue("");
    this.informe.controls["costomateriales"].setValue("");
    this.informe.controls["costomo"].setValue("");
    this.display = 'none';
    this.mantenimientoService.listarBienesMantenimientoInforme().subscribe(res => {
    this.bienes = res;
    });

  }
  close() {
    this.display = 'none';
  }
}





