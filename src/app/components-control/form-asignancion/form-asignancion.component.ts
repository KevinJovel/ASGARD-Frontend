import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ControlService } from './../../services/control.service';
import { CargarScriptsService} from './../../services/cargar-scripts.service';
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
  constructor(private controlService: ControlService, private _cargarScript:CargarScriptsService) { 
    this._cargarScript.cargar(["/barCode","/ClearBarcode"]);
    this.activo = new FormGroup({
      'idBien': new FormControl("0"),
      'noSerie': new FormControl(""),
      'vidaUtil': new FormControl(""),
      'idEmpleado':new FormControl("0"),
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
  if(this.activo.controls["idEmpleado"].value==0){
    Swal.fire({
      icon: 'error',
      title: 'ERROR',
      text: 'Seleccione un empleado para generar el codigos',
    
    })  
  }else{
    var idempleado=this.activo.controls["idEmpleado"].value;
    var idbien=this.activo.controls["idBien"].value;
    this.controlService.GenerarCodigo(idempleado,idbien).subscribe(data=>{
      var correlativoSucursal=data.correlativoSucursal;
      var correlativoArea=data.correlativoArea;
      var correlativoClasificacion=data.correlativoClasificacion;
      var correlativo=data.correlativo;

      this.activo.controls["codigo"].setValue(correlativoSucursal+"-"+correlativoArea+"-"+correlativoClasificacion+"-"+correlativo);
    });
  }
  
}
validar(){
  if(this.activo.controls["codigo"].value==""){
    Swal.fire({
      icon: 'error',
      title: 'ERROR',
      text: 'Seleccione un empleado para generar el codigo',
     
    })  
  }
 
}
close(){
  this.display = 'none';
}
asignar(id){
 
  this.titulo = "Asignar nuevo bien ";
  this.activo.controls["idBien"].setValue(id);
  this.activo.controls["codigo"].setValue("");
  this.activo.controls["idEmpleado"].setValue("0");
  this.display = 'block';
}

guardarDatos(){

}
buscar(nombre){}
}
