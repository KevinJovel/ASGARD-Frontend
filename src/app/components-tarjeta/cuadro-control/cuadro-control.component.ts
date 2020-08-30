import { Component, OnInit } from '@angular/core';
import { DepreciacionService } from './../../services/depreciacion.service';
import {ExcelService} from './../../excel.service';

@Component({
  selector: 'app-cuadro-control',
  templateUrl: './cuadro-control.component.html',
  styleUrls: ['./cuadro-control.component.css']
})
export class CuadroControlComponent implements OnInit {

    //Variables  
    cuadros: any;
    p:number=1;

  constructor(private depreciacionService:DepreciacionService, private excelService:ExcelService) { }

  ngOnInit() {
    this.depreciacionService.getCuadroControl().subscribe(data=> {this.cuadros=data});
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


