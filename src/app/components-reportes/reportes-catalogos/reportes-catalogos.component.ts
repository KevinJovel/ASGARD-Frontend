import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Txt, Img, Columns, Stack, Table, Cell, Canvas, Rect, SVG} from 'pdfmake-wrapper';
import { CatalogosService } from './../../services/catalogos.service';
import { ConfiguracionService } from './../../services/configuracion.service';
import { ControlService } from './../../services/control.service';
import { UsuarioService } from './../../services/usuario.service';
import {HttpClient} from '@angular/common/http'
import { CargarScriptsService } from './../../services/cargar-scripts.service';
import {environment} from '../../../environments/environment';
import {saveAs} from 'file-saver/dist/FileSaver';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MantenimientoService } from './../../services/mantenimiento.service';
import { TraspasoService } from 'src/app/services/traspaso.service';
import { DepreciacionService } from './../../services/depreciacion.service';
import { BajaService } from './../../services/baja.service';

@Component({
  selector: 'app-reportes-catalogos',
  templateUrl: './reportes-catalogos.component.html',
  styleUrls: ['./reportes-catalogos.component.css']
})
export class ReportesCatalogosComponent implements OnInit {
  clasificaciones: any;
  mes: any;
  marcas: any;
  areas: any;
  idcla:any;
  idmarca:any;
  iidmarca:any;
  idArea:any;
  iidArea:any;
  anio:any;
  combos: FormGroup;
  combomarca: FormGroup;
  comboArea: FormGroup;
  empleadoArea:FormGroup;
  activoxMarca:FormGroup;
  display = 'none';
  display2 = 'none';
  display3= 'none';
  display4= 'none';
  display5= 'none';
  display6= 'none';
  display7= 'none';
  display8= 'none';
  display9= 'none';
  display15= 'none';//para ayuda
  titulo: string;
  titulo2: string;
  titulo3: string;
  titulo4: string;
  titulo7: string;
  titulo8: string;
  titulo9: string;
  //Para fecha
  fechaMaxima:any;
  fechaMinima:any;

  constructor(private catalogoService: CatalogosService, private _cargarScript: CargarScriptsService,
    private confiService:ConfiguracionService, private http:HttpClient,private usuarioService:UsuarioService,
    private controlService: ControlService,private mantenimientoService: MantenimientoService,
    private TraspasoService: TraspasoService, private bajaService:BajaService, private depreciacionService: DepreciacionService) {
    this._cargarScript.cargar(["/barCode", "/ClearBarcode"]);

    this.combos = new FormGroup({
      'idclasificacion': new FormControl("",[Validators.required]),
      'bandera': new FormControl("0"),
    });
    this.comboArea = new FormGroup({
      'idAreaNegocio': new FormControl("0"),
      'bandera': new FormControl("0"),
      'anio':new FormControl("",[Validators.required]),
    });

    this.empleadoArea = new FormGroup({
      'idAreaNegocio': new FormControl("",[Validators.required]),
      'bandera': new FormControl("0"),
    });

    this.activoxMarca = new FormGroup({
      'IdMarca': new FormControl("",[Validators.required]),
      'bandera': new FormControl("0"),
    });

    this.combomarca = new FormGroup({
      'IdMarca': new FormControl("0"),
      'bandera': new FormControl("0"),
      'mes':new FormControl("",[Validators.required,Validators.pattern("^[0-9]+$")]),
      'anio':new FormControl("",[Validators.required,Validators.pattern("^[0-9]+$")]),
    });
    
   }

