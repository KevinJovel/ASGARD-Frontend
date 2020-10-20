import { Component, OnInit } from '@angular/core';
import { CatalogosService } from './../../services/catalogos.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DepreciacionService } from './../../services/depreciacion.service';
import { ConfiguracionService } from './../../services/configuracion.service';
import { ControlService } from './../../services/control.service';
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
  displayfoto = 'none';
  displayMensaje='none';
  //Datos del modal
  coopertativa:string;
  anio:string;
  //Modal de detalles
  foto: any;
  descripcion:string;
  codigo:string;
  fecha:string;
  valorAdquisicion:string;
  responsable:string;
  ubicacion:string;
  valorAcual:string;
  valorActualStr:string;
  valorDepreciarStr:string;
  provDon:string;
  noSerie:string;
  vidaUtil:string;
  Observaciones:string;
  constructor(private catalogosServices: CatalogosService,private controlService: ControlService,private depreciacionService:DepreciacionService,private configuracionService:ConfiguracionService) { 
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
  }

  ngOnInit(): void {
    this.catalogosServices.getComboSucursal().subscribe(data=>{this.sucursales=data});
    this.depreciacionService.TablaDepreciacion().subscribe(data=>{this.bienes=data
      this.tablaMuebles='block'; 
    });
  }
  CambiarTipo(){
    switch(this.combos.controls["idTipo"].value){
      case '1':
        this.tablaEdificios='none'
        this.tablaIntengibles='none'
        this.depreciacionService.TablaDepreciacion().subscribe(data=>{this.bienes=data
          this.tablaMuebles='block'; 
        });
        this.disabledFiltro=false;
        this.banderaBuscador=1;
      break;
      case '2':
        this.tablaMuebles='none'
        this.tablaIntengibles='none'
        this.depreciacionService.TablaDepreciacionEdificios().subscribe(res=> { this.bienes=res
          this.tablaEdificios='block'});
        this.disabledFiltro=true;
        this.banderaBuscador=2;
      break;
      case '3':
        this.tablaEdificios='none'
        this.tablaMuebles='none'
        this.depreciacionService.TablaDepreciacionIntangibles().subscribe(res=> { this.bienes=res
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
    this.depreciacionService.TablaDepreciacion().subscribe(data=>{
      this.bienes=data
      this.tablaMuebles='block';
      this.banderaBuscador=1;
    });
    this.disabledFiltroBotonAsignacion=false;
    this.disabledFiltro=false;
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
          title: '¡Depreciación aplicada con exito!',
          showConfirmButton: false,
          timer: 3000
        })
        this.display='none';
        this.tablaEdificios='none'
        this.tablaIntengibles='none'
        this.depreciacionService.TablaDepreciacion().subscribe(data=>{this.bienes=data
          this.tablaMuebles='block'
          this.combos.controls['idTipo'].setValue(0);
        });
      }else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡Ocurrio un error!',
          showConfirmButton: false,
          timer: 3000
        })
      }
      });
    }

  }
  open(id){

    this.depreciacionService.DatosDepreciacion(id).subscribe(data=>{
      if(data.valorActual<=0){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡Ocurrio un error!',
          showConfirmButton: false,
          timer: 3000
        })
      }else{
        this.datos.controls["idBien"].setValue(data.idBien);
        this.coopertativa=data.cooperativa;
        this.anio=data.anio;
        this.datos.controls["codigo"].setValue(data.codigo);
        this.datos.controls["descripcion"].setValue(data.descipcion);
        this.datos.controls["valorAdquicicion"].setValue(data.valorAdquicicon);
        this.datos.controls["valorDepreciacion"].setValue(data.valorDepreciacion);
        this.datos.controls["valorActual"].setValue(data.valorActual);
      // pasar a 2 decimales el valor a depreciar
        let valorRnDepreciar=Math.round(data.valorDepreciacion*100)/100;
        valorRnDepreciar.toFixed(2);
        this.valorDepreciarStr=valorRnDepreciar.toString();
        //pasar a 2 decimales el valor actual
        let valorRnActual=Math.round(data.valorActual*100)/100;
        valorRnActual.toFixed(2);
        this.valorActualStr=valorRnActual.toString();
        this.display='block';
      }
   
    });
  }
  detalles(id){
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
  
  }
  close(){
    this.display='none';
  }
  close2(){
    this.display2='none';
  }
  buscar(buscador){
    this.p = 1;
    if(this.banderaBuscador==1){
    this.depreciacionService.BuscarTablaDepreciacion(buscador.value).subscribe(res => {this.bienes = res});
  }else if(this.banderaBuscador==2){
      this.controlService.buscarActivoEdificioAsig(buscador.value).subscribe(res => {this.bienes = res});
    }else if(this.banderaBuscador==3){
      this.controlService.buscarActivoIntengibleAsig(buscador.value).subscribe(res => {this.bienes = res});
    }
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
