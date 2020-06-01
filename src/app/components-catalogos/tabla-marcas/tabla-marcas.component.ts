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
    sucursal: FormGroup;
    p: number = 1;
    display = 'none';
    constructor(private catalogoService: CatalogosService, private _cargarScript:CargarScriptsService,private controlService: ControlService) {
        this._cargarScript.cargar(["/jquery.stepy","/sortingTable","/barCode"]);

        this.sucursal = new FormGroup({
            'idSucursal': new FormControl("0"),
            'idTipo': new FormControl("0"),
            'idCombo': new FormControl("0"),
            'nombre': new FormControl(""),
            'ubicacion': new FormControl(""),
            'correlativo': new FormControl("")
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
        
           
            if (this.sucursal.valid == true) {
                this.catalogoService.setSucursal(this.sucursal.value).subscribe(data => {
                });
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Dato Guardado con exito',
                    showConfirmButton: false,
                    timer: 3000
                })
            }
            
        
    }
    ProveedorDonante(){
        var idempleado=this.sucursal.controls["idTipo"].value;
        if(idempleado==1){
            this.controlService.listarComboProveedor().subscribe(res=> {this.comboProvDon=res});
        }
       
    }
  
}
