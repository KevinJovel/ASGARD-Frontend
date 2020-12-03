import { Component, OnInit } from '@angular/core';
import { DepreciacionService } from './../../services/depreciacion.service';
import { UsuarioService } from './../../services/usuario.service';
import { ExcelService } from './../../excel.service';
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
  cuadroA:any;
  cuadroE:any;
  cuadroI:any;
  p: number = 1;
  tablaMuebles = 'none';
  tablaIntengibles = 'none';
  tablaEdificios = 'none';
  combo: FormGroup;
  activos: any;
  disabledFiltro: boolean;
  banderaBuscador: any = 1;
  disabledFiltroBotonAsignacion: boolean;

  //Variable para redireccionar
  parametro: string;

  constructor(private depreciacionService: DepreciacionService, private excelService: ExcelService, private activatedRoute: ActivatedRoute,
    private controlService: ControlService,private usuarioService:UsuarioService) {
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
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Consultó el cuadro de control de activos.`).subscribe();
    this.controlService.validarActivosTransacciones().subscribe(res => {
      if (res == 1) {
        // this.depreciacionService.getCuadroControl().subscribe(data=> {this.cuadros=data});
        this.depreciacionService.getCuadroControl().subscribe(data => {
          this.cuadros = data
          this.tablaMuebles = 'block';
        });
        this.depreciacionService.CuadroControlExcel().subscribe(data=>{
        this.cuadroA=data;
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

  //Método para generar archivo
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.cuadroA, 'Cuadro de Control-Bienes muebles');
  }

  exportarExcelEdi():void {
    this.excelService.exportAsExcelFile(this.cuadroE, 'Cuadro de Control-Edificios e instalaciones');
  }

  exportarExcelIntan():void {
    this.excelService.exportAsExcelFile(this.cuadroI, 'Cuadro de Control-Intangibles');
  }

  //Método para buscar
  buscar(buscador) {
    this.p = 1;
    this.depreciacionService.buscarCuadro(buscador.value).subscribe(res => this.cuadros = res);
  }



}



