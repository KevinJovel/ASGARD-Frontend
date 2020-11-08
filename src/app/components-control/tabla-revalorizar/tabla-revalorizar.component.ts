import { Component, OnInit } from '@angular/core';
import { CatalogosService } from './../../services/catalogos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepreciacionService } from './../../services/depreciacion.service';
import { ConfiguracionService } from './../../services/configuracion.service';
import { ControlService } from './../../services/control.service';
import { MantenimientoService } from './../../services/mantenimiento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-revalorizar',
  templateUrl: './tabla-revalorizar.component.html',
  styleUrls: ['./tabla-revalorizar.component.css']
})
export class TablaRevalorizarComponent implements OnInit {

  bienes: any;
  sucursales: any;
  areas:any;
  combos: FormGroup;
  // Variables para tipos de activos
  tablaEdificios='none';
  tablaMuebles='none';
  tablaIntengibles='none';
  disabledFiltroBotonAsignacion:boolean;
  banderaBuscador:any=1;//bandera para cambiar el buscador
  disabledFiltro: boolean;//Esta bandera sirve para inhabilitar los filtros en edificios e intangibles
  p: number=1;
  titulo:string;
  datos:FormGroup;
  display = 'none';
  display2 = 'none';
  display3 = 'none';
  displayfoto = 'none';
  displayMensaje='none';
  //Modal de detalles
  foto: any;
  descripcion:string;
  codigo:string;
  fecha:string;
  valorAdquisicion:string;
  clasificacion:string;
  responsable:string;
  ubicacion:string;
  valorAcual:string;
  valorActualStr:string;
  valorDepreciarStr:string;
  provDon:string;
  noSerie:string;
  vidaUtil:string;
  Observaciones:string;
  vidaUtilCorrecta:boolean=false;
  fechaMaxima: any;
  fechaMinima: any;
  revalorizacion: FormGroup;
  constructor(private mantenimientoService: MantenimientoService, private catalogosServices: CatalogosService,private controlService: ControlService,private depreciacionService:DepreciacionService,private configuracionService:ConfiguracionService) { 
    this.combos=new FormGroup({
      'idArea': new FormControl("0"),
      'idSucursal': new FormControl("0"),
      'idTipo': new FormControl("0")
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

    //form para la revalorización 
    this.revalorizacion = new FormGroup({
      'idBien': new FormControl(""),
      'valorRevalorizacion': new FormControl("",[Validators.required,Validators.pattern("^[0-9.]+$")]),
      'idinformematenimiento': new FormControl(""),
     // 'valorActual': new FormControl(""),
     // 'valorDepreciacion': new FormControl("0.00"),
      'vidaUtil': new FormControl("",[Validators.pattern("^[0-9]+$")]),
      'fecha': new FormControl("",[Validators.required])
  });
  }

  ngOnInit(): void {
    this.catalogosServices.getComboSucursal().subscribe(data=>{this.sucursales=data});
    this.controlService.listarActivosRevalorizar().subscribe(data=>{this.bienes=data
      this.tablaMuebles='block'; 
    });
      //Método para recuperar año
   this.controlService.mostrarAnio().subscribe((res)=> {
    this.fechaMaxima=`${res.anio}-12-31`;
    this.fechaMinima=`${(res.anio).toString()}-01-01`;
  });
  }
  CambiarTipo(){
    switch(this.combos.controls["idTipo"].value){
      case '1':
        this.tablaEdificios='none'
        this.tablaIntengibles='none'
        this.controlService.listarActivosRevalorizar().subscribe(data=>{this.bienes=data
          this.tablaMuebles='block'; 
        });
        this.disabledFiltro=false;
        this.banderaBuscador=1;
      break;
      case '2':
        this.tablaMuebles='none'
        this.tablaIntengibles='none'
        this.controlService.listarActivosEdificiosRevalorizar().subscribe(res=> { this.bienes=res
          this.tablaEdificios='block'});
        this.disabledFiltro=true;
        this.banderaBuscador=2;
      break;
      case '3':
        this.tablaEdificios='none'
        this.tablaMuebles='none'
        this.controlService.listarActivosIntangiblesRevalorizar().subscribe(res=> { this.bienes=res
          this.tablaIntengibles='block'
        });
       
        this.disabledFiltro=true;
        this.banderaBuscador=3;
      break;
      default:
        console.log("ocurrio un error en la consulta de datos");
    }
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
    this.combos.controls['idTipo'].setValue(0);
    this.tablaEdificios='none';
    this.tablaIntengibles='none';
    this.controlService.listarActivosRevalorizar().subscribe(data=>{
      this.bienes=data
      this.tablaMuebles='block';
      this.banderaBuscador=1;
    });
    this.disabledFiltroBotonAsignacion=false;
    this.disabledFiltro=false;
  }
  guardarDatos(){
   // console.log(this.revalorizacion.value);
   // console.log(this.idmante);
    this.mantenimientoService.insertarRevalorizacion(this.revalorizacion.value).subscribe(res => {
      if(res==1){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Revalorización Guardada con exito!',
          showConfirmButton: false,
          timer: 3000
        })  
            //this.controlService.listarActivosRevalorizar().subscribe(data=>{this.bienes=data
              //this.tablaMuebles='block'; 
           // });
      } 
      
    });
    this.revalorizacion.controls["idBien"].setValue("0");
    this.revalorizacion.controls["valorRevalorizacion"].setValue("");
    this.revalorizacion.controls["fecha"].setValue("");
    this.revalorizacion.controls["vidaUtil"].setValue("");
   

this.display = 'none';
  }
  open(idBien,vidaUtil){
// alert(id);
this.titulo = "Revalorización";
this.revalorizacion.controls["idBien"].setValue(idBien);
this.revalorizacion.controls["vidaUtil"].setValue(vidaUtil) ;
this.revalorizacion.controls["valorRevalorizacion"].setValue("");
this.revalorizacion.controls["fecha"].setValue("");

//this.controlService.listarActivosRevalorizar().subscribe(data=>{this.bienes=data
  //this.tablaMuebles='block'; 
//});
this.display='block';
  }
  
