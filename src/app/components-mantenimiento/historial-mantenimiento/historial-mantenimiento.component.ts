import { Component, OnInit } from '@angular/core';
import { CatalogosService } from './../../services/catalogos.service';
import { UsuarioService } from './../../services/usuario.service';
import { SeguridadService } from './../../services/seguridad.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DepreciacionService } from './../../services/depreciacion.service';
import { MantenimientoService } from './../../services/mantenimiento.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historial-mantenimiento',
  templateUrl: './historial-mantenimiento.component.html',
  styleUrls: ['./historial-mantenimiento.component.css']
})
export class HistorialMantenimientoComponent implements OnInit {
  bienes: any;
  sucursales: any;
  areas: any;
  combos: FormGroup;
  p: number = 1;
  p3: number = 1;
  titulo: string;
  datos: FormGroup;
  display = 'none';
  display2 = 'none';
  //Datos del modal
  coopertativa: string;
  anio: string;
  //para mostrar datos de historial
  idbien: any;
  descripcion: string;
  codigo: string;
  encargado: string;
  areadenegocio: any;
  // para listar el historial
  informes: any;
  tecnicos: any;
  informe: FormGroup;
  revalorizacion: FormGroup;
  display3 = 'none';
  titulo3: string;
  bienid: any;
  idmante: any;
  //variables de division de roles
  isAdmin: boolean = false;
  tipoUsuario = sessionStorage.getItem("tipo");
  idEmpleado = sessionStorage.getItem("empleado");
  banderaBuscador: number = 1;
  constructor(private catalogosServices: CatalogosService, private router: Router, private http: HttpClient, private depreciacionService: DepreciacionService, private mantenimientoService: MantenimientoService, private usuarioService: UsuarioService, private seguridadService: SeguridadService) {
    this.combos = new FormGroup({
      'idArea': new FormControl("0"),
      'idSucursal': new FormControl("0")
    });
    this.datos = new FormGroup({
      'idBien': new FormControl("0"),
      // 'bandera': new FormControl("0"),
      'codigo': new FormControl(""),
      'descripcion': new FormControl(""),
      'valorAdquicicion': new FormControl(""),
      'valorActual': new FormControl(""),
      'valorDepreciacion': new FormControl("")
    });
  }

  ngOnInit(): void {
    this.mantenimientoService.validarHistorialMantenimiento().subscribe(res => {
      if (res == 1) {
        if (this.tipoUsuario == "1") {
          this.mantenimientoService.listarActivosHistorial().subscribe(data => { this.bienes = data });
          this.banderaBuscador = 1;
          this.isAdmin=true;
          this.banderaBuscador=1;
        } else {
          this.seguridadService.getHisorialMttoJefe(this.idEmpleado).subscribe(data => { this.bienes = data });
          this.banderaBuscador = 2;
          this.isAdmin=false;
          this.banderaBuscador=2;
        }
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se encontraron activos registrados.',
          showConfirmButton: false,
          timer: 4000
        });
        this.router.navigate(["/"]);
      }
    })
    this.catalogosServices.getComboSucursal().subscribe(data => { this.sucursales = data });

  }
  FiltrarArea() {
    var id = this.combos.controls['idSucursal'].value;
    this.depreciacionService.ComboArea(id).subscribe(data => { this.areas = data });
  }
  Filtrar() {
    var id = this.combos.controls['idArea'].value;
    this.depreciacionService.FiltroTablaDepreciacion(id).subscribe(data => { this.bienes = data });
  }
  Reload() {
    this.combos.controls['idSucursal'].setValue(0);
    this.combos.controls['idArea'].setValue(0);
    this.depreciacionService.TablaDepreciacion().subscribe(data => { this.bienes = data });
  }

  open(id) {
    this.mantenimientoService.historialInformes(id).subscribe(res => {
      if (res == 0) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: '¡El activo seleccionado no tiene ningún mantenimiento realizado!',
          showConfirmButton: false,
          timer: 3000
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Consultó el historial de mantenimiento de un activo.`).subscribe();
      } else {
        this.titulo = "Historial de mantenimientos";
        this.display = 'block';
        this.mantenimientoService.listardatosHistorial(id).subscribe(data => {
          this.codigo = data.codigo;
          this.descripcion = data.descripcion;
          this.encargado = data.encargado;
          this.areadenegocio = data.areadenegocio;
          this.idbien = data.idBien

        });
        //para recuperar el id del bien 
        this.mantenimientoService.historialInformes(id).subscribe(res => {
          this.informes = res;
        });
      }
    })
  }
  close() {
    this.display = 'none';
  }

  buscar(buscador) {
    this.p = 1;
    if (this.banderaBuscador == 1) {
      this.mantenimientoService.buscarActivoHistorial(buscador.value).subscribe(data => { this.bienes = data });
    } else {
      this.seguridadService.BuscarBienEnHotorialMttoJefe(this.idEmpleado, buscador.value).subscribe(data => { this.bienes = data });
    }

  }
  reportesMantenimientoPdf(id) {

    this.mantenimientoService.listardatosHistorial(id).subscribe(data => {
      this.idbien = data.idBien

    });
    this.http.get(environment.urlService + "api/ReportesMantenimiento/historialmantenimientopdf/" + parseInt(this.idbien), { responseType: 'arraybuffer' }).subscribe(pdf => {
      const blod = new Blob([pdf], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blod);
      window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Imprimió un reporte de historial de mantenimientos.`).subscribe();
  }



}
