import { Component, OnInit } from '@angular/core';
import { CatalogosService } from './../../services/catalogos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepreciacionService } from './../../services/depreciacion.service';

@Component({
  selector: 'app-tabla-depreciacion',
  templateUrl: './tabla-depreciacion.component.html',
  styleUrls: ['./tabla-depreciacion.component.css']
})
export class TablaDepreciacionComponent implements OnInit {
  bienes: any;
  sucursales: any;
  areas:any;
  combos: FormGroup;
  p: number=1;
  titulo:string;
  datos:FormGroup;
  display = 'none';
  constructor(private catalogosServices: CatalogosService,private depreciacionService:DepreciacionService) { 
    this.combos=new FormGroup({
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
    this.catalogosServices.getComboSucursal().subscribe(data=>{this.sucursales=data});
    this.depreciacionService.TablaDepreciacion().subscribe(data=>{this.bienes=data});
  }
  FiltrarArea(){
    var id= this.combos.controls['idSucursal'].value;
    this.depreciacionService.ComboArea(id).subscribe(data=>{this.areas=data});
  }
  Filtrar(){
    var id= this.combos.controls['idArea'].value;
    this.depreciacionService.FiltroTablaDepreciacion(id).subscribe(data=>{this.bienes=data});
  }
  Reload(){
    this.combos.controls['idSucursal'].setValue(0);
    this.combos.controls['idArea'].setValue(0);
    this.depreciacionService.TablaDepreciacion().subscribe(data=>{this.bienes=data});
  }
  AplicarDepreciacion(){


  }
  open(){
    this.display='block';
  }
  close(){

  }
  buscar(nombre){

  }

}
