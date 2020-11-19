import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Txt, Img, Columns, Stack, Table, Cell, Canvas, Rect, SVG} from 'pdfmake-wrapper';
import { ConfiguracionService } from './../../services/configuracion.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CargarScriptsService } from './../../services/cargar-scripts.service';
import { MantenimientoService } from './../../services/mantenimiento.service';
import { info } from 'console';
@Component({
  selector: 'app-reportes-mantenimiento',
  templateUrl: './reportes-mantenimiento.component.html',
  styleUrls: ['./reportes-mantenimiento.component.css']
})
export class ReportesMantenimientoComponent implements OnInit {
  //Fecha
  fecha=new Date();
  //división de fecha y hora
  anio=this.fecha.getFullYear();
  mes=this.fecha.getMonth()+1;
  dia=this.fecha.getDate();
  hora=this.fecha.getHours();
  minuto=this.fecha.getMinutes();
  segundo= this.fecha.getSeconds();

  //variables
  solicitudes: any;
  solicitud: FormGroup;
  informes: any;
  informe: FormGroup;

  //Colores personalizados
  private blackA: string='#000000';
  constructor(private mantenimientoService: MantenimientoService, private _cargarScript: CargarScriptsService,
    private confiService:ConfiguracionService) {
    this._cargarScript.cargar(["/barCode", "/ClearBarcode"]);
    }
  

  ngOnInit(): void {
    this.mantenimientoService.getSolicitudMantenimiento().subscribe(data=>{ this.solicitudes=data;});
    this.mantenimientoService.ListarInformeMantenimiento().subscribe(res => {this.informes = res;});
  }
  pixel(x:number, y: number, color: string) {
    return new Rect([x,y],[516,2]).color(color).end;
  }

