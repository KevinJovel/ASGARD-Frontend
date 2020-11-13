import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Txt, Img, Columns, Stack, Table, Cell, Canvas, Rect} from 'pdfmake-wrapper';
import { CatalogosService } from './../../services/catalogos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu-reportes',
  templateUrl: './menu-reportes.component.html',
  styleUrls: ['./menu-reportes.component.css']
})
export class MenuReportesComponent implements OnInit {
  //Variables  
  cargos: any;
  cargo: FormGroup;

  //Colores personalizados
  private greenA: string='#72b05e';

  constructor(private catalogoService: CatalogosService) {
   }

  ngOnInit() {

    this.catalogoService.getCargo().subscribe(data=> {this.cargos=data});
 
  }

  pixel(x:number, y: number, color: string) {
    return new Rect([x,y],[516,2]).color(color).end;
  }

    generatePDF() {
    const pdf=new PdfMakeWrapper();

    //Encabezado
     pdf.add(new Txt('ASOCIACION COOPERTIVA DE APROVICIONAMIENTO AGROPECUARIO, AHORRO, ').bold().color('green').fontSize(11).alignment("center").end);
     pdf.add(new Txt('CREDITO Y CONSUMO DE SAN SEBASTIAN DE RESPONSABILIDAD LIMITADA').bold().color('green').fontSize(11).alignment("center").end);
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

   // pdf.add(
  //    new Table([
  //      [ 'column 1', 'column 2'],
 //       [ 'column 1', 'column 2']
  //  ]).widths([ '*', 100 ]).end
  //  );
    

   // pdf.header('This is a header');
   // pdf.footer('This is a footer');
   // pdf.background('This is a background');

    pdf.info( {
      title:'Catalogos',
      author:'ASGARD',
      subject:'Documento informativo',
    });
   // pdf.watermark('ACAASS');

   // pdf . watermark ( new Txt ( ' ACAASS ' ) . color ( ' azul ' ) . end )    ;
   
  
 
    
    pdf.create().open();
  }
}
