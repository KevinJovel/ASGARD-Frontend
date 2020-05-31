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
  empleados: any;
  p: number = 1;
  activo: FormGroup;
  display = 'none';
  display2 = 'none';
  titulo: string;
  titulo2: string;
  constructor(private controlService: ControlService) { 
    this.activo = new FormGroup({
      'idBien': new FormControl("0"),
      'noSerie': new FormControl(""),
      'vidaUtil': new FormControl(""),
      'Responsable': new FormControl(""),
      'codigo': new FormControl(""),
      'codigoBarras':new FormControl(""),
  });

  }

  ngOnInit(): void {
    this.controlService.getActivosSinAsignar().subscribe(res => {this.activos = res});
    this.controlService.listarComboAsigar().subscribe(res=> {this.empleados=res})
  }
close2(){
  this.display2 = 'none';
}
Gcodigo(){
  
}
GcodigoBarras(){
  this.titulo2= "Codigo de Barras ";
  this.display2 = 'block';
}
close(){
  this.display = 'none';
}
asignar(id){
  //limpia cache
  this.titulo = "Asignar nuevo bien ";
  this.display = 'block';
}

guardarDatos(){

}
buscar(nombre){}
}
