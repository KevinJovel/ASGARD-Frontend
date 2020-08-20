import { Component, OnInit } from '@angular/core';
import { ConfiguracionService } from './../../services/configuracion.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-cooperativa',
  templateUrl: './form-cooperativa.component.html',
  styleUrls: ['./form-cooperativa.component.css']
})
export class FormCooperativaComponent implements OnInit {

  //Variables
  cooperativa: FormGroup;
  cooperativas: any;
  display = 'none';
  p: number = 1;

  constructor( private configuracionService: ConfiguracionService) { 

    this.cooperativa =new FormGroup( {

      'idcooperativa': new FormControl("0"),
      'bandera': new FormControl("0"),
      'nombre': new FormControl(""),
      'descripcion': new FormControl("")

    });
  }

  ngOnInit() {
    console.log("Una prueba");
    this.configuracionService.getCooperativa().subscribe(data => { this.cooperativas = data });
  }

  //Métodos   
  open() {
    //Limpiar
    this.cooperativa.controls["iidDonante"].setValue("0");
    this.cooperativa.controls["bandera"].setValue("0");
    this.cooperativa.controls["nombre"].setValue("");
    this.cooperativa.controls["telefono"].setValue("");
    this.cooperativa.controls["direccion"].setValue("");
      this.display = 'block';
  }

  close() {
    this.display = 'none';
  }

  buscar(buscador) {
   
  }

}
