import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Txt, Img, Columns, Stack, Table, Cell, Canvas, Rect, SVG} from 'pdfmake-wrapper';
import { CatalogosService } from './../../services/catalogos.service';
import { ConfiguracionService } from './../../services/configuracion.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CargarScriptsService } from './../../services/cargar-scripts.service';
@Component({
  selector: 'app-reportes-catalogos',
  templateUrl: './reportes-catalogos.component.html',
  styleUrls: ['./reportes-catalogos.component.css']
})
export class ReportesCatalogosComponent implements OnInit {
  //Variables  
  //Catálogos
  cargos: any;
  sucursales: any;
  areas: any;
  cargo: FormGroup;
  cooperativas: any;
  categorias: any;
  categoria: FormGroup;
  clasificaciones: any;
  clasificacion: FormGroup;
  empleados:any;
  empleado:FormGroup;
  donantes: any;
  donante: FormGroup;
  proveedores: any;
  proveedor: FormGroup;
  

  //Fecha
  fecha=new Date();
  //división de fecha y hora
  anio=this.fecha.getFullYear();
  mes=this.fecha.getMonth()+1;
  dia=this.fecha.getDate();
  hora=this.fecha.getHours();
  minuto=this.fecha.getMinutes();
  segundo= this.fecha.getSeconds();

  //Colores personalizados
  private blackA: string='#000000';
  constructor(private catalogoService: CatalogosService, private _cargarScript: CargarScriptsService,
    private confiService:ConfiguracionService) {
    this._cargarScript.cargar(["/barCode", "/ClearBarcode"]);
    
   }

  ngOnInit(): void {
    this.catalogoService.getCargo().subscribe(data=> {this.cargos=data});
    this.catalogoService.getCategorias().subscribe(data=> {this.categorias=data});
    this.catalogoService.getClasificacion().subscribe(data => { this.clasificaciones = data });
    this.catalogoService.getEmpleado().subscribe(data => { this.empleados = data;});
    this.catalogoService.getDonantes().subscribe(data => { this.donantes = data });
    this.catalogoService.getProveedores().subscribe(res => { this.proveedores = res });
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



    this.confiService.getLogoCoop().subscribe(param=>{
      new Img(param.logo).height(50).width(65).build().then(img=> {

        pdf2.add(img);
        pdf2.create().open();
      });
    });

 
  //  pdf2.create().download();
  //pdf2.create().open();

 
  }