  //INICIO DE REPORTE DE SOLICITUDES DE MANTENIMIENTO
  async   solicitudesmantenimientoPdf() {
    const pdf=new PdfMakeWrapper();

    //Agregamos el logo
    this.confiService.getLogoCoop().subscribe(param=>{
      new Img(param.logo).relativePosition(0,-185).height(50).width(65).build().then(img=> {

        pdf.add(img);
        pdf.create().open();
      });
    });

    //Encabezado
     pdf.add(new Txt('ASOCIACIÓN COOPERTIVA DE APROVICIONAMIENTO AGROPECUARIO, AHORRO, ').bold().fontSize(10).alignment("center").end);
     pdf.add(new Txt('CRÉDITO Y CONSUMO DE SAN SEBASTIÁN DE RESPONSABILIDAD LIMITADA').bold().fontSize(10).alignment("center").end);
     pdf.add(new Txt('ACAASS DE R.L.').bold().fontSize(15).alignment("center").end);

     //Salto de línea
     pdf.add(pdf.ln(1));

     //Línea de color
     pdf.add(
     pdf.add(
       new Canvas([
         this.pixel(1,1,this.blackA)
       ]).end
     ) 
  );
  
    //Salto de línea
    pdf.add(pdf.ln(1));
    pdf.add(
      new Txt('Reporte de solicitudes de mantenimiento').alignment('center').italics().bold().end
    );
    //Cadena para la fecha y hora
    pdf.add(new Txt('Fecha: ' + this.dia.toString() + '/' + this.mes.toString() + '/' + this.anio.toString()).end);
    pdf.add(new Txt('Hora: ' + this.hora.toString() + ':' + this.minuto.toString() + ':' +  this.segundo.toString()).end);

    pdf.add(pdf.ln(1));

    //Llamo al método listar
    this.mantenimientoService.getSolicitudMantenimiento().subscribe(data=>{ this.solicitudes=data;});

    //Agrego la tabla
    pdf.add(
      new Table([
        [ 'FOLIO','FECHA','DESCRIPCIÓN']
    ]).bold().widths([70, 80,'*']).alignment('center').end
    );
    //Recorro la lista con el for
  for (let solicitud of this.solicitudes) {
       pdf.add(new Table(
         [
          //Lleno las celdas con la lista recorrida
          [solicitud.folio, solicitud.fechacadena, solicitud.descripcion],
        ]

      ).widths([ 70, 80,'*']).end);
   };

    pdf.info( {
      title:'Solciitudes de mantenimiento',
      author:'ASGARD',
      subject:'Documento informativo',
    });

    //paginado
    let footer: any;
       footer = (pagenumber: number, pagecount: number) => {
         return {
           margin: [50, 5],
           text: 'página ' + pagenumber + ' de ' + pagecount,
           fontSize: 9
         };
       };
       pdf.footer(footer);
  }
  //FIN DE REPORTE DE SOLICITUDES EN MANTENIMIENTO.
  //INIIO DE REPORTE DE INFORMES DE MANTENIMIENTO.
  async   informesmantenimientoPdf() {
    const pdf=new PdfMakeWrapper();

    //Agregamos el logo
    this.confiService.getLogoCoop().subscribe(param=>{
      new Img(param.logo).relativePosition(0,-270).height(50).width(65).build().then(img=> {

        pdf.add(img);
        pdf.create().open();
      });
    });

    //Encabezado
     pdf.add(new Txt('ASOCIACIÓN COOPERTIVA DE APROVICIONAMIENTO AGROPECUARIO, AHORRO, ').bold().fontSize(10).alignment("center").end);
     pdf.add(new Txt('CRÉDITO Y CONSUMO DE SAN SEBASTIÁN DE RESPONSABILIDAD LIMITADA').bold().fontSize(10).alignment("center").end);
     pdf.add(new Txt('ACAASS DE R.L.').bold().fontSize(15).alignment("center").end);

     //Salto de línea
     pdf.add(pdf.ln(1));

     //Línea de color
     pdf.add(
     pdf.add(
       new Canvas([
         this.pixel(1,1,this.blackA)
       ]).end
     ) 
  );
  
    //Salto de línea
    pdf.add(pdf.ln(1));
    pdf.add(
      new Txt('Reporte de informes de mantenimiento').alignment('center').italics().bold().end
    );
    //Cadena para la fecha y hora
    pdf.add(new Txt('Fecha: ' + this.dia.toString() + '/' + this.mes.toString() + '/' + this.anio.toString()).end);
    pdf.add(new Txt('Hora: ' + this.hora.toString() + ':' + this.minuto.toString() + ':' +  this.segundo.toString()).end);

    pdf.add(pdf.ln(1));

    //Llamo al método listar
    this.mantenimientoService.ListarInformeMantenimiento().subscribe(res => {this.informes = res;});

    //Agrego la tabla
    pdf.add(
      new Table([
        ['FECHA','DESCRIPCIÓN','TÉCNICO','COSTO MANO DE OBRA','COSTO MATERIALES','COSTO TOTAL','DESCRIPCIÓN DE INFORME']
    ]).bold().widths([65,80,75,60,60,50,90]).alignment('center').end
    );
    //Recorro la lista con el for
  for (let informe of this.informes) {
       pdf.add(new Table(
         [
          //Lleno las celdas con la lista recorrida
          [informe.fechacadena, informe.bienes, informe.nombretecnico, informe.costomo ,informe.costomateriales, informe.costototal, informe.descripcion],
        ]

      ).widths([65,80,75,60,60,50,90]).end);
   };

    pdf.info( {
      title:'Informes de mantenimiento',
      author:'ASGARD',
      subject:'Documento informativo',
    });

    //paginado
    let footer: any;
       footer = (pagenumber: number, pagecount: number) => {
         return {
           margin: [50, 5],
           text: 'página ' + pagenumber + ' de ' + pagecount,
           fontSize: 9
         };
       };
       pdf.footer(footer);
  }
  //FIN DE REPORTE DE INFORMES DE MANTENIMIENRO.
 
}
