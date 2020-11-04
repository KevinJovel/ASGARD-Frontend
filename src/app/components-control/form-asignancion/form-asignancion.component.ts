import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ControlService } from './../../services/control.service';
import { CargarScriptsService } from './../../services/cargar-scripts.service';
//PRUEBA CON OBJETO
import { MantenimientoService } from './../../services/mantenimiento.service';
import Swal from 'sweetalert2';
//importaciones para pdf make wrapper
// import { PdfMakeWrapper, Txt, SVG, QR, Columns, Table, Toc, Cell, Stack } from 'pdfmake-wrapper';

@Component({
  selector: 'app-form-asignancion',
  templateUrl: './form-asignancion.component.html',
  styleUrls: ['./form-asignancion.component.css']
})
export class FormAsignancionComponent implements OnInit {
  activos: any;
  bienes: any;
  empleados: any;
  p: number = 1;
  activo: FormGroup;
  display = 'none';
  display2 = 'none';
  titulo: string;
  titulo2: string;
  vidaUtilCorrecta:boolean=false;
  //datos de informe
  @Input() noSoli: string;
  constructor(private controlService: ControlService, private _cargarScript: CargarScriptsService, private mantenimientoService: MantenimientoService) {
    this._cargarScript.cargar(["/barCode", "/ClearBarcode"]);
    this.activo = new FormGroup({
      'idBien': new FormControl("0"),
      'noSerie': new FormControl("",[Validators.required, Validators.maxLength(50)]),
      'vidaUtil': new FormControl("", [Validators.required, Validators.maxLength(2), Validators.pattern("^[0-9]+$")]),
      'idEmpleado': new FormControl("0"),
      'Responsable': new FormControl(""),
      'codigo': new FormControl(""),
      'codigoBarras': new FormControl("")
    });
  }
  ngOnInit(): void {
    this.controlService.getActivosSinAsignar().subscribe(res => { this.activos = res });
    this.controlService.listarComboAsigar().subscribe(res => { this.empleados = res })
  }
  close() {
    this.display = 'none';
  }
  asignar(id) {
    this.titulo = "Asignar nuevo activo ";
    this.activo.controls["idBien"].setValue(id);
    this.activo.controls["codigo"].setValue("");
    this.activo.controls["idEmpleado"].setValue("0");
    this.activo.controls["noSerie"].setValue("");
    // LLamar al metodo que me devuelva la vida util
    // this.controlService.getVidaUtil(id).subscribe(data=>{
    //   this.activo.controls["vidaUtil"].setValue(data.vidaUtil);
    // });
    this.activo.controls["vidaUtil"].setValue("");
    this.display = 'block';

  }
  validarVidaUtil(vida){
    var id=this.activo.controls["idBien"].value;
    this.controlService.getVidaUtil(id).subscribe(data=>{
      if(vida.value>0 &&vida.value<data.vidaUtil){
        this.vidaUtilCorrecta=true;
      }else{
        this.vidaUtilCorrecta=false;
      }
    });
   
  }
  Gcodigo() {
    if (this.activo.controls["idEmpleado"].value == 0) {
      Swal.fire({
        icon: 'error',
        title: 'ERROR',
        text: 'Seleccione un empleado para generar el codigos',
      })
    } else {
      var idempleado = this.activo.controls["idEmpleado"].value;
      var idbien = this.activo.controls["idBien"].value;
      this.controlService.GenerarCodigo(idempleado, idbien).subscribe(data => {
        var correlativoSucursal = data.correlativoSucursal;
        var correlativoArea = data.correlativoArea;
        var correlativoClasificacion = data.correlativoClasificacion;
        var correlativo = data.correlativo;
        this.activo.controls["codigo"].setValue(correlativoSucursal + "-" + correlativoArea + "-" + correlativoClasificacion + "-" + correlativo);
      });
    }
  }
  GcodigoBarra() {
    if(this.activo.controls["codigo"].value==""){
      Swal.fire({
        icon: 'error',
          title: '¡ERROR!',
        text: 'Por favor, seleccione el empleado a asignar para poder generar el código'
      })
    }else{
      this.titulo = "Codigo de barras generado";
      this.display2 = 'block';
    }
  }

