import { Component, OnInit, Input } from '@angular/core';
import { CatalogosService } from './../../services/catalogos.service';
import { CargarScriptsService} from './../../services/cargar-scripts.service';
import { ControlService } from './../../services/control.service';
import { style } from '@angular/animations'
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
declare var jQuery:any;
declare var $;
@Component({
    selector: 'app-tabla-marcas',
    templateUrl: './tabla-marcas.component.html',
    styleUrls: ['./tabla-marcas.component.css']
})
export class TablaMarcasComponent implements OnInit {
    @Input() marcas: any;
    comboProvDon:any;
    marca: FormGroup;
    formIngreso: FormGroup;
    p: number = 1;
    display = 'none';
    constructor(private catalogoService: CatalogosService, private _cargarScript:CargarScriptsService,private controlService: ControlService) {
        this._cargarScript.cargar(["/jquery.stepy","/sortingTable","/barCode"]);

        this.formIngreso = new FormGroup({
         //   'noformulario': new FormControl("0"),
         //   'nofactura': new FormControl(""),
         //   'fechaingreso': new FormControl(""),
         //   'personaentrega': new FormControl(""),
         //   'personarecibe': new FormControl(""),
        //    'observaciones': new FormControl(""),
            //////////////////////////////////// 
            'idbien': new FormControl("0"),
            'NoFormulario': new FormControl(""),
            'color': new FormControl("0"),
            'descripcion': new FormControl("0")
        });
    }
    ngOnInit() {
        this.catalogoService.getMarcas().subscribe(res => this.marcas = res);
        this.controlService.listarComboDonante().subscribe(res=> {this.comboProvDon=res});
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
    guardarDatos() {
        //Si la vandera es cero que es el que trae por defecto en el metodo open() entra en la primera a insertar
        
           
            if (this.formIngreso.valid == true) {
                this.controlService.agregarBien(this.formIngreso.value).subscribe(data => {
                });
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Dato Guardado con éxito',
                    showConfirmButton: false,
                    timer: 3000
                })
            }
            
        
    }
  
  
}
