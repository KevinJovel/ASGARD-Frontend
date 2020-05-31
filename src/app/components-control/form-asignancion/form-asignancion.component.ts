import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ControlService } from './../../services/control.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form-asignancion',
  templateUrl: './form-asignancion.component.html',
  styleUrls: ['./form-asignancion.component.css']
})
export class FormAsignancionComponent implements OnInit {
  activos: any;
  p: number = 1;
  sucursal: FormGroup;
  display = 'none';
  titulo: string;
  constructor(private controlService: ControlService) { }

  ngOnInit(): void {
    this.controlService.getActivosSinAsignar().subscribe(res => {this.activos = res});
  }
open(){

}
close(){

}
asignar(id){

}

guardarDatos(){

}
buscar(nombre){}
}
