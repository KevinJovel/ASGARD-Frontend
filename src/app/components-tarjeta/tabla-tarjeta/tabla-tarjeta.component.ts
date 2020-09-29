import { Component, OnInit } from '@angular/core';
import { CatalogosService } from './../../services/catalogos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepreciacionService } from './../../services/depreciacion.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tabla-tarjeta',
  templateUrl: './tabla-tarjeta.component.html',
  styleUrls: ['./tabla-tarjeta.component.css']
})
export class TablaTarjetaComponent implements OnInit {

  bienes: any;
  sucursales: any;
  areas:any;
  combos: FormGroup;
  p: number=1;
  display2 = 'none';
  foto: any;
  constructor(private catalogosServices: CatalogosService,private depreciacionService:DepreciacionService) { 
    this.combos=new FormGroup({
      'idArea': new FormControl("0"),
      'idSucursal': new FormControl("0")
     });
  }

  ngOnInit(): void {
    this.catalogosServices.getComboSucursal().subscribe(data=>{this.sucursales=data});
    this.depreciacionService.TablaTarjeta().subscribe(data=>{this.bienes=data});
  }
  FiltrarArea(){
    var id= this.combos.controls['idSucursal'].value;
    this.depreciacionService.ComboArea(id).subscribe(data=>{this.areas=data});
  }
  Filtrar(){
    var id= this.combos.controls['idArea'].value;
    this.depreciacionService.FiltroTablaTarjeta(id).subscribe(data=>{this.bienes=data});
  }
  Reload(){
    this.combos.controls['idSucursal'].setValue(0);
    this.combos.controls['idArea'].setValue(0);
    this.depreciacionService.TablaDepreciacion().subscribe(data=>{this.bienes=data});
  }
  buscar(buscador){
    this.p = 1;
    this.depreciacionService.BuscarTablaTarjeta(buscador.value).subscribe(res => {this.bienes = res});
  }
  mostrarFoto(id){

    this.depreciacionService.recuperarFoto(id).subscribe(data => {
       
        if(data.foto==null) {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'No existe una foto registrada de este activo.',
            showConfirmButton: false,
            timer: 3000
        })
        } else {
          this.display2 = 'block';
          this.foto=data.foto;
        }
        
  
    });
  }
  close2() {
    this.display2 = 'none';
  }

}
 

  


