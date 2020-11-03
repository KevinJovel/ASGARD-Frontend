import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MantenimientoService } from './../../services/mantenimiento.service';
import { ControlService } from './../../services/control.service';

@Component({
  selector: 'app-tabla-informe',
  templateUrl: './tabla-informe.component.html',
  styleUrls: ['./tabla-informe.component.css']
})
export class TablaInformeComponent implements OnInit {
  solicitudes: any;
  bienes: any;
  Phone: any;
  tecnicos:any;
  p: number = 1;
  informe: FormGroup;
  display = 'none';
  titulo: string;
  noSolicitud: string;
  jefe: string;
  area:string;
  idmante: any;
  cotomo: any;
  costomateriales: any;
  costototal: any;
  fechaMaxima: any;
  fechaMinima: any;
 // fecha = Date.now();
  
  constructor(private mantenimientoService: MantenimientoService, private controlService: ControlService) { 
    this.informe=new FormGroup({
      'idinformematenimiento': new FormControl("0"),
      'idmantenimiento': new FormControl("0"),
      'idBien': new FormControl("0"),
      'idtecnico': new FormControl("0",[Validators.required]),
      //'idBien': new FormControl("0"),
      'descripcion':new FormControl("",[Validators.required,Validators.maxLength(100),Validators.pattern("^[0-9-a-zA-ZñÑáéíóúÁÉÍÓÚ,. ]+$")]),
      'costomateriales':new FormControl("",[Validators.required,Validators.pattern("^[0-9.]+$")]),
      'fechainforme': new FormControl("",[Validators.required]),
      'costomo':new FormControl("",[Validators.required,Validators.pattern("^[0-9.]+$")]),
     // 'costototal':new FormControl("",[Validators.required])
   }); 
  }

  ngOnInit(): void {
    this.mantenimientoService.listarBienesMantenimientoInforme().subscribe(res=>{
      this.bienes=res;
  
    });
    this.mantenimientoService.listarTecnicoCombo().subscribe(data=>{
      this.tecnicos=data;    
      });
      //Método para recuperar año
   this.controlService.mostrarAnio().subscribe((res)=> {
    this.fechaMaxima=`${res.anio}-12-31`;
    this.fechaMinima=`${(res.anio).toString()}-01-01`;
  });
  }
  open(id,idbien){
   // alert(id);
 
  
    this.titulo = "Informe de mantenimiento";
    this.display = 'block';
      this.informe.controls["idinformematenimiento"].setValue("0");
      this.informe.controls["idmantenimiento"].setValue(id);
      this.informe.controls["idBien"].setValue(idbien);
      this.informe.controls["fechainforme"].setValue("");
       this.informe.controls["idtecnico"].setValue("");
       this.informe.controls["descripcion"].setValue("");
       this.informe.controls["costomateriales"].setValue("");
       this.informe.controls["costomo"].setValue("");
       this.informe.controls["costototal"].setValue("");

    
       
       //para recuerar el id 
       this.mantenimientoService.listarBienesMantenimientoInforme().subscribe(res=>{
        this.bienes=res;
    
      });
       

  }



  buscar(buscador) {
    this.p = 1;
    this.mantenimientoService.buscarBienesMante(buscador.value).subscribe(res => {this.bienes = res});
  }

  //dejaron de utilizarse pero pueden ser de utilidad más adelante.
  //metodo para no ingresar signos
  public sinSignos(event: any) {
    const pattern = /^[a-zA-Z0-9]*$/;   
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z0-9" "Ññ]/g, "");
    }
  }
    //para introducir solo numeros y punto
    public solonumerosypunto(event: any) {
      const pattern = /^[0-9.]*$/;   
      if (!pattern.test(event.target.value)) {
        event.target.value = event.target.value.replace(/[^0-9.]/g, "");
  
      }
    }

  
  
  guardarDatos(){
   // console.log(this.informe.value);

    this.mantenimientoService.guardarInformeMantenimiento(this.informe.value).subscribe(res => {
      if(res==1){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Registro Guardado con éxito!',
          showConfirmButton: false,
          timer: 3000
        })
        this.display = 'none';
         this.mantenimientoService.cambiarEstadoActivoMantenimiento(this.informe.controls["idBien"].value).subscribe(rest=>{
          if(rest==1){
          this.mantenimientoService.listarBienesMantenimientoInforme().subscribe(data=>{ this.bienes=data});
          }
        });
      
      }else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al guardar',
          showConfirmButton: false,
          timer: 3000
        })
      }
  
      
    });
      this.informe.controls["idinformematenimiento"].setValue("0");
      this.informe.controls["idmantenimiento"].setValue("");
      this.informe.controls["fechainforme"].setValue("");
      this.informe.controls["idtecnico"].setValue("");
      this.informe.controls["descripcion"].setValue("");
    this.informe.controls["costomateriales"].setValue("");
   this.informe.controls["costomo"].setValue("");

this.display = 'none';
this.mantenimientoService.listarBienesMantenimientoInforme().subscribe(res=>{
  this.bienes=res;

});

  }

  close() {
    this.display = 'none';
  }
    
}