  validar() {
    if (this.activo.controls["codigo"].value == "") {
      Swal.fire({
        icon: 'error',
        title: 'ERROR',
        text: 'Seleccione un empleado para generar el codigo',
      })
    }
  }
  AsignarBienes() {
    if (this.activo.valid == true) {
      if (this.activo.controls["idEmpleado"].value == 0) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: '¡Error!',
          text:'Selecciona el empleado a asignar',
          showConfirmButton: false,
          timer: 3000
        })
      } else {
        this.controlService.AsignarBien(this.activo.value).subscribe(data => {
          this.display = 'none';
          this.controlService.getActivosSinAsignar().subscribe(res => { this.activos = res });
        });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Activo asignado con éxito!',
          showConfirmButton: false,
          timer: 3000
        })

      }
    }

  }
  buscar(buscador) {
    this.p = 1;
    this.controlService.buscarActivoNoAsig(buscador.value).subscribe(res => {this.activos = res});
    }

  //PDF
  async recuperar() {
    this.mantenimientoService.listarDatosSolicitud(1).subscribe(data => {
      //alert(data.areanegocio);
      //this.noSoli=data.areanegocio;
      // this.generatePDF(data);
    });
    this.mantenimientoService.listarBienesSolicitados(1).subscribe(res => {
      this.bienes = res;

    });


  }
  // generatePDF(data) {
  //   //  this.recuperar().finally;
  //   //crea el objeto del tipo pdf marker
  //   const pdf = new PdfMakeWrapper();
  //   pdf.info({
  //     title: 'CODIGO DE QR',
  //     author: 'ASGARD',
  //     subject: 'subject of document',
  //   });
  //   //*este se usa para darle formato por defecto a todo el reporte
  //   //--------------------------
  //   //  pdf.defaultStyle({
  //   //   bold: true,
  //   //   fontSize: 15
  //   // });
  //   //------------------------
  //   //*son los margenes del reporte
  //   pdf.pageMargins([30, 50, 30, 50]);

  //   //pdf.pageMargins(40);
  //   //para crear el header
  //   //pdf.header('ASOCIACION COOPERTIVA DE APROVICIONAMIENTO AGROPECUARIO, AHORRO, CREDITO Y CONSUMO DE SAN SEBASTIAN DE RESPONSABILIDAD LIMITADA');
  //   pdf.add(new Txt('ASOCIACION COOPERTIVA DE APROVICIONAMIENTO AGROPECUARIO, AHORRO, ').fontSize(11).alignment("center").end);
  //   pdf.add(new Txt('CREDITO Y CONSUMO DE SAN SEBASTIAN DE RESPONSABILIDAD LIMITADA').fontSize(11).alignment("center").end);

  //   pdf.add(new Txt('ACASS DE R.L.').bold().fontSize(15).alignment("center").end);

  //   pdf.add(new Txt('CONTROL DE EXISTENCUAS DE MOBILIARIO, EQUIPO E INTALACIONES').bold().fontSize(13).alignment("center").end);
  //   //  pdf.add( new Txt(this.activo.controls["codigo"].value).bold().italics().decoration("underline").end);
  //   //  pdf.add(
  //   //   new QR(this.activo.controls["codigo"].value).end);


  //   // var imagen=document.getElementById("barcode");
  //   // pdf.add(
  //   //   // If no width/height/fit is used, then dimensions from the svg element is used.
  //   //   new SVG(imagen).end
  //   // );


  //   pdf.add(new Columns(['No Solicitud:' + data.noSolicitud, 'Area: ' + data.areanegocio, 'Jefe: ' + data.jefe]).end);




  //   // pdf.add(new Table([
  //   //   ['valor','Depreciacion','valor','gastos']

  //   // ]).widths([130, 125,125,120]).fontSize(10).bold().end);
  //   // new Cell([
  //   //   ['valor','Depreciacion','valor','gastos'],
  //   // ]);

  //   // pdf.add(new Table([

  //   //   ['valor','Depreciacion'],
  //   //  // 
  //   // ]).widths([275,245]).fontSize(10).bold().end);

  //   //Aqui va la tabla

  //   for (let bien of this.activos) {
  //     pdf.add(new Table(
  //       [

  //         [bien.noFormulario, bien.fechacadena, bien.desripcion, bien.marca],
  //       ]

  //     ).widths([130, 125, 125, 120]).dontBreakRows(true).fontSize(8).end);
  //   }
  //   pdf.add(new Cell(new Txt('Column 2 with colspan').bold().end).border([true]).colSpan(2)

  //     .end);


  //   //pdf.add(new Stack([ 'Hello', 'world' ]).end); // { columns: [ 'Hello', 'world' ] }
  //   let footer: any;
  //   footer = (pagenumber: number, pagecount: number) => {
  //     return {
  //       margin: [50, 5],
  //       text: 'pagina ' + pagenumber + ' de ' + pagecount,
  //       fontSize: 9
  //     };
  //   };
  //   pdf.footer(footer);
  //   //pdf.footer(function(currentPage, pageCount) { return 'pagina'+ currentPage.toString() + ' de ' + pageCount.toString(); });
  //   //informaicon del documento

  //   pdf.create().open();
  // }
  close2() {
    this.display2 = 'none';
  }

  ver() {
    var canvas = <HTMLInputElement>document.getElementById("barcode");


  }

}
