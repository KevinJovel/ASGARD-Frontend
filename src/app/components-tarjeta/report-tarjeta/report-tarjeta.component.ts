import { Component, OnInit } from '@angular/core';
import { CatalogosService } from './../../services/catalogos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepreciacionService } from './../../services/depreciacion.service';

@Component({
  selector: 'app-report-tarjeta',
  templateUrl: './report-tarjeta.component.html',
  styleUrls: ['./report-tarjeta.component.css']
})
export class ReportTarjetaComponent implements OnInit {
  display = 'none';
  bienes: any;
  sucursales: any;
  areas:any;
  p: number=1;
  constructor(private catalogosServices: CatalogosService,private depreciacionService:DepreciacionService) {
  }
  ngOnInit(): void {
      this.catalogosServices.getComboSucursal().subscribe(data=>{this.sucursales=data});
    }
    FiltrarArea(sucursal){
      this.depreciacionService.ComboArea(sucursal.value).subscribe(data=>{this.areas=data});
    }
    Filtrar(){

    }
    Reload(){

    }
    buscar(nombre){

    }
    close() {
      this.display = 'none';
    }
  }