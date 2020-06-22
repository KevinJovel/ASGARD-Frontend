import { Component, OnInit, Input } from '@angular/core';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import { CatalogosService } from './../../services/catalogos.service';
import { ControlService } from './../../services/control.service';
import { Router, ActivatedRoute } from '@angular/router'
import { CargarScriptsService} from './../../services/cargar-scripts.service';
import { style } from '@angular/animations'
import Swal from 'sweetalert2';
declare var jQuery:any;
declare var $;

@Component({
  selector: 'app-form-nuevo-bien',
  templateUrl: './form-nuevo-bien.component.html',
  styleUrls: ['./form-nuevo-bien.component.css']
})
export class FormNuevoBienComponent implements OnInit {
  //Variables para combos
  comboProvDon:any;
  clasificaciones: any;
  tipocombo:string;
  marcas: any;

  //Variables
  id:any;
  foto: any;
  nuevobien: FormGroup;
  marca: FormGroup;
  sucursal: FormGroup;
  p: number = 1;
  display = 'none';
  disabled: boolean;
  

  //Variables de etiqueta
  disabledPrima:string;
  disabledPlazo:string;
  disabledCuota:string;
  disabledInteres:string;

  constructor(private catalogoService: CatalogosService, private _cargarScript:CargarScriptsService, private controlService: ControlService,
    private activateRoute: ActivatedRoute, private router: Router) {
    this._cargarScript.cargar(["/jquery.stepy","/sortingTable"]);

    this.nuevobien = new FormGroup({
      'idbien': new FormControl("0"),
      'bandera': new FormControl("0"),
      'color': new FormControl("",[Validators.required,Validators.maxLength(15)]),
      'descripcion': new FormControl("",[Validators.required,Validators.maxLength(80)]),
      'modelo': new FormControl("",[Validators.required,Validators.maxLength(20)]),
      'tipoadquicicion': new FormControl("0",[Validators.required]),
       'idmarca': new FormControl("0",[Validators.required]),
       'idclasificacion': new FormControl("0",[Validators.required]),
        'idproveedor': new FormControl("0",[Validators.required]),
         'estadoingreso': new FormControl("0"),
         'valoradquicicion': new FormControl("",[Validators.required]),
         'plazopago': new FormControl(""),
         'prima': new FormControl(""),
         'cuotaasignada': new FormControl(""),
         'interes': new FormControl(""),
        'noformulario': new FormControl("0"),
        'nofactura': new FormControl("",[Validators.required,Validators.maxLength(10)]),
        'fechaingreso': new FormControl("",[Validators.required]),
        'personaentrega': new FormControl("",[Validators.required,Validators.maxLength(50)]),
        'personarecibe': new FormControl("",[Validators.required,Validators.maxLength(50)]),
        'observaciones': new FormControl("",[Validators.required,Validators.maxLength(70)]),
        'cantidad': new FormControl("",[Validators.required,this.noPuntoDecimal, Validators.min(1)]),
        'foto': new FormControl("")
    });
   }

  ngOnInit() {
    this.tipocombo="Proveedor o Donante:";
    this.disabledPrima="Ingrese prima"
    this.disabledPlazo="Ingrese plazo"
    this.disabledCuota="Ingrese cuota"
    this.disabledInteres="Ingrese interes"

    this.controlService.listarComboClasificacion().subscribe(data=>{
      this.clasificaciones=data;
    });

    this.controlService.listarComboMarca().subscribe(data=>{
      this.marcas=data;
    });
  }
  //Método para cargar combo
  ProveedorDonante(){
    
    var idempleado=this.nuevobien.controls["tipoadquicicion"].value;
    if(idempleado==1||idempleado==2){

      
      this.tipocombo="Proveedor:";
       this.disabledPrima="Inhabilitado";
       this.disabledPlazo="Inhabilitado";
       this.disabledCuota="Inhabilitado";
       this.disabledInteres="Inhabilitado";
      if(idempleado==1){
        this.disabled=true;
      }else{
        this.disabled=false;
         this.disabledPrima="Ingrese prima"
         this.disabledPlazo="Ingrese plazo"
         this.disabledCuota="Ingrese cuota"
         this.disabledInteres="Ingrese interes"
      }
      this.controlService.listarComboProveedor().subscribe(res=> {this.comboProvDon=res});
    }else{
      this.disabled=true;
      this.tipocombo="Donante:";
    
      this.controlService.listarComboDonante().subscribe(res=> {this.comboProvDon=res});
    }
   
}

//Evento para guardar foto
changeFoto() {
  var file = (<HTMLInputElement>document.getElementById("futFoto")).files[0];
  var fileReader = new FileReader();

  fileReader.onloadend = () => {
    this.foto = fileReader.result;
  }

  fileReader.readAsDataURL(file);
}

guardarDatoss() {
  //Le agrego una bandera para englobar los datos y verificar si fueron ingresados o no en el formulario
  if ((this.nuevobien.controls["bandera"].value) == "0")  {
    if (this.nuevobien.valid == true) {
       
      this.controlService.agregarFormIngreso(this.nuevobien.value).subscribe(data => {
        //Envío valor cero para guardar 
        this.nuevobien.controls['prima'].setValue("0");
        this.nuevobien.controls['plazopago'].setValue("0");
        this.nuevobien.controls['cuotaasignada'].setValue("0");
        this.nuevobien.controls['interes'].setValue("0");

        //Pasamos la foto         
       this.nuevobien.controls["foto"].setValue(this.foto);

        if(data==1){
          this.controlService.agregarBien(this.nuevobien.value).subscribe(res => {
            if(res==1){
              Swal.fire({
                    title: 'Registro Guardado con éxito',
                    text: "¿Desea realizar un nuevo registro?",
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, registrar!'
              }).then((result) => {
                if (result.value) {
                    window.location.reload();
          
                } else {
                    this.router.navigate(["./tabla-activos"]);
                }
              })
            }
            
            else{
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'No guardó',
                showConfirmButton: false,
                timer: 3000
              })
            }
              
            }); 

        }
    
       });
      
     
    } 
  }
  //  else {
  //   //Sino es porque la bandera trae otro valor y solo es posible cuando preciona el boton de recuperar
  //   this.nuevobien.controls["bandera"].setValue("0");
  //     Swal.fire({
  //       position: 'center',
  //       icon: 'success',
  //       title: 'Registro no guardado',
  //       showConfirmButton: false,
  //       timer: 3000
  //     })
  //   }
  
  

}

noPuntoDecimal(control: FormControl) {
  if (control.value != null && control.value != "") {


    if ((<string>control.value.toString()).indexOf(".") > - 1) {
      return { puntoDecimal: true }
    }
    return null;
  } 
}



}