  ngOnInit(): void {
    this.catalogoService.comboClasificaciones().subscribe(data => { this.clasificaciones = data });
    this.catalogoService.listarAreaCombo().subscribe(data => {this.areas = data;});
    this.catalogoService.comboMarcas().subscribe(data => { this.marcas = data });
    
    //Método para recuperar año
    this.controlService.mostrarAnio().subscribe((res) => {
      this.fechaMaxima = `${(res.anio).toString()}`;
      this.fechaMinima = `${(res.anio-10).toString()}`;
    });
  }
  close() {
    this.display = 'none';
    this.combos.controls['idclasificacion'].setValue("");
  }
  close2() {
    this.display2 = 'none';
    this.empleadoArea.controls['idAreaNegocio'].setValue("");
  }
  close3() {
    this.display3 = 'none';
    this.activoxMarca.controls['IdMarca'].setValue("");
  }
  close4() {
    this.display4 = 'none';
    this.comboArea.controls['anio'].setValue("");
  }
  close5() {
    this.display5 = 'none';
    this.comboArea.controls['anio'].setValue("");
  }
  close6() {
    this.display6 = 'none';
    this.comboArea.controls['anio'].setValue("");
  }
  close7() {
    this.display7 = 'none';
    this.comboArea.controls['anio'].setValue("");
  }
  close8() {
    this.display8 = 'none';
    this.combomarca.controls['anio'].setValue("");
    this.combomarca.controls['mes'].setValue("");
  }
  close9() {
    this.display9 = 'none';
    this.combomarca.controls['anio'].setValue("");
    this.combomarca.controls['mes'].setValue("");
  }
  open(){
    this.titulo = "Imprimir activos por clasificación";
    this.display = 'block';
  }
  open2(){
    this.titulo2 = "Imprimir empleados por área de negocio";
    this.display2 = 'block';
  }
  open3(){
    this.titulo3 = "Imprimir activos por marca";
    this.display3 = 'block';
  }
  open4(){
    this.titulo4 = "Imprimir activos por año";
    this.display4 = 'block';
  }
  open5(){
    this.titulo4 = "Imprimir activos por año";
    this.display5= 'block';
  }
  open6(){
    this.titulo4 = "Imprimir activos por año";
    this.display6= 'block';
  }
  open7(){
    this.titulo7 = "Imprimir provisión anual";
    this.display7= 'block';
  }
  open8(){
    this.titulo8 = "Imprimir provisión mensual";
    this.display8= 'block';
  }
  open9(){
    this.titulo9 = "Imprimir bitácora por año";
    this.display9= 'block';
  }
  
