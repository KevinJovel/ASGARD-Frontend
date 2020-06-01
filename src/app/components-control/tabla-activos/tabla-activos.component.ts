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
    id:any;
    tipocombo:string;
    combo: FormGroup;
  constructor(private controlService: ControlService,private _CargaScripts:CargarScriptsService) {
    _CargaScripts.cargar(['/advanced-datatable/media/js/jquery','/advanced-datatable/media/js/jquery.dataTables',
    '/respond.min','/sortingTable']);
    this.combo = new FormGroup({
      'idTipo': new FormControl("0"),
      'idCombo': new FormControl("0"),
      
  });
   }
 
  ngOnInit() {
    this.tipocombo="Proveedor o Donante:";
    // this.controlService.listarComboProveedor().subscribe(res=> {this.comboProvDon=res});
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

}
