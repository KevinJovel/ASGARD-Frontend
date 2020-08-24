import { Component, OnInit } from '@angular/core';
import { ConfiguracionService } from './../../services/configuracion.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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
  display2 = 'none';
  p: number = 1;
  logo: any;
  titulo: string;

  constructor( private configuracionService: ConfiguracionService) { 

    this.cooperativa =new FormGroup( {

      'idcooperativa': new FormControl("0"),
      'bandera': new FormControl("0"),
      'nombre': new FormControl("", [Validators.required, Validators.maxLength(35)], this.noRepetirCooperativa.bind(this)),
      'logo': new FormControl(""),
      'anio':new FormControl(""),
      'descripcion': new FormControl("",[Validators.required, Validators.maxLength(50)])

    });
  }

  ngOnInit() {
    this.configuracionService.getCooperativa().subscribe(data => { this.cooperativas = data });
  }

  //Métodos   
  open() {
    //Limpiar
    this.cooperativa.controls["idcooperativa"].setValue("0");
    this.cooperativa.controls["bandera"].setValue("0");
    this.cooperativa.controls["nombre"].setValue("");
    this.cooperativa.controls["logo"].setValue("");
    this.cooperativa.controls["anio"].setValue("");
    this.cooperativa.controls["descripcion"].setValue("");
      this.display = 'block';
  }

  close() {
    this.display = 'none';
  }

  close2() {
    this.display2 = 'none';
  }

  buscar(buscador) {
   
  }

 //Evento para guardar foto
 changeFoto() {
  var file = (<HTMLInputElement>document.getElementById("futFoto")).files[0];
  var fileReader = new FileReader();

  fileReader.onloadend = () => {
    this.logo = fileReader.result;
  }

  fileReader.readAsDataURL(file);
}

  guardarDatos2() {
    if ((this.cooperativa.controls["bandera"].value) == "0") {
      //Pasamos la foto         
      this.cooperativa.controls["logo"].setValue(this.logo);
      if (this.cooperativa.valid == true) {
        this.configuracionService.setCooperativa(this.cooperativa.value).subscribe(data => {
          this.configuracionService.getCooperativa().subscribe(data => { this.cooperativas = data });
            });
           
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Dato Guardado con éxito',
                showConfirmButton: false,
                timer: 3000
            })
        }

    this.cooperativa.controls["idcooperativa"].setValue("0");
    this.cooperativa.controls["bandera"].setValue("0");
    this.cooperativa.controls["nombre"].setValue("");
    this.cooperativa.controls["logo"].setValue("");
    this.cooperativa.controls["anio"].setValue("");
    this.cooperativa.controls["descripcion"].setValue("");
    this.display ='none';
    }
  }

  guardarDatos() { 
    Swal.fire({
        title: '¿Esta seguro de guardar este registro?',
        text: "¡No podra modificar estos datos!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, guardar!'
    }).then((result) => {
        if (result.value) {
          if ((this.cooperativa.controls["bandera"].value) == "0") {
            //Pasamos la foto         
            this.cooperativa.controls["logo"].setValue(this.logo);
            if (this.cooperativa.valid == true) {
              this.configuracionService.setCooperativa(this.cooperativa.value).subscribe(data => {
                this.configuracionService.getCooperativa().subscribe(data => { this.cooperativas = data });
                  });
                 
                  Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'Dato Guardado con éxito',
                      showConfirmButton: false,
                      timer: 3000
                  })
              }
      
          this.cooperativa.controls["idcooperativa"].setValue("0");
          this.cooperativa.controls["bandera"].setValue("0");
          this.cooperativa.controls["nombre"].setValue("");
          this.cooperativa.controls["logo"].setValue("");
          this.cooperativa.controls["anio"].setValue("");
          this.cooperativa.controls["descripcion"].setValue("");
          this.display ='none';
          }
           
        }
    })
  }

  mostrarLogo(id){
    console.log(this.cooperativa.value);
    this.display2 = 'block';
    this.configuracionService.recuperarCooperativa(id).subscribe(data => {
        this.cooperativa.controls["idcooperativa"].setValue(data.idcooperativa);
        this.cooperativa.controls["nombre"].setValue(data.nombre);
        if(data.logo==null) {
          this.logo="";
        } else {
          this.logo=data.logo;
        }
        
  
    });
  }

  noRepetirCooperativa(control: FormControl) {

    var promesa = new Promise((resolve, reject) => {
  
      if (control.value != "" && control.value != null) {
  
        this.configuracionService.validarCooperativa(this.cooperativa.controls["idcooperativa"].value, control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExisteCooperativa: true });
            } else {
              resolve(null);
            }
  
          })
  
      }
  
  
    });
  
    return promesa;
  }

}
