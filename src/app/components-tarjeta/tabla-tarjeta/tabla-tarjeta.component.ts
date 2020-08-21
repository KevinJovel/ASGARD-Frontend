import { Component, OnInit } from '@angular/core';
import { CatalogosService } from './../../services/catalogos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepreciacionService } from './../../services/depreciacion.service';

@Component({
  selector: 'app-tabla-tarjeta',
  templateUrl: './tabla-tarjeta.component.html',
  styleUrls: ['./tabla-tarjeta.component.css']
})
export class TablaTarjetaComponent implements OnInit {

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
 

  


