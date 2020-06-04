import { Component, OnInit } from '@angular/core';
import {CargarScriptsService} from './../../services/cargar-scripts.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ControlService } from './../../services/control.service';
@Component({
  selector: 'app-tabla-activos',
  templateUrl: './tabla-activos.component.html',
  styleUrls: ['./tabla-activos.component.css']
})
export class TablaActivosComponent implements OnInit {

    comboProvDon:any;
    bienes: any;
    id:any;
    tipocombo:string;
    combo: FormGroup;
    p: number = 1;
    display = 'none';
    //descripcion: string;
    bienObj:any ={};

  constructor(private controlService: ControlService,private _CargaScripts:CargarScriptsService) {
    _CargaScripts.cargar(['/advanced-datatable/media/js/jquery','/advanced-datatable/media/js/jquery.dataTables',
    '/respond.min','/sortingTable']);

    this.combo = new FormGroup({

      'idTipo': new FormControl("0"),
      'idCombo': new FormControl("0"), 
      /////////////////////////////////////////////////
      'idbien': new FormControl("0"),
      'bandera': new FormControl("0"),
      'descripcion': new FormControl(""),
      'numformulario': new FormControl(""),
      'idclasificacion': new FormControl("")                                          
  });
   }
 
  ngOnInit() {
    this.tipocombo="Filtro";
     this.controlService.getBienes().subscribe(res=> {this.comboProvDon=res});
  }
  ProveedorDonante(){
    var idempleado=this.combo.controls["idTipo"].value;
    if(idempleado==1||idempleado==2){
      this.tipocombo="Proveedor:";
        this.controlService.listarComboProveedor().subscribe(res=> {this.comboProvDon=res});
        
    }else{
      this.tipocombo="Donante:";
      this.controlService.listarComboDonante().subscribe(res=> {this.comboProvDon=res});
    }
   
}

close() {
  this.display = 'none';
}

mostrar(id) {

  //this.titulo = "Modificar Proveedor";
  this.display = 'block';
  
  this.controlService.recuperarBienes(id).subscribe(data => {console.log(data);})
 

  // {

    // this.combo.controls["idbien"].setValue(data.idbien);
    // this.combo.controls["descripcion"].setValue(data.descripcion);
    // this.combo.controls["numformulario"].setValue(data.numformulario);
    // this.combo.controls["idclasificacion"].setValue(data.idclasificacion);
    
    // this.combo.controls["bandera"].setValue("1");

    // this.controlService.getBienes().subscribe(res => { this.comboProvDon = res });
  // }
  // );
}

}
