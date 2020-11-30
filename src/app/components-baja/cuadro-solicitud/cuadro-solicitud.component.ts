import { Component, OnInit } from '@angular/core';
import { BajaService } from './../../services/baja.service';
import { UsuarioService } from './../../services/usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
//para filtro de areas y sucursales
import { CatalogosService } from './../../services/catalogos.service';
import { ControlService } from './../../services/control.service';
//para la fecha actual
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cuadro-solicitud',
  templateUrl: './cuadro-solicitud.component.html',
  styleUrls: ['./cuadro-solicitud.component.css'],
  providers: [DatePipe]
})
export class CuadroSolicitudComponent implements OnInit {

  tablaEdificios = 'none';
  tablaMuebles = 'none';
  tablaIntengibles = 'none';
  tablaMueblesNoAsig = 'none';
  disabledFiltro: boolean;
  disabledFiltroBotonAsignacion: boolean;
  banderaBuscador: any = 1;
  BanderaAsignados: boolean = true;
  BtnAsinacion: string;

  solicitud: FormGroup;
  acti: any;
  activo: any;
  descargo: any;
  display = 'none';
  display2 = 'none';
  display3 = 'none';
  display4 = 'none';
  titulo: string;
  p: number = 1;
  //para filtro
  areas: any;
  sucursal: any;
  //Para la fecha
  fechaMaxima: any;
  fechaMinima: any;
  //Variable para redireccionar
  parametro: string;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private bajaService: BajaService
    , private catalogosServices: CatalogosService, private miDatePipe: DatePipe, private controlService: ControlService, private usuarioService: UsuarioService) {
    this.solicitud = new FormGroup({
      'idsolicitud': new FormControl("0"),
      'idTipo': new FormControl("", [Validators.required, Validators.min(1)]),
      'idtipodescargo': new FormControl("", [Validators.required]),
      'folio': new FormControl("", [Validators.required, Validators.maxLength(10), Validators.pattern("^[a-z A-Z 0-9 ñÑáÁéÉíÍóÓúÚ -.]+$")], this.noRepetirFolio1.bind(this)),
      'fechasolicitud': new FormControl("", [Validators.required]),
      'observaciones': new FormControl("", [Validators.required, Validators.maxLength(150), Validators.pattern("^[a-z A-Z ñÑáÁéÉíÍóÓúÚ ,.]+$")]),
      'entidadbeneficiaria': new FormControl("", [Validators.maxLength(80), Validators.pattern("^[a-z A-Z ñÑáÁéÉíÍóÓúÚ]+$")]),
      'domicilio': new FormControl("", [Validators.maxLength(100), Validators.pattern("^[a-z A-Z 0-9 ñÑáÁéÉíÍóÓúÚ #°.]+$")]),
      'contacto': new FormControl("", [Validators.maxLength(50), Validators.pattern("^[a-z A-Z ñÑáÁéÉíÍóÓúÚ]+$")]),
      'telefono': new FormControl(""),

      'idbien': new FormControl("0"),
      //para filtro
      'idArea': new FormControl("0"),
      'idSucursal': new FormControl("0"),
      'idTipo2': new FormControl("0"),
    });
    this.activateRoute.params.subscribe(parametro => {
      this.parametro = parametro["param"];
    })
  }

  ngOnInit() {
    //this.bajaService.listarBienesAsignados().subscribe(res => { this.activo = res });
    this.catalogosServices.getComboSucursal().subscribe(data => { this.sucursal = data });//filtro
    this.catalogosServices.getTipoDescargo().subscribe(data => { this.descargo = data });//combo

    //Método para recuperar año
    this.controlService.mostrarAnio().subscribe((res) => {
      this.fechaMaxima = `${res.anio}-12-31`;
      this.fechaMinima = `${(res.anio).toString()}-01-01`;
    });
    if (this.parametro == "ver") {
      this.tablaMuebles = 'none';
      this.tablaIntengibles = 'none';
      this.tablaMueblesNoAsig = 'none';
      this.tablaEdificios = 'none'
      this.bajaService.listarBienesAsignados().subscribe(res => {
        this.activo = res
        this.tablaMuebles = 'block';
      });
      this.BtnAsinacion = "Ver no asignados"
      this.banderaBuscador = 1;
    } else if (this.parametro == "edificios") {
      this.BtnAsinacion = "Ver asignados";
      this.tablaMuebles = 'none';
      this.tablaIntengibles = 'none';
      this.tablaMueblesNoAsig = 'none';
      this.bajaService.getBienesAsignadosEdificios().subscribe(res => {
        this.activo = res
        this.tablaEdificios = 'block'
      });
      this.disabledFiltro = true;
      this.banderaBuscador = 2;
    } else if (this.parametro == "tangibles") {
      this.BtnAsinacion = "Ver asignados";
      this.tablaEdificios = 'none';
      this.tablaIntengibles = 'none';
      this.tablaMuebles = 'none';
      this.bajaService.listarBienesNoAsignados().subscribe(res => {
        this.activo = res
        this.tablaMueblesNoAsig = 'block';
        this.banderaBuscador = 4;
      });
      this.disabledFiltroBotonAsignacion = true;
      this.BanderaAsignados = false;
    } else if (this.parametro == "intangible") {
      this.BtnAsinacion = "Ver asignados";
      this.tablaEdificios = 'none'
      this.tablaMuebles = 'none'
      this.tablaMueblesNoAsig = 'none';
      this.bajaService.getBienesAsignadosIntengibles().subscribe(res => {
        this.activo = res
        this.tablaIntengibles = 'block'
      });
      this.disabledFiltro = true;
      this.banderaBuscador = 3;
    }
  }

  guardarDatos() {
    // console.log("solicitud : "+this.solicitud.value.idTipo);
    if (this.solicitud.valid == true) {
      this.solicitud.controls["idtipodescargo"].setValue(this.solicitud.value.idTipo);

      this.bajaService.guardarSolicitud(this.solicitud.value).subscribe(data => {
        if (data == 1) {// siempre valide la respuesta en los metodos de la api usted retorna una respuesta si se cumple lo que quiere es 1 sino 0 y aqui se valida 
          //console.log("solicitud : "+this.solicitud);
          this.bajaService.guardarBien(this.solicitud.value).subscribe(data1 => {
            if (data1 == 1) {
              //listar bienes 
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Solicitud guardada con éxito',
                showConfirmButton: false,
                timer: 3000
              });
              this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Realizó una solicitud de baja de activos.`).subscribe();
              //
              this.BtnAsinacion = "Ver asignados";
              this.tablaEdificios = 'none';
              this.tablaIntengibles = 'none';
              this.tablaMuebles = 'none';
              this.bajaService.listarBienesNoAsignados().subscribe(res => {
                this.activo = res
                this.tablaMueblesNoAsig = 'block';
                this.banderaBuscador = 4;
              });
              this.disabledFiltroBotonAsignacion = true;
              this.BanderaAsignados = false;
              this.display = 'none';
              //
            }
          });
        }
      });
    }
  }
  close() {
    this.display = 'none';
  }

  onSubmit() {
    if (this.solicitud.valid) {
      // console.log("Form Submitted!");
      this.solicitud.reset();
    }
  }

  open(id, fecha) {
    this.solicitud.controls["fechasolicitud"].setValue(fecha);
    var fecharecup = this.solicitud.controls["fechasolicitud"].value.split("-");
    let dia = fecharecup[0];
    let mes = fecharecup[1];
    let anio = fecharecup[2];
    this.controlService.mostrarAnio().subscribe((res) => {
      if (res.anio > anio) {
        this.fechaMinima = `${res.anio}-01-01`;
      } else {
        this.fechaMinima = `${anio}-${mes}-${dia}`;
      }
      this.fechaMaxima = `${res.anio}-12-31`;

    });
    //limpia cache
    this.titulo = "Solicitud para dar de baja";
    this.solicitud.controls["idTipo"].setValue("0");
    this.solicitud.controls["idtipodescargo"].setValue("0");
    this.solicitud.controls["idsolicitud"].setValue("0");
    this.solicitud.controls["folio"].setValue("");
    this.solicitud.controls["fechasolicitud"].setValue("");
    this.solicitud.controls["observaciones"].setValue("");
    this.solicitud.controls["entidadbeneficiaria"].setValue("");
    this.solicitud.controls["domicilio"].setValue("");
    this.solicitud.controls["contacto"].setValue("");
    this.solicitud.controls["telefono"].setValue("");
    this.solicitud.controls["idbien"].setValue(id);
    this.display = 'block';
  }

  buscar(buscador) {
    this.p = 1;
    if (this.banderaBuscador == 1) {
      this.bajaService.buscarBienAsig(buscador.value).subscribe(res => { this.activo = res });
    } else if (this.banderaBuscador == 2) {
      this.bajaService.buscarActivoEdificioAsig(buscador.value).subscribe(res => { this.activo = res });
    } else if (this.banderaBuscador == 3) {
      this.bajaService.buscarActivoIntengibleAsig(buscador.value).subscribe(res => { this.activo = res });
    } else if (this.banderaBuscador == 4) {
      this.bajaService.buscarActivoNoAsig(buscador.value).subscribe(res => { this.activo = res });
    }
  }

  CambiarTipo() {
    switch (this.solicitud.controls["idTipo2"].value) {
      case '1':
        this.tablaEdificios = 'none'
        this.tablaIntengibles = 'none'
        this.bajaService.listarBienesAsignados().subscribe(res => {
          this.activo = res
          this.tablaMuebles = 'block'
        });
        this.disabledFiltro = false;
        this.banderaBuscador = 1;
        break;
      case '2':
        this.tablaMuebles = 'none'
        this.tablaIntengibles = 'none'
        this.bajaService.getBienesAsignadosEdificios().subscribe(res => {
          this.activo = res
          this.tablaEdificios = 'block'
        });
        this.disabledFiltro = true;
        this.banderaBuscador = 2;
        break;
      case '3':
        this.tablaEdificios = 'none'
        this.tablaMuebles = 'none'
        this.bajaService.getBienesAsignadosIntengibles().subscribe(res => {
          this.activo = res
          this.tablaIntengibles = 'block'
        });

        this.disabledFiltro = true;
        this.banderaBuscador = 3;
        break;
      default:
        console.log("ocurrio un error en la consulta de datos");
    }
  }
  FiltrarAsignadosYNoAsignados() {
    if (this.BanderaAsignados == true) {
      this.BtnAsinacion = "Ver asignados";
      this.tablaEdificios = 'none';
      this.tablaIntengibles = 'none';
      this.tablaMuebles = 'none';
      this.bajaService.listarBienesNoAsignados().subscribe(res => {
        this.activo = res
        this.tablaMueblesNoAsig = 'block';
        this.banderaBuscador = 4;
      });
      this.disabledFiltroBotonAsignacion = true;
      this.BanderaAsignados = false;
    } else {
      this.BtnAsinacion = "Ver no asignados";
      this.tablaMueblesNoAsig = 'none';
      this.tablaEdificios = 'none';
      this.tablaIntengibles = 'none';
      this.bajaService.listarBienesAsignados().subscribe(res => {
        this.activo = res
        this.tablaMuebles = 'block';
        this.banderaBuscador = 1;
      });
      this.disabledFiltroBotonAsignacion = false;
      this.BanderaAsignados = true
    }

  }
  FiltrarArea() {
    var id = this.solicitud.controls['idSucursal'].value;
    this.bajaService.ComboArea(id).subscribe(data => { this.areas = data });
  }

  Filtrar() {
    var id = this.solicitud.controls['idArea'].value;
    this.bajaService.FiltroTablaActivos(id).subscribe(data => { this.activo = data });
  }
  Reload() {
    this.solicitud.controls['idSucursal'].setValue(0);
    this.solicitud.controls['idArea'].setValue(0);
    this.solicitud.controls['idTipo2'].setValue(1);
    this.BtnAsinacion = "Ver no asignados";
    this.tablaMueblesNoAsig = 'none';
    this.tablaEdificios = 'none';
    this.tablaIntengibles = 'none';
    this.bajaService.listarBienesAsignados().subscribe(res => {
      this.activo = res
      this.tablaMuebles = 'block';
      this.banderaBuscador = 1;
    });
    this.disabledFiltroBotonAsignacion = false;
    this.BanderaAsignados = true
    this.disabledFiltro = false;
  }

  noRepetirFolio1(control: FormControl) {

    var promesa = new Promise((resolve, reject) => {

      if (control.value != "" && control.value != null) {

        this.bajaService.validarFolio(this.solicitud.controls["idsolicitud"].value, control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExisteFolio: true });
            } else {
              resolve(null);
            }
          })
      }
    });
    return promesa;
  }

}
