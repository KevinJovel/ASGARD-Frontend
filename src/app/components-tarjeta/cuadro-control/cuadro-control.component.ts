import { Component, OnInit } from '@angular/core';
import { DepreciacionService } from './../../services/depreciacion.service';
import {ExcelService} from './../../excel.service';
import { FormGroup, FormControl} from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import { ControlService } from './../../services/control.service';


@Component({
  selector: 'app-cuadro-control',
  templateUrl: './cuadro-control.component.html',
  styleUrls: ['./cuadro-control.component.css']
})
export class CuadroControlComponent implements OnInit {

    //Variables  
    cuadros: any;
    p:number=1;
    tablaMuebles='none';
    tablaIntengibles='none';
    tablaEdificios='none';
    combo: FormGroup;
    activos:any;
    disabledFiltro: boolean;
    banderaBuscador:any=1;
    disabledFiltroBotonAsignacion:boolean;

    //Variable para redireccionar
    parametro:string;

  constructor(private depreciacionService:DepreciacionService, private excelService:ExcelService, private activatedRoute:ActivatedRoute,
    private controlService: ControlService) { 
    this.combo = new FormGroup({
      'idArea': new FormControl("0"),
      'idSucursal': new FormControl("0"),
      'idTipo': new FormControl("0"),
      'IdBien': new FormControl("0"),
      'bandera': new FormControl("0"),
      'idEmpleado':new FormControl("0"),
      'tipoadquicicion': new FormControl("0"),                                           
    }); 
    this.activatedRoute.params.subscribe(parametro=>{
      this.parametro=parametro["param"];
    })
  }

  ngOnInit() {
   // this.depreciacionService.getCuadroControl().subscribe(data=> {this.cuadros=data});
    this.depreciacionService.getCuadroControl().subscribe(data=>{this.cuadros=data
      this.tablaMuebles='block';
    });
    
  }

  CambiarTipo(){
    switch(this.combo.controls["idTipo"].value){
      case '1':
        this.tablaEdificios='none'
        this.tablaIntengibles='none'
        this.depreciacionService.getCuadroControl().subscribe(res=> { this.cuadros=res
          this.tablaMuebles='block'});
        this.disabledFiltro=false;
        this.banderaBuscador=1;
      break;
      case '2':
        this.tablaMuebles='none'
        this.tablaIntengibles='none'
        this.depreciacionService.getCuadroControlEdificios().subscribe(res=> { this.cuadros=res
          this.tablaEdificios='block'});
        this.disabledFiltro=true;
        this.banderaBuscador=2;
      break;
      case '3':
        this.tablaEdificios='none'
        this.tablaMuebles='none'
        this.depreciacionService.getCuadroControlIntangibles().subscribe(res=> { this.cuadros=res
          this.tablaIntengibles='block'
        });
       
        this.disabledFiltro=true;
        this.banderaBuscador=3;
      break;
      default:
        console.log("ocurrio un error en la consulta de datos");
    }
  }

  //Método para generar archivo
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.cuadros,'Cuadro de Control');
  }

  //Método para buscar
  buscar(buscador) {
    this.p = 1;
    this.depreciacionService.buscarCuadro(buscador.value).subscribe(res => this.cuadros = res);
  }



}



