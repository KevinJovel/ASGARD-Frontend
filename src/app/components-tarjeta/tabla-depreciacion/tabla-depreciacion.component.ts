import { Component, OnInit } from '@angular/core';
import { CatalogosService } from './../../services/catalogos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepreciacionService } from './../../services/depreciacion.service';
import Swal from 'sweetalert2';

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
  //Datos del modal
  coopertativa:string;
  anio:string;
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
      'valorDepreciacion': new FormControl("0.00"),
      'fecha': new FormControl("")
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
     console.log(this.datos.value);
    if (this.datos.valid == true) {
      this.datos.controls["fecha"].setValue(12 + "/" + 31 + "/" +this.anio );
      this.depreciacionService.transaccionDepreciacion(this.datos.value).subscribe((data) => {
        if (data == 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Depreciación aplicada con exito',
          showConfirmButton: false,
          timer: 3000
        })
        this.display='none';
        this.depreciacionService.TablaDepreciacion().subscribe(data=>{this.bienes=data});
      }else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocurrio un error',
          showConfirmButton: false,
          timer: 3000
        })
      }
      });
    }

  }
  open(id){
   
     this.display='block';
    this.depreciacionService.DatosDepreciacion(id).subscribe(data=>{
      this.datos.controls["idBien"].setValue(data.idBien);
      this.coopertativa=data.cooperativa;
      this.anio=data.anio;
      this.datos.controls["codigo"].setValue(data.codigo);
      this.datos.controls["descripcion"].setValue(data.descipcion);
      this.datos.controls["valorAdquicicion"].setValue(data.valorAdquicicon);
      this.datos.controls["valorDepreciacion"].setValue(data.valorDepreciacion);
      this.datos.controls["valorActual"].setValue(data.valorActual);
    });
  }
  close(){
    this.display='none';
  }
  buscar(nombre){

  }
  // if (this.persona.valid == true) {
  //   var fechaNac = this.persona.controls["fechaNacimiento"].value.split("-");
  //   var anio = fechaNac[0];
  //   var mes = fechaNac[1];
  //   var dia = fechaNac[2];
  //   this.persona.controls["fechaNacimiento"].setValue(mes + "/" + dia + "/" + anio);
  //       this.personaService.agregarPersona(this.persona.value).subscribe(data => { this.route.navigate(["/mantenimiento-persona"]) });
  
// }

}
