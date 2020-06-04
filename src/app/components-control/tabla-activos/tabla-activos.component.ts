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

    comboAreaSucur:any;
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
                                              
  });
   }
 
  ngOnInit() {
    this.tipocombo="Filtro";
     this.controlService.getBienes().subscribe(res=> {this.comboAreaSucur=res});
  }
  FiltroCombo(){
    var idarea=this.combo.controls["idTipo"].value;
    if(idarea==1||idarea==2){
      this.tipocombo="Sucursal:";
        this.controlService.listarComboSucursal().subscribe(res=> {this.comboAreaSucur=res});
        
    }else{
      this.tipocombo="Area:";
      this.controlService.listarComboArea().subscribe(res=> {this.comboAreaSucur=res});
    }
   
}

close() {
  this.display = 'none';
}

mostrar(id) {

  //this.titulo = "Modificar Proveedor";
  this.display = 'block';
  
  this.controlService.recuperarBienes(id).subscribe(data => {this.bienObj = data})
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
