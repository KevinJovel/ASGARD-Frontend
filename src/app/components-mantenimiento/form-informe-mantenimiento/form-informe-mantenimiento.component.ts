import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ControlService } from './../../services/control.service';
import { MantenimientoService } from './../../services/mantenimiento.service';
//import { format } from 'path';


@Component({
  selector: 'app-form-informe-mantenimiento',
  templateUrl: './form-informe-mantenimiento.component.html',
  styleUrls: ['./form-informe-mantenimiento.component.css']
})
export class FormInformeMantenimientoComponent implements OnInit {


  informes: any;
  // bienes: any;
  tecnicos: any;
  p: number = 1;
  informe: FormGroup;
  revalorizacion: FormGroup;
  display = 'none';
  titulo: string;
  idmante: any;
  //fecha = Date.now();
  c: number = 0;
  variableNumero: number = 0;
  vidaUtilCorrecta:boolean=false;
  vidaUtilCierta: boolean= false;
  fechaMaxima: any;
  fechaMinima: any;

  constructor(private mantenimientoService: MantenimientoService, private controlService: ControlService,private router: Router) {


    //form para la revalorización 
    this.revalorizacion = new FormGroup({
      'idBien': new FormControl(""),
      'valorRevalorizacion': new FormControl("", [Validators.required, Validators.pattern("^[0-9.]+$")]),
      'idinformematenimiento': new FormControl(""),
      'vidaUtil': new FormControl("", [Validators.pattern("^[0-9]+$")]),
      'fecha': new FormControl("", [Validators.required])
    });
  }

  ngOnInit(): void {
    this.mantenimientoService.validarListarInformeMantenimiento().subscribe(res =>{
      if(res==1){
        this.mantenimientoService.ListarInformeMantenimiento().subscribe(res => {
          this.informes = res;
        });
      }else{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se encontraron informes de mantenimiento.',
          showConfirmButton: false,
          timer: 4000
        });
        this.router.navigate(["/"]);
      }
    })
  

  }
  validarVidaUtil(vida){
    var id=this.revalorizacion.controls["idBien"].value;
    this.controlService.getVidaUtil(id).subscribe(data=>{
      if(vida.value>0 && vida.value<data.vidaUtil || vida.value<this.revalorizacion.controls["vidaUtil"].value){
        this.vidaUtilCorrecta=true;
      }else{
        this.vidaUtilCorrecta=false;
      }
    });
  }



  open(idBien, idinformematenimiento, vidtUtil,fecha) {
    // alert(id);
    this.revalorizacion.controls["fecha"].setValue(fecha);
var fecharecup = this.revalorizacion.controls["fecha"].value.split("-");
let dia=fecharecup[0];
let mes=fecharecup[1];
let anio=fecharecup[2];
this.controlService.mostrarAnio().subscribe((res)=> {
  if(res.anio>anio){
    this.fechaMinima=`${res.anio}-01-01`;
  }else{
    this.fechaMinima=`${anio}-${mes}-${dia}`;
  }
  this.fechaMaxima=`${res.anio}-12-31`;

});

    this.titulo = "Revalorización";
    this.revalorizacion.controls["idBien"].setValue(idBien);
    this.revalorizacion.controls["idinformematenimiento"].setValue(idinformematenimiento);
    this.revalorizacion.controls["vidaUtil"].setValue(vidtUtil);
    this.revalorizacion.controls["valorRevalorizacion"].setValue("");
    //this.revalorizacion.controls["fecha"].setValue("");

    this.mantenimientoService.ListarInformeMantenimiento().subscribe(res => {
      this.informes = res;
      this.display = 'block';
    });
  }


  buscar(buscador) {
    this.p = 1;
    this.mantenimientoService.buscarInformes(buscador.value).subscribe(res => { this.informes = res });
  }

  noRevalorizar() {
    this.mantenimientoService.estadosinrevalorizar(this.revalorizacion.controls["idinformematenimiento"].value).subscribe(rest => {
      if (rest == 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Revalorización no realizada con éxito!',
          showConfirmButton: false,
          timer: 3000
        })
        this.mantenimientoService.ListarInformeMantenimiento().subscribe(data => { this.informes = data });
       this.display = 'none';
      }
    });
  
  }

  guardarDatos() {

    console.log(this.revalorizacion.value);
    // console.log(this.idmante);
    this.mantenimientoService.insertarRevalorizacion(this.revalorizacion.value).subscribe(res => {
      if (res == 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Revalorización Guardada con exito!',
          showConfirmButton: false,
          timer: 3000
        })
        this.mantenimientoService.estadoInformeRevalorizado(this.revalorizacion.controls["idinformematenimiento"].value).subscribe(rest => {
          if (rest == 1) {

            this.mantenimientoService.ListarInformeMantenimiento().subscribe(data => { this.informes = data });

          }
        });

      }

    });
    this.revalorizacion.controls["idBien"].setValue("0");
    this.revalorizacion.controls["valorRevalorizacion"].setValue("");
    this.revalorizacion.controls["fecha"].setValue("");
    this.revalorizacion.controls["vidaUtil"].setValue("");

    this.display = 'none';
    this.mantenimientoService.ListarInformeMantenimiento().subscribe(res => {
      this.informes = res;

    });

  }

  close() {
    this.display = 'none';
  }

}