  dowloadPDF() {
    this.http.get(environment.urlService+"api/Reporte/reporte",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const fileName='prueba.pdf';
      saveAs(blod,fileName);
    });
  }

  //MÉTODOS PARA LOS REPORTES DE CATÁLOGOS
  areasDeNegocioPDF() {
    this.catalogoService.validarlistarAreas().subscribe(res => {
      if (res == 1) {
    this.http.get(environment.urlService+"api/Reporte/areasDeNegociopdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de áreas de negocio.`).subscribe();
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '¡No hay áreas de negocios!',
      showConfirmButton: false,
      timer: 3000
    })
  }
});
  } 
  sucursalesPDF() {
    this.catalogoService.validarlistarSucursales().subscribe(res => {
      if (res == 1) {
    this.http.get(environment.urlService+"api/Reporte/sucursalespdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de sucursales.`).subscribe();
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '¡No hay sucursales!',
      showConfirmButton: false,
      timer: 3000
    })
  }
});
  }  
  categoriasPDF() {
    this.catalogoService.validarlistarCategoria().subscribe(res => {
      if (res == 1) {
    this.http.get(environment.urlService+"api/Reporte/categoriaspdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de categorías de activos.`).subscribe();
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '¡No hay categorías!',
      showConfirmButton: false,
      timer: 3000
    })
  }
});
  } 
  clasificacionesPDF() {
    this.catalogoService.validarlistarClasificacion().subscribe(res => {
      if (res == 1) {
    this.http.get(environment.urlService+"api/Reporte/clasificacionespdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de clasificaciones de activos.`).subscribe();
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '¡No hay clasificaciones!',
      showConfirmButton: false,
      timer: 3000
    })
  }
});
  }  
  cargosPDF() {
    this.catalogoService.validarlistarCargo().subscribe(res => {
      if (res == 1) {
    this.http.get(environment.urlService+"api/Reporte/cargospdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de cargos.`).subscribe();
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '¡No hay cargos!',
      showConfirmButton: false,
      timer: 3000
    })
  }
});
  }
  
  empleadosPDF() {
    this.catalogoService.validarlistarEmpleado().subscribe(res => {
      if (res == 1) {
    this.http.get(environment.urlService+"api/Reporte/empleadospdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de empleados.`).subscribe();
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '¡No hay empleados!',
      showConfirmButton: false,
      timer: 3000
    })
  }
});
  }
  //faltaria este
  
  empleadosPorClasificacionPdf(id) {
   this.iidArea= this.empleadoArea.controls['idAreaNegocio'].value;
   this.catalogoService.validarempleadosPorAreapdf(this.iidArea).subscribe(res => {
    if (res == 1) {
    this.http.get(environment.urlService+"api/Reporte/empleadosPorAreapdf/" + parseInt(this.iidArea),{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
       //Para cerrar el modal y limpiar cuando genera el reporte
       this.close2();
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Imprimió reporte de empleados por área de negocio.`).subscribe();
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '¡No hay empleados en esta área de negocio!',
      showConfirmButton: false,
      timer: 3000
    })
  }
});
  }
  
  proveedoresPDF() {
    this.catalogoService.validarlistarProveedores().subscribe(res => {
      if (res == 1) {
    this.http.get(environment.urlService+"api/Reporte/proveedoresPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de proveedores.`).subscribe();
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '¡No hay proveedores!',
      showConfirmButton: false,
      timer: 3000
    })
  }
});
  }
  
  donantesPDF() {
    this.catalogoService.validarlistarDonantes().subscribe(res => {
      if (res == 1) {
    this.http.get(environment.urlService+"api/Reporte/donantesPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de donantes.`).subscribe();
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '¡No hay donantes!',
      showConfirmButton: false,
      timer: 3000
    })
  }
});
  }
  
  marcasPDF() {
    this.catalogoService.validarlistarMarcas().subscribe(res => {
      if (res == 1) {
    this.http.get(environment.urlService+"api/Reporte/marcasPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de marcas.`).subscribe();
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '¡No hay marcas!',
      showConfirmButton: false,
      timer: 3000
    })
  }
});
  }
  
  tecnicosPDF() {
    this.catalogoService.validarlistarTenico().subscribe(res => {
      if (res == 1) {
    this.http.get(environment.urlService+"api/Reporte/tecnicosPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de técnicos.`).subscribe();
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '¡No hay técnicos!',
      showConfirmButton: false,
      timer: 3000
    })
  }
});
  }
  
  tipoDescargoPDF() {
    this.catalogoService.validarlistarTipoDescargo().subscribe(res => {
      if (res == 1) {
    this.http.get(environment.urlService+"api/Reporte/tipoDescargoPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de tipo de descargos.`).subscribe();
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '¡No hay tipos de descargo!',
      showConfirmButton: false,
      timer: 3000
    })
  }
});
  }

  //MÉTODOS PARA REPORTES DE CONTROL DE ACTIVO 
  activosAsigandosPDF() {
    this.controlService.validarActivosAsignar().subscribe(res=> {
      if(res==1) {
        this.http.get(environment.urlService+"api/Reporte/activosAsignadosPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
          const blod=new Blob([pdf],{type:"application/pdf"});
          const url= window.URL.createObjectURL(blod);
           window.open(url);
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de activos asignados.`).subscribe();
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡No hay activos asignados!',
          showConfirmButton: false,
          timer: 3000
        })
      }
    });
  }

  activosNoAsigandosPDF() {
    this.controlService.validarActivosNoAsignados().subscribe(res=> {
      if(res==1) {
        this.http.get(environment.urlService+"api/Reporte/activosNoAsignadosPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
          const blod=new Blob([pdf],{type:"application/pdf"});
          const url= window.URL.createObjectURL(blod);
           window.open(url);
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de activos no asignados.`).subscribe();
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡No se encuentran activos!',
          showConfirmButton: false,
          timer: 3000
        })
      }
    });
  }

  edificiosInstalacionesPDF() {

    this.controlService.validarEdificiosInstalaciones().subscribe(res=> {
      if(res==1) {
        this.http.get(environment.urlService+"api/Reporte/edificiosInstalacionesPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
          const blod=new Blob([pdf],{type:"application/pdf"});
          const url= window.URL.createObjectURL(blod);
           window.open(url);
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de activos tipo edificios o instalaciones.`).subscribe();
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡No hay edificos registrados!',
          showConfirmButton: false,
          timer: 3000
        })
      }
    });

    
  }

  activosIntangiblesPDF() {

    this.controlService.validarActivosIntengibles().subscribe(res=>{
      if(res==1) {
        this.http.get(environment.urlService+"api/Reporte/activosIntangiblesPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
          const blod=new Blob([pdf],{type:"application/pdf"});
          const url= window.URL.createObjectURL(blod);
           window.open(url);
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de activos tipo intagibles.`).subscribe();
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡No hay activos intangibles registrados!',
          showConfirmButton: false,
          timer: 3000
        })
      }
    });

  }

  cuadroControlActivosPDF() {
    this.depreciacionService.validarCuadroControl().subscribe(res=> {
      if(res==1) {
        this.http.get(environment.urlService+"api/Reporte/cuadroControlActivosPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
          const blod=new Blob([pdf],{type:"application/pdf"});
          const url= window.URL.createObjectURL(blod);
           window.open(url);
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de cuadro de control de activos.`).subscribe();
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡No hay activos registrados!',
          showConfirmButton: false,
          timer: 3000
        })
      }
    });
  }

  cuadroControlEdificiosPDF() {
    this.depreciacionService.validarCuadroEdificios().subscribe(res=> {
      if(res==1) {
        this.http.get(environment.urlService+"api/Reporte/cuadroControlEdificiosPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
          const blod=new Blob([pdf],{type:"application/pdf"});
          const url= window.URL.createObjectURL(blod);
           window.open(url);
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de cuadro de control de activos edificios.`).subscribe();
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡No hay activos registrados!',
          showConfirmButton: false,
          timer: 3000
        })
      }
    });
  }

  cuadroControlIntangiblesPDF() {
    this.depreciacionService.validarCuadroIntangibles().subscribe(res=> {
      if(res==1) {
        this.http.get(environment.urlService+"api/Reporte/cuadroControlIntangiblesPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
          const blod=new Blob([pdf],{type:"application/pdf"});
          const url= window.URL.createObjectURL(blod);
           window.open(url);
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de cuadro de control de activos intangibles.`).subscribe();
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡No hay activos registrados!',
          showConfirmButton: false,
          timer: 3000
        })
      }
    });
  }

   activosXAnio() {
    let anio=this.comboArea.controls['anio'].value;
    this.controlService.validarActivoxAnio(anio).subscribe(res => {
      if (res == 1) {
        this.idArea= this.comboArea.controls['anio'].value;
        this.http.get(environment.urlService+"api/Reporte/activosPorAnioPdf/" + parseInt(anio),{responseType: 'arraybuffer'}).subscribe(pdf=>{
          const blod=new Blob([pdf],{type:"application/pdf"});
          const url= window.URL.createObjectURL(blod);
           window.open(url);
           //Para cerrar el modal y limpiar cuando genera el reporte
           this.close4();
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Imprimió reporte de activos adquiridos por año.`).subscribe();
       
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡No hay activos registrados en ese año!',
          showConfirmButton: false,
          timer: 3000
        })
      }
    });
   }

   codigoBarraActivosPDF() {
    this.controlService.validarCodigoBarra().subscribe(res=> {
      if(res==1) {
        this.http.get(environment.urlService+"api/Reporte/codigoBarraGeneralPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
          const blod=new Blob([pdf],{type:"application/pdf"});
          const url= window.URL.createObjectURL(blod);
           window.open(url);
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de código de barra de activos.`).subscribe();
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡No hay activos registrados!',
          showConfirmButton: false,
          timer: 3000
        })
      }
    });
  }

   activosRevalorizadosXAnioPdf() {
    let anio=this.comboArea.controls['anio'].value;
    this.controlService.validarActivoxAnio(anio).subscribe(res => {
      if (res == 1) {
        this.idArea= this.comboArea.controls['anio'].value;
        this.http.get(environment.urlService+"api/Reporte/activosRevalorizadosAnioPdf/" + parseInt(anio),{responseType: 'arraybuffer'}).subscribe(pdf=>{
          const blod=new Blob([pdf],{type:"application/pdf"});
          const url= window.URL.createObjectURL(blod);
           window.open(url);
           //Para cerrar el modal y limpiar cuando genera el reporte
           this.close5();
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Imprimió reporte de activos revalorizados por año.`).subscribe();
       
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡No hay activos revalorizados en ese año!',
          showConfirmButton: false,
          timer: 3000
        })
      }
    });
   }

   activosDepreciadosXAnioPdf() {
    let anio=this.comboArea.controls['anio'].value;
    this.controlService.validarActivoxAnio(anio).subscribe(res => {
      if (res == 1) {
        this.idArea= this.comboArea.controls['anio'].value;
        this.http.get(environment.urlService+"api/Reporte/depreciacionAnualPdf/" + parseInt(anio),{responseType: 'arraybuffer'}).subscribe(pdf=>{
          const blod=new Blob([pdf],{type:"application/pdf"});
          const url= window.URL.createObjectURL(blod);
           window.open(url);
           //Para cerrar el modal y limpiar cuando genera el reporte
           this.close6();
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Imprimió reporte de depreciación anual.`).subscribe();
       
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡No hay activos depreciados en ese año!',
          showConfirmButton: false,
          timer: 3000
        })
      }
    });
   }

   //REPORTE DE PROVISIÓN ANUAL
   provisionAnualPdf() {
    let anio=this.comboArea.controls['anio'].value;
    this.controlService.validarActivoxAnio(anio).subscribe(res => {
      if (res == 1) {
        this.idArea= this.comboArea.controls['anio'].value;
        this.http.get(environment.urlService+"api/ReportesSeguridad/provisionAnualPdf/" + parseInt(anio),{responseType: 'arraybuffer'}).subscribe(pdf=>{
          const blod=new Blob([pdf],{type:"application/pdf"});
          const url= window.URL.createObjectURL(blod);
           window.open(url);
           //Para cerrar el modal y limpiar cuando genera el reporte
           this.close7();
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Imprimió reporte de provisión anual.`).subscribe();
       
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡No hay activos depreciados en ese año!',
          showConfirmButton: false,
          timer: 3000
        })
      }
    });
   }
   
    //REPORTE DE PROVISIÓN MENSUAL
    provisionMensualPdf() {
      let anio=this.combomarca.controls['anio'].value;
      let mes= this.combomarca.controls['mes'].value;
      this.controlService.validarActivoMes(mes,anio).subscribe(res => {
        if (res == 1) {
          this.idmarca= this.combomarca.controls['anio'].value;
          this.idmarca= this.combomarca.controls['mes'].value;
          this.http.get(environment.urlService+"api/ReportesSeguridad/provisionMensualPdf/" + parseInt(mes)+"/"+ parseInt(anio),{responseType: 'arraybuffer'}).subscribe(pdf=>{
            const blod=new Blob([pdf],{type:"application/pdf"});
            const url= window.URL.createObjectURL(blod);
             window.open(url);
             //Para cerrar el modal y limpiar cuando genera el reporte
             this.close8();
          });
          this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Imprimió reporte de provisión mensual.`).subscribe();
         
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '¡No hay activos depreciados en ese año!',
            showConfirmButton: false,
            timer: 3000
          })
        }
      });
     }
  //REPORTES DE MANTENIMIENTO
  solicitudesmantenimientopdf() {
    this.mantenimientoService.validarSolicitudesParaMantenimiento().subscribe(res => {
    if(res==1){
    this.http.get(environment.urlService+"api/ReportesMantenimiento/solicitudesmantenimientopdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de solicitudes de mantenimiento.`).subscribe();
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '¡No hay solicitudes de mantenimiento!',
      showConfirmButton: false,
      timer: 3000
    })
  }
});
  }
  activosenmantenimientopdf() {
    this.mantenimientoService.validarActivosEnMantenimiento().subscribe(res => {
      if(res==1){
    this.http.get(environment.urlService+"api/ReportesMantenimiento/activosenmantenimientopdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de activos en mantenimiento.`).subscribe();
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '¡No hay activos en mantenimiento!',
      showConfirmButton: false,
      timer: 3000
    })
  }
});
  }
  informesmantenimientopdf() {
    this.mantenimientoService.validarListarInformeMantenimiento().subscribe(res => {
      if(res==1){
    this.http.get(environment.urlService+"api/ReportesMantenimiento/informesmantenimientopdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de informes de mantenimiento.`).subscribe();
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '¡No hay informes de mantenimiento!',
      showConfirmButton: false,
      timer: 3000
    })
  }
});
  }

  //Reporte de traspasos
  solicitudestraspasopdf() {
    this.TraspasoService.validarSolicitudTraspaso().subscribe(res => {
      if(res==1){
    this.http.get(environment.urlService+"api/ReportesTraspaso/solicitudestraspasopdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de solicitudes de traspasos.`).subscribe();
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '¡No hay solicitudes de traspaso!',
      showConfirmButton: false,
      timer: 3000
    })
  }
});
  }

  //reporte de descargos
  solicitudbajapdf() {
    this.bajaService.validarSolicitudesParaBaja().subscribe(res => {
      if (res == 1) {
    this.http.get(environment.urlService+"api/ReportesBaja/solicitudbajapdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de solicitudes de baja.`).subscribe();
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '¡No hay solicitudes de descargos!',
      showConfirmButton: false,
      timer: 3000
    })
  }
});
  }
  asignadosdebajapdf() {
    this.bajaService.validarHistorialParaBaja().subscribe(res => {
      if (res == 1) {
    this.http.get(environment.urlService+"api/ReportesBaja/asignadosdebajapdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de historial de descargos de activos asignados.`).subscribe();
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '¡No hay historial de descargos!',
      showConfirmButton: false,
      timer: 3000
    })
  }
});
  }
  noasignadosdebajapdf() {
    this.bajaService.validarHistorialBajaNoAsig().subscribe(res => {
      if (res == 1) {
    this.http.get(environment.urlService+"api/ReportesBaja/noasignadosdebajapdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de historial de descargos de activos no asignados.`).subscribe();
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '¡No hay historial de descargos!',
      showConfirmButton: false,
      timer: 3000
    })
  }
});
  }
  

  //reporte de activos según clasificación

  reportesClasificacionPdf(id) {
   this.idcla= this.combos.controls['idclasificacion'].value;
   this.controlService.validarcomboClasificaciones(this.idcla).subscribe(res => {
    if (res == 1) {  
    this.http.get(environment.urlService+"api/ReportesSeguridad/activosclasificacionpdf/" + parseInt(this.idcla),{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
       this.close();
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Imprimió un reporte de activos por clasificiación.`).subscribe();
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '¡No hay activos con la clasificación seleccionada!',
      showConfirmButton: false,
      timer: 3000
    })
  }
});
  }
  reportesMarcaPdf(id) {
    this.iidmarca= this.activoxMarca.controls['IdMarca'].value;
    this.controlService.validarcomboMarcas(this.iidmarca).subscribe(res => {
      if (res == 1) {            
    this.http.get(environment.urlService+"api/ReportesSeguridad/activospormarcapdf/" + parseInt(this.iidmarca),{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);

       this.close3();
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Imprimió un reporte de activos por marca.`).subscribe();
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '¡No hay activos con la marca seleccionada!',
      showConfirmButton: false,
      timer: 3000
    })
  }
});
  }

  //MÉTODOS PARA REPORTES DE SEGURIDAD
  bitacoraPdf() {
    this.usuarioService.validarBitacora().subscribe(res=> {
      if(res==1) {
        this.http.get(environment.urlService+"api/Reporte/bitacoraPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
          const blod=new Blob([pdf],{type:"application/pdf"});
          const url= window.URL.createObjectURL(blod);
           window.open(url);
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de bitácora.`).subscribe();
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡No hay datos registrados!',
          showConfirmButton: false,
          timer: 3000
        })
      }
    });
   }

   bitacoraAnioPdf() {
    let anio=this.comboArea.controls['anio'].value;
    this.controlService.validarBitacoraxAnio(anio).subscribe(res => {
      if (res == 1) {
        this.idArea= this.comboArea.controls['anio'].value;
        this.http.get(environment.urlService+"api/Reporte/bitacoraAnioPdf/" + parseInt(anio),{responseType: 'arraybuffer'}).subscribe(pdf=>{
          const blod=new Blob([pdf],{type:"application/pdf"});
          const url= window.URL.createObjectURL(blod);
           window.open(url);
           //Para cerrar el modal y limpiar cuando genera el reporte
           this.close9();
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Imprimió reporte de activos adquiridos por año.`).subscribe();
       
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡No hay datos registrados en ese año!',
          showConfirmButton: false,
          timer: 3000
        })
      }
    });
   }
   
   usuariospdf() {
    this.controlService.validarlistarUsuarios().subscribe(res => {
      if (res == 1) {  
    this.http.get(environment.urlService+"api/ReportesSeguridad/usuariospdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de usuarios.`).subscribe();
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '¡No hay usuarios!',
      showConfirmButton: false,
      timer: 3000
    })
  }
});
   }

   
   open15() { //para modal de ayuda
    this.display15 = 'block';
  }
  close15() { //para modal de ayuda
    this.display15 = "none";
  }

}