  //Métodos para reportes de catálogos
  async   cargosPdf() {
    const pdf=new PdfMakeWrapper();

    //Agregamos el logo
    this.confiService.getLogoCoop().subscribe(param=>{
      new Img(param.logo).relativePosition(0,-255).height(50).width(65).build().then(img=> {

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
      new Txt('Catálogo de Cargos').alignment('center').italics().bold().end
    );
    //Cadena para la fecha y hora
    pdf.add(new Txt('Fecha: ' + this.dia.toString() + '/' + this.mes.toString() + '/' + this.anio.toString()).end);
    pdf.add(new Txt('Hora: ' + this.hora.toString() + ':' + this.minuto.toString() + ':' +  this.segundo.toString()).end);

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
      title:'Cargos',
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

  async sucursalesPdf() {
    const pdf=new PdfMakeWrapper();

    //Agregamos el logo
    this.confiService.getLogoCoop().subscribe(param=>{
      new Img(param.logo).relativePosition(0,-235).height(50).width(65).build().then(img=> {

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
      new Txt('Catálogo de Sucursales').alignment('center').italics().bold().end
    );
    //Cadena para la fecha y hora
    pdf.add(new Txt('Fecha: ' + this.dia.toString() + '/' + this.mes.toString() + '/' + this.anio.toString()).end);
    pdf.add(new Txt('Hora: ' + this.hora.toString() + ':' + this.minuto.toString() + ':' +  this.segundo.toString()).end);

    pdf.add(pdf.ln(1));

     //Agrego la tabla
     pdf.add(
       new Table([
         [ 'CORRELATIVO', 'NOMBRE DE SUCURSAL', 'UBICACIÓN']
     ]).bold().widths([ 110, '*', 140]).alignment('center').end
     );

     //Método para listar
     this.catalogoService.getSucursales().subscribe(data=>{this.sucursales=data
     //Recorro la lista con el for
     for (let sucursal of this.sucursales) {
        pdf.add(new Table(
          [
           //Lleno las celdas con la lista recorrida
           [sucursal.correlativo, sucursal.nombre, sucursal.ubicacion],
         ]
 
       ).widths([ 110, '*', 140]).end);
    };
  });
      pdf.info( {
        title:'Sucursales',
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


  //Reporte área de negocio
  async   areasPdf() {
    const pdf=new PdfMakeWrapper();

    //Agregamos el logo
    this.confiService.getLogoCoop().subscribe(param=>{
      new Img(param.logo).relativePosition(0,-470).height(50).width(65).build().then(img=> {

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
      new Txt('Catálogo de Áreas de negocio').alignment('center').italics().bold().end
    );
    //Cadena para la fecha y hora
    pdf.add(new Txt('Fecha: ' + this.dia.toString() + '/' + this.mes.toString() + '/' + this.anio.toString()).end);
    pdf.add(new Txt('Hora: ' + this.hora.toString() + ':' + this.minuto.toString() + ':' +  this.segundo.toString()).end);

    pdf.add(pdf.ln(1));

     //Agrego la tabla
     pdf.add(
      new Table([
        [ 'CORRELATIVO', 'NOMBRE DE ÁREA', 'NOMBRE DE SUCURSAL', 'UBICACIÓN']
    ]).bold().widths([100, 150,'*','*']).alignment('center').end
    );

    //Llamo al método listar
    this.catalogoService.getAreas().subscribe(data=> {this.areas=data
    //Recorro la lista con el for
  for (let area of this.areas) {
       pdf.add(new Table(
         [
          //Lleno las celdas con la lista recorrida
          [area.correlativo, area.nombre, area.nombreSucursal, area.ubicacion],
        ]

      ).widths([100, 150,'*','*']).end);
   };
  });

    pdf.info( {
      title:'Area de negocio',
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

   // pdf.watermark('ACAASS');

    //pdf.create().open();
  }
  //Métodos para reportes de categorias

  //cate

//INICIO DE REPORTE DE CATEGORIAS
  async   categoriasPdf() {
    const pdf=new PdfMakeWrapper();

  //Agregamos el logo
  this.confiService.getLogoCoop().subscribe(param=>{
    new Img(param.logo).relativePosition(0,-230).height(50).width(65).build().then(img=> {

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
      new Txt('Reporte de categorias').alignment('center').italics().bold().end
    );
    //Cadena para la fecha y hora
    pdf.add(new Txt('Fecha: ' + this.dia.toString() + '/' + this.mes.toString() + '/' + this.anio.toString()).end);
    pdf.add(new Txt('Hora: ' + this.hora.toString() + ':' + this.minuto.toString() + ':' +  this.segundo.toString()).end);

    pdf.add(pdf.ln(1));

     //Agrego la tabla
     pdf.add(
      new Table([
        [ 'CATEGORIA', 'VIDA ÚTIL', 'DESCRIPCIÓN']
    ]).bold().widths([ 110,60,'*']).alignment('center').end
    );

    //Llamo al método listar
    this.catalogoService.getCategorias().subscribe(data=> {this.categorias=data
    //Recorro la lista con el for
  for (let categoria of this.categorias) {
       pdf.add(new Table(
         [
          //Lleno las celdas con la lista recorrida
          [categoria.categoria, categoria.vidaUtil, categoria.descripcion],
        ]

      ).widths([ 110,60, '*' ]).end);
   };
  });

    pdf.info( {
      title:'Categorías',
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

   // pdf.watermark('ACAASS');

    //pdf.create().open();
  }
  //FIN DE REPORTE DE CATEGORIAS

  //INICIO DE CLASIFICACIONES
  async   clasificacionesPdf() {
    const pdf=new PdfMakeWrapper();

    //Agregamos el logo
    this.confiService.getLogoCoop().subscribe(param=>{
      new Img(param.logo).relativePosition(0,-530).height(50).width(65).build().then(img=> {

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
      new Txt('Reporte de Clasificaciones').alignment('center').italics().bold().end
    );
    //Cadena para la fecha y hora
    pdf.add(new Txt('Fecha: ' + this.dia.toString() + '/' + this.mes.toString() + '/' + this.anio.toString()).end);
    pdf.add(new Txt('Hora: ' + this.hora.toString() + ':' + this.minuto.toString() + ':' +  this.segundo.toString()).end);

    pdf.add(pdf.ln(1));

    //Llamo al método listar
    this.catalogoService.getCargo().subscribe(data=> {this.cargos=data});

    //Agrego la tabla
    pdf.add(
      new Table([
        [ 'CORRELATIVO','CLASIFICACION','CATEGORIA', 'DESCRIPCIÓN']
    ]).bold().widths([100, 150,'*','*']).alignment('center').end
    );
    //Recorro la lista con el for
  for (let clasificacion of this.clasificaciones) {
       pdf.add(new Table(
         [
          //Lleno las celdas con la lista recorrida
          [clasificacion.correlativo, clasificacion.clasificacion, clasificacion.categoria, clasificacion.descripcion],
        ]

      ).widths([ 100, 150,'*','*']).end);
   };

    pdf.info( {
      title:'Clasificaciones',
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
  //FIN DE REPORTE CLASIFICACIONES
  
  //INICIO DE REPORTE EMPLEADOS
  async   empleadossPdf() {
    const pdf=new PdfMakeWrapper();

    //Agregamos el logo
    this.confiService.getLogoCoop().subscribe(param=>{
      new Img(param.logo).relativePosition(0,-660).height(50).width(65).build().then(img=> {

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
      new Txt('Reporte de Empleados').alignment('center').italics().bold().end
    );
    //Cadena para la fecha y hora
    pdf.add(new Txt('Fecha: ' + this.dia.toString() + '/' + this.mes.toString() + '/' + this.anio.toString()).end);
    pdf.add(new Txt('Hora: ' + this.hora.toString() + ':' + this.minuto.toString() + ':' +  this.segundo.toString()).end);

    pdf.add(pdf.ln(1));

    //Llamo al método listar
    this.catalogoService.getEmpleado().subscribe(data => {this.empleados = data;});

    //Agrego la tabla
    pdf.add(
      new Table([
        [ 'DUI','NOMBRE', 'DIRECCIÓN', 'TELÉFONO', 'ÁREA DE NEGOCIO', 'CARGO' ]
    ]).bold().widths([ 65,'*','*',60,'*',50]).alignment('center').end
    );
    //Recorro la lista con el for
  for (let empleado of this.empleados) {
       pdf.add(new Table(
         [
          //Lleno las celdas con la lista recorrida
          [empleado.dui, empleado.nombres+'  '+empleado.apellidos, empleado.direccion, empleado.telefono, empleado.nombrearea +" - "+ empleado.nombresucursal+" - "+ empleado.ubicacion, empleado.cargo],
        ]

      ).widths([ 65,'*','*',60,'*',50]).end);
   };

    pdf.info( {
      title:'Empleados',
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
  //FIN DE REPORTE EMPLEADOS

  //INICIO DE REPORTE DE DONANTES
  async   donantesPdf() {
    const pdf=new PdfMakeWrapper();

    //Agregamos el logo
    this.confiService.getLogoCoop().subscribe(param=>{
      new Img(param.logo).relativePosition(0,-210).height(50).width(65).build().then(img=> {

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
      new Txt('Reporte de donantes').alignment('center').italics().bold().end
    );
    //Cadena para la fecha y hora
    pdf.add(new Txt('Fecha: ' + this.dia.toString() + '/' + this.mes.toString() + '/' + this.anio.toString()).end);
    pdf.add(new Txt('Hora: ' + this.hora.toString() + ':' + this.minuto.toString() + ':' +  this.segundo.toString()).end);

    pdf.add(pdf.ln(1));

    //Llamo al método listar
    this.catalogoService.getDonantes().subscribe(data => { this.donantes = data });

    //Agrego la tabla
    pdf.add(
      new Table([
        [ 'NOMBRE','TELEFONO','DIRECCIÓN']
    ]).bold().widths(['*', 80,'*']).alignment('center').end
    );
    //Recorro la lista con el for
  for (let donante of this.donantes) {
       pdf.add(new Table(
         [
          //Lleno las celdas con la lista recorrida
          [donante.nombre, donante.telefono, donante.direccion],
        ]

      ).widths([ '*', 80,'*']).end);
   };

    pdf.info( {
      title:'Donantes',
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
  //FIN DE REPORTE DE DONANTES

  //INICIO DE REPORTE DE PROVEEDORES
  async   proveedoresPdf() {
    const pdf=new PdfMakeWrapper();

    //Agregamos el logo
    this.confiService.getLogoCoop().subscribe(param=>{
      new Img(param.logo).relativePosition(0,-370).height(50).width(65).build().then(img=> {

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
      new Txt('REPORTE DE PROVEEDORES').alignment('center').italics().bold().end
    );
    //Cadena para la fecha y hora
    pdf.add(new Txt('Fecha: ' + this.dia.toString() + '/' + this.mes.toString() + '/' + this.anio.toString()).end);
    pdf.add(new Txt('Hora: ' + this.hora.toString() + ':' + this.minuto.toString() + ':' +  this.segundo.toString()).end);

    pdf.add(pdf.ln(1));

    //Llamo al método listar
    this.catalogoService.getProveedores().subscribe(res => { this.proveedores = res });

    //Agrego la tabla
    pdf.add(
      new Table([
        [ 'NOMBRES','TELÉFONO', 'DIRECCIÓN', 'RUBRO', 'ENCARGADO', 'TELÉFONO ENCARGADO' ]
    ]).bold().widths([ '*',65,'*',80,'*','*']).alignment('center').end
    );
    //Recorro la lista con el for
  for (let proveedor of this.proveedores) {
       pdf.add(new Table(
         [
          //Lleno las celdas con la lista recorrida
          [proveedor.nombre, proveedor.telefono, proveedor.direccion, proveedor.rubro, proveedor.encargado, proveedor.telefonoencargado],
        ]

      ).widths([ '*',65,'*',80,'*','*']).end);
   };

    pdf.info( {
      title:'Proveedores',
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
  //FIN DE REPORTE DE PROVEEDORES

}
