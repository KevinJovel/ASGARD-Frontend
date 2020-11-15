import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Txt, Img, Columns, Stack, Table, Cell, Canvas, Rect, SVG} from 'pdfmake-wrapper';
import { CatalogosService } from './../../services/catalogos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CargarScriptsService } from './../../services/cargar-scripts.service';

@Component({
  selector: 'app-menu-reportes',
  templateUrl: './menu-reportes.component.html',
  styleUrls: ['./menu-reportes.component.css']
})
export class MenuReportesComponent implements OnInit {
  //Variables  
  cargos: any;
  cargo: FormGroup;

  //Fecha
  fecha=new Date();
  //división de fecha y hora
  anio=this.fecha.getFullYear();
  mes=this.fecha.getMonth()+1;
  dia=this.fecha.getDate();
  hora=this.fecha.getHours();
  minuto=this.fecha.getMinutes();

  //Colores personalizados
  private greenA: string='#72b05e';

  constructor(private catalogoService: CatalogosService, private _cargarScript: CargarScriptsService) {
    this._cargarScript.cargar(["/barCode", "/ClearBarcode"]);
    
   }

  ngOnInit() {

    this.catalogoService.getCargo().subscribe(data=> {this.cargos=data});
    console.log(this.anio);
 
  }

  pixel(x:number, y: number, color: string) {
    return new Rect([x,y],[516,2]).color(color).end;
  }

  async nuevoPDF() {
    const pdf2=new PdfMakeWrapper();

    //this.catalogoService.getCargo().subscribe(data=> {this.cargos=data});
    pdf2.add(
      new Table([
        [ 'CARGO', 'DESCRIPCIÓN'],
        [ 'column 1', 'column 2']
    ]).widths([ 100, '*' ]).end
    );
    pdf2.add(pdf2.ln(1));

    
    pdf2.add(new Txt('Catalogo de Cargos').alignment('center').italics().bold().end);
    new Img('https://cnet1.cbsistatic.com/img/3mBx3b_MTqrK-Xch7i8faHeAMnk=/940x0/2020/06/22/fe14f6c1-da70-4068-b0c7-0703e29bd802/apple-macos-bigsur-redesignedapps-06222020.jpg').height(45).width(60).build().then( img => {
    pdf2.add( img );
 
  //  pdf2.create().download();
  pdf2.create().open();
});
 
  }

  async   generatePDF() {
    const pdf=new PdfMakeWrapper();

    //Agregamos el logo
    new Img('data:image/jpeg;base64,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').relativePosition(0,-270).height(50).width(65).build().then( img => {
    pdf.add( img );
 
    //  pdf2.create().download();
    pdf.create().open();
      });


    //Encabezado
     pdf.add(new Txt('ASOCIACION COOPERTIVA DE APROVICIONAMIENTO AGROPECUARIO, AHORRO, ').bold().color('green').fontSize(10).alignment("center").end);
     pdf.add(new Txt('CREDITO Y CONSUMO DE SAN SEBASTIAN DE RESPONSABILIDAD LIMITADA').bold().color('green').fontSize(10).alignment("center").end);
     pdf.add(new Txt('ACASS DE R.L.').bold().fontSize(15).color('green').alignment("center").end);

     //Salto de línea
     pdf.add(pdf.ln(1));

     //Línea de color
     pdf.add(
     pdf.add(
       new Canvas([
         this.pixel(1,1,this.greenA)
       ]).end
     ) 
  );
  
    //Salto de línea
    pdf.add(pdf.ln(1));
    pdf.add(
      new Txt('Catalogo de Cargos').alignment('center').italics().bold().end
    );
    //Cadena para la fecha y hora
    pdf.add(new Txt('Fecha: ' + this.dia.toString() + '/' + this.mes.toString() + '/' + this.anio.toString() + ' | ' + this.hora.toString() + ':' + this.minuto.toString()).end);
    pdf.add(pdf.ln(1));
    //Llamo al método listar
    this.catalogoService.getCargo().subscribe(data=> {this.cargos=data});
    //Agrego la tabla
    pdf.add(
      new Table([
        [ 'CARGO', 'DESCRIPCIÓN']
    ]).bold().widths([ 100, '*' ]).alignment('center').end
    );
    //Recorro la lista con el for
  for (let cargo of this.cargos) {
       pdf.add(new Table(
         [
          //Lleno las celdas con la lista recorrida
          [cargo.cargo, cargo.descripcion],
        ]

      ).widths([ 100, '*' ]).end);
   };

    pdf.info( {
      title:'Catalogos',
      author:'ASGARD',
      subject:'Documento informativo',
    });
   // pdf.watermark('ACAASS');

    //pdf.create().open();
  }
}
