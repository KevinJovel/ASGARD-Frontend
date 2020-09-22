import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CatalogosService } from './../../services/catalogos.service';
import { ControlService } from './../../services/control.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CargarScriptsService } from './../../services/cargar-scripts.service';
import { style } from '@angular/animations';
import Swal from 'sweetalert2';
declare var jQuery: any;
declare var $;
//para compartir parametros de diferentes componentess
import { State, StateService } from './../../services/state.service';

@Component({
  selector: 'app-form-nuevo-bien',
  templateUrl: './form-nuevo-bien.component.html',
  styleUrls: ['./form-nuevo-bien.component.css'],
})
export class FormNuevoBienComponent implements OnInit {
  dataState: State; //hace referencia a la variable donde estan almacenados los datos
  //Variables para combos
  comboProvDon: any;
  clasificaciones: any;
  tipocombo: string;
  marcas: any;

  //Variables
  id: any;
  foto: any;
  nuevobien: FormGroup;
  marca: FormGroup;
  sucursal: FormGroup;
  p: number = 1;
  display = 'none';
  disabled: boolean;
  donaprov = false; //utilizo boolean para recuperar doannte o prov
  comboAreaSucur:any;
  lista: any;
  recargo: number=0;
  //Para la fecha
  fecha=Date.now();
  lista2: any;

  @Input() bandera = false; //agrego input para hacer uso delas dos funciones
  //Variables de etiqueta
  disabledPrima: string;
  disabledPlazo: string;
  disabledCuota: string;
  disabledInteres: string;

