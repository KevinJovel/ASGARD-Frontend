import { Component, OnInit, Output, EventEmitter, ViewChild  } from '@angular/core';
import {CargarScriptsService} from './../../services/cargar-scripts.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ControlService } from './../../services/control.service';
import Swal from 'sweetalert2';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-tabla-activos',
  templateUrl: './tabla-activos.component.html',
  styleUrls: ['./tabla-activos.component.css']
})
export class TablaActivosComponent implements OnInit {

    comboAreaSucur:any;
    //bienes: any;
    id:any;
    tipocombo:string;
    combo: FormGroup;
    p: number = 1;
    display = 'none';
    areas: any;
    marcas: any;
    //descripcion: string;
    bienObj: any ={};
    //para el filtro
    @Output() tipo: EventEmitter<any> ;

  constructor(private http: HttpClient ,private controlService: ControlService,private _CargaScripts:CargarScriptsService) {
    _CargaScripts.cargar(['/advanced-datatable/media/js/jquery','/advanced-datatable/media/js/jquery.dataTables',
    '/respond.min','/sortingTable']);
    //this.bienObj=[];
    //para el filtro
    this.tipo = new EventEmitter();

    this.combo = new FormGroup({

      'idTipo': new FormControl("0"),
      'idCombo': new FormControl("0"), 
      /////////////////////////////////////////////////
      'IdBien': new FormControl("0"),
      'bandera': new FormControl("0"),
      'Desripcion': new FormControl(""),
      'codigo': new FormControl(""),
      'idarea': new FormControl("")
                                              
  });
   }
 
  ngOnInit() {
    this.tipocombo="Filtro";
     this.controlService.getBienes().subscribe(res=> {this.comboAreaSucur=res});
     //this.controlService.getBienes().subscribe(res=> {this.bienObj = res});

     this.controlService.listarComboArea().subscribe(data =>{
      this.areas =data;
    });
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

filtrar(tip){
this.tipo.emit(tip);
}

close() {
  this.display = 'none';
}


ver(id:any){
  this.display = 'block';
  console.log(id);
  return this.controlService.recuperarBienes(id)
  .subscribe(res =>{this.bienObj = res ; console.log(res);
    this.bienObj.idarea = this.areas.find(v => v.idarea == this.bienObj.idarea).areaDeNegocio
    this.bienObj.idmarca = this.marcas.find(v => v.idmarca == this.bienObj.idmarca).marca
  }) ; 
  
}



buscar(buscador) {
  this.p = 1;
  this.controlService.buscarActivo(buscador.value).subscribe(res => {this.comboAreaSucur = res});
}



}
