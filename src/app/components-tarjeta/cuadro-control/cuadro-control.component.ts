import { Component, OnInit } from '@angular/core';
import { DepreciacionService } from './../../services/depreciacion.service';
import { UsuarioService } from './../../services/usuario.service';
import { SeguridadService } from './../../services/seguridad.service';
import { ConfiguracionService } from './../../services/configuracion.service';
import { ExcelService } from './../../excel.service';
import {HttpClient} from '@angular/common/http'
import {environment} from '../../../environments/environment';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ControlService } from './../../services/control.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuadro-control',
  templateUrl: './cuadro-control.component.html',
  styleUrls: ['./cuadro-control.component.css']
})
export class CuadroControlComponent implements OnInit {

  //Variables  
  cuadros: any;
  cuadroA: any;
  cuadroAJ: any;
  cuadroE: any;
  cuadroI: any;
  nombreC: any;
  descripcionC:any;
  p: number = 1;
  p2: number = 1;
  tablaMuebles = 'none';
  tablaIntengibles = 'none';
  tablaEdificios = 'none';
  display5 = 'none'; // para ayuda
  combo: FormGroup;
  activos: any;
  disabledFiltro: boolean;
  banderaBuscador: any = 1;
  disabledFiltroBotonAsignacion: boolean;

  //Variable para redireccionar
  parametro: string;
  //variables para division
  isAdmin: boolean = false;
  tipoUsuario = sessionStorage.getItem("tipo");
  idEmpleado = sessionStorage.getItem("empleado");

  constructor(private depreciacionService: DepreciacionService, private excelService: ExcelService, private activatedRoute: ActivatedRoute,
    private controlService: ControlService, private usuarioService: UsuarioService, private seguridadService: SeguridadService, private http:HttpClient, private confService: ConfiguracionService) {
    this.combo = new FormGroup({
      'idArea': new FormControl("0"),
      'idSucursal': new FormControl("0"),
      'idTipo': new FormControl("0"),
      'IdBien': new FormControl("0"),
      'bandera': new FormControl("0"),
      'idEmpleado': new FormControl("0"),
      'tipoadquicicion': new FormControl("0"),
    });
    this.activatedRoute.params.subscribe(parametro => {
      this.parametro = parametro["param"];
    })
  }

  ngOnInit() {
    this.confService.recuperarCoop().subscribe(param=> {
      this.nombreC=param.nombre;
      this.descripcionC=param.descripcion;
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Consultó el cuadro de control de activos.`).subscribe();
    this.controlService.validarActivosTransacciones().subscribe(res => {
      if (res == 1) {
        if (this.tipoUsuario == "1") {
          this.isAdmin=true;
          this.depreciacionService.getCuadroControl().subscribe(data => {
            this.cuadros = data
            this.tablaMuebles = 'block';
          });
        } else {
          this.isAdmin=false;
          this.seguridadService.getCuadroJefe(this.idEmpleado).subscribe(data => {
            this.cuadros = data
            this.tablaMuebles = 'block';
          });
          this.banderaBuscador = 2;
        }
        // this.depreciacionService.getCuadroControl().subscribe(data=> {this.cuadros=data});

        this.depreciacionService.CuadroControlExcel().subscribe(data => {
          this.cuadroA = data;
          this.tablaMuebles = 'block';
        });

        this.depreciacionService.CuadroControlJefeExcel(this.idEmpleado).subscribe(data=> {
          this.cuadroAJ = data;
          this.tablaMuebles = 'block';
        });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡No hay activos registrados!',
          showConfirmButton: false,
          timer: 3000
        });
      }
    });
  }

  CambiarTipo() {
    switch (this.combo.controls["idTipo"].value) {
      case '1':
        this.tablaEdificios = 'none'
        this.tablaIntengibles = 'none'
        this.depreciacionService.getCuadroControl().subscribe(res => {
          this.cuadros = res
          this.tablaMuebles = 'block'
        });
        this.disabledFiltro = false;
        this.banderaBuscador = 1;
        break;
      case '2':
        this.tablaMuebles = 'none'
        this.tablaIntengibles = 'none'
        this.depreciacionService.getCuadroControlEdificios().subscribe(res => {
          this.cuadros = res
          this.tablaEdificios = 'block'
        });
        this.depreciacionService.CuadroEdificiosExcel().subscribe(res => {
          this.cuadroE = res
          this.tablaEdificios = 'block'
        });
        this.disabledFiltro = true;
        this.banderaBuscador = 2;
        break;
      case '3':
        this.tablaEdificios = 'none'
        this.tablaMuebles = 'none'
        this.depreciacionService.getCuadroControlIntangibles().subscribe(res => {
          this.cuadros = res
          this.tablaIntengibles = 'block'
        });
        this.depreciacionService.CuadroIntangiblesExcel().subscribe(res => {
          this.cuadroI = res
          this.tablaIntengibles = 'block'
        });
        this.disabledFiltro = true;
        this.banderaBuscador = 3;
        break;
      default:
        console.log("ocurrio un error en la consulta de datos");
    }
  }

  //Método para generar reporte de cuadro de control para jefe de área
  cuadroControlJefePDF() {
    this.http.get(environment.urlService+"api/Reporte/cuadroControlJefePdf/" + parseInt(this.idEmpleado),{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió reporte de cuadro de control.`).subscribe();
  }

  //Método para generar archivo
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.cuadroA, 'Cuadro de Control-Bienes muebles');
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Generó excel de cuadro de control.`).subscribe();
  }

  exportExcelJefe(): void {
    this.excelService.exportAsExcelFile(this.cuadroAJ, 'Cuadro de Control-Bienes muebles');
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Generó excel de cuadro de control.`).subscribe();
  }

  exportarExcelEdi(): void {
    this.excelService.exportAsExcelFile(this.cuadroE, 'Cuadro de Control-Edificios e instalaciones');
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Generó excel de cuadro de control de edificios e instalaciones.`).subscribe();
  }

  exportarExcelIntan(): void {
    this.excelService.exportAsExcelFile(this.cuadroI, 'Cuadro de Control-Intangibles');
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Generó excel de cuadro de control de activos intangibles.`).subscribe();
  }

  //Método para buscar
  buscar(buscador) {
    this.p = 1;
    if (this.banderaBuscador == 1) {
      this.depreciacionService.buscarCuadro(buscador.value).subscribe(res => this.cuadros = res);
    } else {
      this.seguridadService.BuscarCuadroJefe(this.idEmpleado, buscador.value).subscribe(res => this.cuadros = res);
    }
  }

  open5() { //para modal de ayuda
    this.display5 = 'block';
  }
  close5() { //para modal de ayuda
    this.display5 = "none";
  }
}