  validarVidaUtil(vida){
    var id=this.revalorizacion.controls["idBien"].value;
    this.controlService.getVidaUtil(id).subscribe(data=>{
      if(vida.value>0 &&vida.value<data.vidaUtil){
        this.vidaUtilCorrecta=true;
      }else{
        this.vidaUtilCorrecta=false;
      }
    });
   
  }

  detalles(id,tipo){
    if(tipo==1){
      this.configuracionService.recuperarDatosGenrales(id).subscribe(data=>{
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
        this.descripcion=data.descripcion;
        this.codigo=data.codigo;
        this.fecha=data.fecha;
        this.valorAdquisicion=data.valorAquisicion;
        this.responsable=data.respondable;
        this.ubicacion=data.ubicacion;
        this.valorAcual=data.valorActual;
        this.provDon=data.provDon;
       this.noSerie=data.noSerie;
        this.vidaUtil=data.vidaUtil;
        this.Observaciones=data.observaciones;
      });
      this.display2='block';
    }else{
      this.configuracionService.recuperarDatosGenralesEdificiosIntangibles(id).subscribe(data=>{
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
        this.descripcion=data.descripcion;
        this.codigo=data.codigo;
        this.fecha=data.fecha;
        this.valorAdquisicion=data.valorAquisicion;
        this.valorAcual=data.valorActual;
        this.provDon=data.provDon;
        this.clasificacion=data.clasificacion;
        this.vidaUtil=data.vidaUtil;
        this.Observaciones=data.observaciones;

      });
      this.display3='block';
    }
  
  }
  close(){
    this.display='none';
  }
  close2(){
    this.display2='none';
  }
  close3(){
    this.display3='none';
  }
  buscar(buscador){
    this.p = 1;
    if(this.banderaBuscador==1){
    this.controlService.buscarActivoRevalorizar(buscador.value).subscribe(res => {this.bienes = res});
  }else if(this.banderaBuscador==2){
      this.controlService.buscarEdificiosRevalorizar(buscador.value).subscribe(res => {this.bienes = res});
    }else if(this.banderaBuscador==3){
      this.controlService.buscarActivoIntangibleRevalorizar(buscador.value).subscribe(res => {this.bienes = res});
    }
  }
}