  constructor(
    private catalogoService: CatalogosService,private _cargarScript: CargarScriptsService,private controlService: ControlService,
    private activateRoute: ActivatedRoute,private router: Router,private stateService: StateService) {
    this._cargarScript.cargar(['/jquery.stepy', '/sortingTable']);

    this.nuevobien = new FormGroup({
      idbien: new FormControl('0'),
      bandera: new FormControl('0'),
      color: new FormControl('', [Validators.required,Validators.maxLength(20),Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")]),
      descripcion: new FormControl('', [Validators.required,Validators.maxLength(100),Validators.pattern("^[a-zA-Z0-9ñÑáéíóú ]+$")]),
      modelo: new FormControl('', [Validators.maxLength(30),Validators.pattern("^[a-zA-Z0-9.´´,#+° ]+$")]),
      tipoadquicicion: new FormControl('0',[Validators.required]), //contado credito o donado
      idmarca: new FormControl('0'),
      idclasificacion: new FormControl('0',[Validators.required]),
      idproveedor: new FormControl('0', [Validators.required]),
      estadoingreso: new FormControl('0',[Validators.required]),
      valoradquicicion: new FormControl('',[Validators.required,Validators.maxLength(10),Validators.pattern("^[0-9.´´ ]+$")]),
      plazopago: new FormControl('',[Validators.maxLength(2),Validators.pattern("^[0-9´´ ]+$")]),
      prima: new FormControl('',[Validators.maxLength(7),Validators.pattern("^[0-9.´´ ]+$")]),
      cuotaasignada: new FormControl('',[Validators.maxLength(7),Validators.pattern("^[0-9.´´ ]+$")]),
      interes: new FormControl('',[Validators.maxLength(2),Validators.pattern("^[0-9´´ ]+$")]),
     noformulario: new FormControl('0'),
     nofactura: new FormControl('', [Validators.maxLength(30),Validators.pattern("^[a-zA-Z0-9.´´,#+° ]+$")]),
     fechaingreso: new FormControl(''),
     personaentrega: new FormControl('',[Validators.required, Validators.maxLength(50),Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")]),
     personarecibe: new FormControl('',[Validators.required, Validators.maxLength(50),Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")]),
     valorresidual: new FormControl('',[Validators.maxLength(10),Validators.pattern("^[0-9.´´ ]+$")]),
     observaciones: new FormControl('',[Validators.maxLength(70),Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")]),
     cantidad: new FormControl('', [Validators.maxLength(2),Validators.pattern("^[0-9´´ ]+$")]),
     foto: new FormControl(''),
    });
    
  }

  ngOnInit() {
    this.tipocombo = 'Proveedor o Donante:';
    this.disabledPrima = 'Ingrese prima';
    this.disabledPlazo = 'Ingrese plazo';
    this.disabledCuota = 'Ingrese cuota';
    this.disabledInteres = 'Ingrese interes';

    this.controlService.listarComboClasificacion().subscribe((data) => {
      this.clasificaciones = data;
    });

    this.controlService.listarComboMarca().subscribe((data) => {
      this.marcas = data;
    });

    this.controlService.getActivosSinAsignar().subscribe((data) => {this.lista2 = data; });
    this.controlService.getBienesAsignados().subscribe((data) => {this.lista = data; });

    //this.dataState.data.datas //en data se almacenaran los datos que envio
    //recupera los datos del componente tabla
    this.stateService.state.subscribe((resp) => { 
      this.dataState = resp;
      if (resp.data.hasOwnProperty('bienObj')) {
        let data = resp.data.bienObj;
        //this.nuevobien.setValue(data); //recupero
        this.nuevobien.controls['idbien'].setValue(data.idbien);
      this.nuevobien.controls['color'].setValue(data.color);
      this.nuevobien.controls['descripcion'].setValue(data.descripcion);
      this.nuevobien.controls['modelo'].setValue(data.modelo);
      this.nuevobien.controls['tipoadquicicion'].setValue(data.tipoadquicicion);
      this.nuevobien.controls['idmarca'].setValue(data.idmarca);
      this.nuevobien.controls['idclasificacion'].setValue(data.idclasificacion);
      this.nuevobien.controls['idproveedor'].setValue(data.idproveedor);
      this.nuevobien.controls['estadoingreso'].setValue(data.estadoingreso);
      this.nuevobien.controls['plazopago'].setValue(data.plazopago);
      this.nuevobien.controls['prima'].setValue(data.prima);
      this.nuevobien.controls['cuotaasignada'].setValue(data.cuotaasignada);
      this.nuevobien.controls['interes'].setValue(data.interes);
      this.nuevobien.controls['valoradquicicion'].setValue(data.valoradquicicion);
      this.nuevobien.controls['noformulario'].setValue(data.noformulario);
      this.nuevobien.controls['nofactura'].setValue(data.nofactura);
      //this.nuevobien.controls['fechaingreso'].setValue(data.fechaingreso);
      this.nuevobien.controls['personaentrega'].setValue(data.personaentrega);
      this.nuevobien.controls['personarecibe'].setValue(data.personarecibe);
      this.nuevobien.controls['observaciones'].setValue(data.observaciones);
      this.nuevobien.controls['cantidad'].setValue(data.cantidad);
      this.nuevobien.controls['cantidad'].disable();
      this.nuevobien.controls['valorresidual'].setValue(data.valorresidual);
      //this.nuevobien.controls['foto'].setValue(data.foto);
      this.foto=data.foto;//obtengo la foto
        //this.bandera = true; //habilito el boton actualizar
        this.nuevobien.controls['bandera'].setValue(1);//mando 1 para saber q es el editarr
        this.nuevobien.controls['foto'].setValue(this.foto);//evaluo si hay foto
        this.fecha = data.fechaingreso;//obtengo la fecha en q se ingreso el bien para mostrarla

      }

      //vuelvo a utilizar el codigo para hacerlo dinamico y me recupere en el combo
      var idempleado = this.nuevobien.controls['tipoadquicicion'].value;
      if (idempleado == 1 || idempleado == 2) {
        this.tipocombo = 'Proveedor:';
        this.disabledPrima = 'Inhabilitado';
        this.disabledPlazo = 'Inhabilitado';
        this.disabledCuota = 'Inhabilitado';
        this.disabledInteres = 'Inhabilitado';
        if (idempleado == 1) {
          this.disabled = true;
          this.donaprov = true;
        } else {
          this.disabled = false;
          this.donaprov = true;
          this.disabledPrima = 'Ingrese prima';
          this.disabledPlazo = 'Ingrese plazo';
          this.disabledCuota = 'Ingrese cuota';
          this.disabledInteres = 'Ingrese interes';
        }
        this.controlService.listarComboProveedor().subscribe((res) => {
          this.comboProvDon = res;
        });
      } else {
        this.disabled = true;
        this.donaprov = false;
        this.tipocombo = 'Donante:';
        this.controlService.listarComboDonante().subscribe((res) => {
          this.comboProvDon = res;
        });
      }
    });
  }

  //Método para cargar combo al guardar los datos
  ProveedorDonante() {
    var idempleado = this.nuevobien.controls['tipoadquicicion'].value;
    if (idempleado == 1 || idempleado == 2) {
      this.tipocombo = 'Proveedor:';
      this.disabledPrima = 'Inhabilitado';
      this.disabledPlazo = 'Inhabilitado';
      this.disabledCuota = 'Inhabilitado';
      this.disabledInteres = 'Inhabilitado';
            this.nuevobien.controls['prima'].setValue('');
            this.nuevobien.controls['plazopago'].setValue('');
            this.nuevobien.controls['cuotaasignada'].setValue('');
            this.nuevobien.controls['interes'].setValue('');
      if (idempleado == 1) {
        this.disabled = true;
      } else {
        this.disabled = false;
        this.disabledPrima = 'Ingrese prima';
        this.disabledPlazo = 'Ingrese plazo';
        this.disabledCuota = 'Ingrese cuota';
        this.disabledInteres = 'Ingrese interes';
      }
      this.controlService.listarComboProveedor().subscribe((res) => {
        this.comboProvDon = res;
      });
    } else {
      this.disabled = true;
      this.tipocombo = 'Donante:';
      this.controlService.listarComboDonante().subscribe((res) => {
        this.comboProvDon = res;
      });
    }
  }

  //Evento para guardar foto
  changeFoto() {
    var file = (<HTMLInputElement>document.getElementById('futFoto')).files[0];
    var fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.foto = fileReader.result;
    };

    fileReader.readAsDataURL(file);
  }

  guardarDatoss() {
    // console.log(this.nuevobien.value);
    //Le agrego una bandera para englobar los datos y verificar si fueron ingresados o no en el formulario
    if (this.nuevobien.controls['bandera'].value == '0') {
      if (this.nuevobien.valid == true) {
        this.controlService.agregarFormIngreso(this.nuevobien.value).subscribe((data) => {
            //Creo esta condicion, si es contado o donado mando valor 0 sino ingresa lo de credito
          var tip = this.nuevobien.controls['tipoadquicicion'].value;
          var valorR=this.nuevobien.controls['valorresidual'].value;
          if(tip==1 || tip==3) {
            this.nuevobien.controls['prima'].setValue('0');
            this.nuevobien.controls['plazopago'].setValue('0');
            this.nuevobien.controls['cuotaasignada'].setValue('0');
            this.nuevobien.controls['interes'].setValue('0');
          } else{
          } 
          if(valorR =='') {
            this.nuevobien.controls['valorresidual'].setValue('0');
          }
            //Pasamos la foto
            this.nuevobien.controls['foto'].setValue(this.foto);

            if (data == 1) {
              this.controlService.agregarBien(this.nuevobien.value).subscribe((res) => {
                  if (res == 1) {
                    Swal.fire({
                      title: 'Registro Guardado con éxito',
                      text: '¿Desea realizar un nuevo registro?',
                      icon: 'success',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      cancelButtonText:'Cancelar',
                      confirmButtonText: 'Si, registrar!',
                    }).then((result) => {
                      if (result.value) {
                        window.location.reload();
                      } else {
                        this.router.navigate(['./tabla-activos']);
                      }
                    });
                  } else {
                    Swal.fire({
                      position: 'center',
                      icon: 'warning',
                      title: 'No guardó',
                      showConfirmButton: false,
                      timer: 3000,
                    });
                  }
                });
            }
          });
      }
    }
//inicia el MODIFICAR mandamos 1 a la bandera para identificar q es un editar
    else if(this.nuevobien.controls['bandera'].value == '1'){
    //// this.nuevobien.controls['bandera'].setValue('0');
    if (this.nuevobien.valid == true) {
      
     this.controlService.modificarFormIngreso(this.nuevobien.value).subscribe((data) => {
        console.log(this.nuevobien.value);
        //le mando -1 para que reconozca un valor
        if(this.nuevobien.value.plazopago==null)
        {
          this.nuevobien.controls['plazopago'].setValue(-1);
        }
        if(this.nuevobien.value.prima==null)
        {
          this.nuevobien.controls['prima'].setValue(-1);
        }
        if(this.nuevobien.value.cuotaasignada==null)
        {
          this.nuevobien.controls['cuotaasignada'].setValue(-1);
        }
        if(this.nuevobien.value.interes==null)
        {
          this.nuevobien.controls['interes'].setValue(-1);
        }
        //console.log("Es marca: "+this.nuevobien.value.idmarca);
        if(this.nuevobien.value.idmarca==0)
        {
          this.nuevobien.controls['idmarca'].setValue(0);
        }
        //Pasamos la foto para modificarla
        this.nuevobien.controls['foto'].setValue(this.foto);
          this.controlService.modificarBien(this.nuevobien.value).subscribe((res) => {
            console.log(this.nuevobien.value);
            this.modificar(this.nuevobien.value.idbien);
            this.controlService.getActivosSinAsignar().subscribe((data) => {this.lista2 = data; });
            
          });
          console.log("foto: "+this.nuevobien.value.foto);
          this.recargo=1;
          //this.router.navigate(['./tabla-activos']);
            //console.log("Id Bien: "+this.nuevobien.value.idbien);
           //listar bienes
            this.router.navigate(['./tabla-activos']);
          });
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Registro Modificado con éxito',
                showConfirmButton: false,
                timer: 3000,
              }).then((result) => {
                if (result.value) {
                  this.router.navigate(['./tabla-activos']);
                  window.location.href= "./tabla-activos" ;
                } //else {
                  //window.location.reload();
               // }
              });     
    }
    
    this.display = 'none';

    }
    
  }


  modificar(id) {
   // console.log("Antes"+id);
    this.controlService.RecuperarFormCompleto(id).subscribe((data) => {
      this.nuevobien.controls['idbien'].setValue(data.idbien);
      this.nuevobien.controls['color'].setValue(data.color);
      this.nuevobien.controls['descripcion'].setValue(data.descripcion);
      this.nuevobien.controls['modelo'].setValue(data.modelo);
      this.nuevobien.controls['tipoadquicicion'].setValue(data.tipoadquicicion);
      this.nuevobien.controls['idmarca'].setValue(data.idmarca);
      this.nuevobien.controls['idclasificacion'].setValue(data.idclasificacion);
      this.nuevobien.controls['idproveedor'].setValue(data.idproveedor);
      this.nuevobien.controls['estadoingreso'].setValue(data.estadoingreso);
      this.nuevobien.controls['plazopago'].setValue(data.plazopago);
      this.nuevobien.controls['prima'].setValue(data.prima);
      this.nuevobien.controls['cuotaasignada'].setValue(data.cuotaasignada);
      this.nuevobien.controls['interes'].setValue(data.interes);
      this.nuevobien.controls['valorresidual'].setValue(data.valorresidual);
      this.nuevobien.controls['noformulario'].setValue(data.noformulario);
      this.nuevobien.controls['nofactura'].setValue(data.nofactura);
      this.nuevobien.controls['fechaingreso'].setValue(data.fechaingreso);
      this.nuevobien.controls['personaentrega'].setValue(data.personaentrega);
      this.nuevobien.controls['personarecibe'].setValue(data.personarecibe);
      this.nuevobien.controls['observaciones'].setValue(data.observaciones);
      this.nuevobien.controls['cantidad'].setValue(data.cantidad);
      this.nuevobien.controls['foto'].setValue(data.foto);
      this.nuevobien.controls['bandera'].setValue('1');
      
    });
    
  }

  open() {
    //limpia cache
   // this.nuevobien.reset();
    this.nuevobien.controls["idbien"].setValue("0");
    this.nuevobien.controls["bandera"].setValue("0");
    this.nuevobien.controls["color"].setValue("");
    this.nuevobien.controls["descripcion"].setValue("");
    this.nuevobien.controls["modelo"].setValue("");
    this.nuevobien.controls["tipoadquicicion"].setValue("");
    this.nuevobien.controls["idmarca"].setValue("");
    this.nuevobien.controls["idclasificacion"].setValue("");
    this.nuevobien.controls["idproveedor"].setValue("");
    this.nuevobien.controls["estadoingreso"].setValue("");
    this.nuevobien.controls["plazopago"].setValue("");
    this.nuevobien.controls["prima"].setValue("");
    this.nuevobien.controls["cuotaasignada"].setValue("");
    this.nuevobien.controls["interes"].setValue("");
    this.nuevobien.controls["noformulario"].setValue("");
    this.nuevobien.controls["nofactura"].setValue("");
    this.nuevobien.controls["fechaingreso"].setValue("");
    this.nuevobien.controls["personaentrega"].setValue("");
    this.nuevobien.controls["personarecibe"].setValue("");
    this.nuevobien.controls["observaciones"].setValue("");
    this.nuevobien.controls["cantidad"].setValue("");
    this.nuevobien.controls["foto"].setValue("");
    this.display = 'block';
  
  }


  noPuntoDecimal(control: FormControl) {
    if (control.value != null && control.value != '') {
      if ((<string>control.value.toString()).indexOf('.') > -1) {
        return { puntoDecimal: true };
      }
      return null;
    }
  }



}
