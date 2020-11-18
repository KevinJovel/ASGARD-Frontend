import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Txt, Img, Columns, Stack, Table, Cell, Canvas, Rect, SVG} from 'pdfmake-wrapper';
import { CatalogosService } from './../../services/catalogos.service';
import { ConfiguracionService } from './../../services/configuracion.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CargarScriptsService } from './../../services/cargar-scripts.service';

@Component({
  selector: 'app-menu-reportes',
  templateUrl: './menu-reportes.component.html',
  styleUrls: ['./menu-reportes.component.css']
})
export class MenuReportesComponent implements OnInit {



  constructor(private catalogoService: CatalogosService, private _cargarScript: CargarScriptsService,
    private confiService:ConfiguracionService) {
    this._cargarScript.cargar(["/barCode", "/ClearBarcode"]);
    
   }

  ngOnInit() {
 
  }
}
