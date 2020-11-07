import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { ControlService } from './../../services/control.service';
import { CatalogosService } from './../../services/catalogos.service';//filtro

@Component({
  selector: 'app-form-desasignar',
  templateUrl: './form-desasignar.component.html',
  styleUrls: ['./form-desasignar.component.css']
})
export class FormDesasignarComponent implements OnInit {
  combo: FormGroup;
  disabledFiltro: boolean;
  disabledFiltroBotonAsignacion:boolean;
  areas: any;
  activos:any;
  sucursal: any;
  tablaMuebles='none';
  p: number = 1;
  display = 'none';
  display2 = 'none';
  tipocombo:string;
  displayfoto = 'none';
  displayMensaje='none';
  fecha: string; marca: string; area: string; proveedor: string; donante: string; clasificacion: string;
  destino: string; responsable: string; codigo: string; descripcion: string; modelo: string;
  tipoadqui: string; color: string; numserie: string; vidautil: string; estado: string; valor: string;
  plazo: string; prima: string; cuota:string; interes: string; valorresidual: string; foto: string;
  noformu: string ; ubicacion:string;
  provDon:string;
  Observaciones:string;
  constructor(private controlService: ControlService,private catalogosServices: CatalogosService) {
    this.combo = new FormGroup({
      'idArea': new FormControl("0"),
      'idSucursal': new FormControl("0"),
      'idTipo': new FormControl("0"),
      'IdBien': new FormControl("0"),
      'bandera': new FormControl("0"),
      'idEmpleado':new FormControl("0"),
      'tipoadquicicion': new FormControl("0"),                                           
    }); 
   }

  ngOnInit(): void {
    this.controlService.getBienesAsignados().subscribe(res=> { this.activos=res
      this.tablaMuebles='block'; 
    });
    this.catalogosServices.getComboSucursal().subscribe(data=>{this.sucursal=data});//filtro  
  }
  FiltrarArea(){
    var id= this.combo.controls['idSucursal'].value;
    this.controlService.ComboArea(id).subscribe(data=>{this.areas=data});
  }
  Filtrar(){
    var id= this.combo.controls['idArea'].value;
    this.controlService.FiltroTablaActivos(id).subscribe(data=>{this.activos=data});
  }
  Reload(){
    this.combo.controls['idSucursal'].setValue(0);
    this.combo.controls['idArea'].setValue(0);
    this.controlService.getBienesAsignados().subscribe(res=> { 
      this.activos=res
      this.tablaMuebles='block';
    });
    this.disabledFiltroBotonAsignacion=false;
    this.disabledFiltro=false;
  
  }
  buscar(buscador) {
    this.p = 1;
      this.controlService.buscarActivoAsig(buscador.value).subscribe(res => {this.activos = res});
    }
    ver(id: any) {
      
      this.controlService.VerDatosActivosAsig(id).subscribe((data) => {
        //Validacion para cambiar si es proveedor o donantes

        if(data.isProvDon==1) {
          this.tipocombo="Proveedor:";
         } else {
          this.tipocombo="Donante:";
         }
         //Mensaje cuando no hay imagen
         this.displayfoto='none';
         this.displayMensaje='none';
         if(data.foto!=null){
           this.foto=data.foto;
           this.displayfoto='block';
           this.displayMensaje='none';
         }else{
           this.displayMensaje='block';
           this.displayfoto='none';
         }
        this.fecha=data.fecha; 
        this.codigo=data.codigo;
        this.descripcion=data.descripcion;
        this.valor=data.valorAquisicion;
        this.marca = data.marca;
        this.modelo=data.modelo;
        this.color=data.color;
        this.estado = data.estadoingreso;
        this.clasificacion = data.clasificacion;
        this.responsable=data.responsable;
        this.ubicacion=data.ubicacion;
        this.tipoadqui = data.tipoadquicicion;
        this.provDon=data.provDon;
        this.prima = data.prima;
        this.cuota = data.cuota;
        this.plazo = data.plazo;
        this.interes = data.interes;
        this.valorresidual = data.valorresidual;
        this.vidautil=data.vidaUtil;
        this.foto=data.foto;
        this.Observaciones=data.observaciones;
        this.display = 'block';
      });
      }
      close() {
        this.display = 'none';
        }
         close2() {
        this.display2 = 'none';
        }
   desasignar(id){
    
          this.controlService.VerDatosActivosAsig(id).subscribe((data) => {
            //Validacion para cambiar si es proveedor o donantes
     
            this.fecha=data.fecha; 
            this.codigo=data.codigo;
            this.descripcion=data.descripcion;
            this.clasificacion = data.clasificacion;
            this.responsable=data.responsable;
            this.ubicacion=data.ubicacion;
            this.display2 = 'block';
          });
         
        }
        
}
