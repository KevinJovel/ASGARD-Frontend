import { Component, OnInit, Input } from '@angular/core';
import { CatalogosService } from './../../services/catalogos.service';
import { CargarScriptsService} from './../../services/cargar-scripts.service';
import { style } from '@angular/animations'
import { FormGroup, FormControl } from '@angular/forms';
declare var jQuery:any;
declare var $;
@Component({
    selector: 'app-tabla-marcas',
    templateUrl: './tabla-marcas.component.html',
    styleUrls: ['./tabla-marcas.component.css']
})
export class TablaMarcasComponent implements OnInit {
    @Input() marcas: any;
    marca: FormGroup;

    p: number = 1;
    display = 'none';
    constructor(private catalogoService: CatalogosService, private _cargarScript:CargarScriptsService) {
        this._cargarScript.cargar(["/jquery.stepy","/SortingTable"]);
       
    }
    ngOnInit() {
        this.catalogoService.getMarcas().subscribe(res => this.marcas = res);
    }
    open() {
        this.display = 'block';
    }
    close() {
        this.display = 'none';
    }
    modif(id) {

        this.display = 'block';
        this.catalogoService.recuperarMarcas(id).subscribe(data => {
            alert(data.idMarca);
            alert(data.marca);
            alert(data.descripcion);
            this.marca = new FormGroup({
                'marc': new FormControl(""+data.marca)
            });
            
            //this.marca.controls["idMarca"].setValue(data.idMarca);
            //this.marca.controls["marc"].setValue("123");
            //this.marca.controls["descripcion"].setValue(data.descripcion);
            
        });
    }
    guardarDatos(){
        
    }

}
