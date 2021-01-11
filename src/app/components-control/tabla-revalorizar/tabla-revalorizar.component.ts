import { Component, OnInit } from '@angular/core';
import { CatalogosService } from './../../services/catalogos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepreciacionService } from './../../services/depreciacion.service';
import { UsuarioService } from './../../services/usuario.service';
import { ConfiguracionService } from './../../services/configuracion.service';
import { ControlService } from './../../services/control.service';
import { Router } from '@angular/router';
import { MantenimientoService } from './../../services/mantenimiento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-revalorizar',
  templateUrl: './tabla-revalorizar.component.html',
  styleUrls: ['./tabla-revalorizar.component.css']
})
export class TablaRevalorizarComponent implements OnInit {

  bienes: any;
  revalorizaciones: any;
  sucursales: any;
  areas: any;
  combos: FormGroup;
  // Variables para tipos de activos
  tablaEdificios = 'none';
  tablaMuebles = 'none';
  tablaIntengibles = 'none';
  disabledFiltroBotonAsignacion: boolean;
  banderaBuscador: any = 1;//bandera para cambiar el buscador
  disabledFiltro: boolean;//Esta bandera sirve para inhabilitar los filtros en edificios e intangibles
  p: number = 1;
  titulo: string;
  titulo6: string;
  datos: FormGroup;
  display = 'none';
  display2 = 'none';
  display3 = 'none';
  display4= 'none';
  display5 = 'none';
  display6 = 'none';
  displayfoto = 'none';
  displayMensaje = 'none';
  //Modal de detalles
  foto: any;
  descripcion: string;
  codigo: string;
  fecha: string;
  valorAdquisicion: string;
  clasificacion: string;
  responsable: string;
  ubicacion: string;
  valorAcual: string;
  valorActualStr: string;
  valorDepreciarStr: string;
  provDon: string;
  noSerie: string;
  vidaUtil: string;
  Observaciones: string;
  vidaUtilCorrecta: boolean = false;
  fechaMaxima: any;
  fechaMinima: any;
  revalorizacion: FormGroup;
  constructor(private mantenimientoService: MantenimientoService, private catalogosServices: CatalogosService,
    private controlService: ControlService, private depreciacionService: DepreciacionService,
    private configuracionService: ConfiguracionService, private router: Router, private usuarioService: UsuarioService) {
    this.combos = new FormGroup({
      'idArea': new FormControl("0"),
      'idSucursal': new FormControl("0"),
      'idTipo': new FormControl("0")
    });
    this.datos = new FormGroup({
      'idBien': new FormControl("0"),
      'codigo': new FormControl(""),
      'descripcion': new FormControl(""),
      'valorAdquicicion': new FormControl(""),
      'valorActual': new FormControl(""),
      'valorDepreciacion': new FormControl("0.00"),
      'fecha': new FormControl("")
    });

    //form para la revalorización 
    this.revalorizacion = new FormGroup({
      'idBien': new FormControl("0"),
      'idTarjeta': new FormControl("0"),
      'valorRevalorizacion': new FormControl("", [Validators.required, Validators.pattern("^[0-9.]+$")]),
      'idinformematenimiento': new FormControl(""),
      'vidaUtil': new FormControl("", [Validators.pattern("^[0-9]+$")]),
      'fecha': new FormControl("", [Validators.required])
    });
  }

  ngOnInit(): void {
    //METODO PARA TABLA VACIA
    this.controlService.validarActivosRevalorizar().subscribe(res => {
      if (res == 1) {
        this.controlService.listarActivosRevalorizar().subscribe(data => {
          this.bienes = data

          this.tablaMuebles = 'block';
        });
        this.catalogosServices.getComboSucursal().subscribe(data => { this.sucursales = data });
       // this.mantenimientoService.listarRevalorizacion(this.revalorizacion.controls["idBien"]).subscribe(data => { this.revalorizaciones = data });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se encontraron activos para revalorizar.',
          showConfirmButton: false,
          timer: 4000
        });
        this.router.navigate(["/"]);
      }
    })
  }
  CambiarTipo() {
    switch (this.combos.controls["idTipo"].value) {
      case '1':
        this.tablaEdificios = 'none'
        this.tablaIntengibles = 'none'
        this.controlService.listarActivosRevalorizar().subscribe(data => {
          this.bienes = data
          this.tablaMuebles = 'block';
        });
        this.disabledFiltro = false;
        this.banderaBuscador = 1;
        break;
      case '2':
        this.tablaMuebles = 'none'
        this.tablaIntengibles = 'none'
        this.controlService.listarActivosEdificiosRevalorizar().subscribe(res => {
          this.bienes = res
          this.tablaEdificios = 'block'
        });
        this.disabledFiltro = true;
        this.banderaBuscador = 2;
        break;
      case '3':
        this.tablaEdificios = 'none'
        this.tablaMuebles = 'none'
        this.controlService.listarActivosIntangiblesRevalorizar().subscribe(res => {
          this.bienes = res
          this.tablaIntengibles = 'block'
        });

        this.disabledFiltro = true;
        this.banderaBuscador = 3;
        break;
      default:
        console.log("Ocurrió un error en la consulta de datos");
    }
  }
  FiltrarArea() {
    var id = this.combos.controls['idSucursal'].value;
    this.controlService.comboAreaDeSucursal(id).subscribe(data => { this.areas = data });
  }
  Filtrar() {
    var id = this.combos.controls['idArea'].value;
    this.controlService.listarActivosFiltroRev(id).subscribe(data => { this.bienes = data });
  }
  Reload() {
    this.combos.controls['idSucursal'].setValue(0);
    this.combos.controls['idArea'].setValue(0);
    this.combos.controls['idTipo'].setValue(0);
    this.tablaEdificios = 'none';
    this.tablaIntengibles = 'none';
    this.controlService.listarActivosRevalorizar().subscribe(data => {
      this.bienes = data
      this.tablaMuebles = 'block';
      this.banderaBuscador = 1;
    });
  }

  open6(id) {
    this.titulo6 = "Eliminar revalorizaciones";
    this.display6 = 'block';
    this.revalorizacion.controls["idBien"].setValue(id);
    this.mantenimientoService.listarRevalorizacion(this.revalorizacion.controls["idBien"].value).subscribe(data => { this.revalorizaciones = data });
  }

  
  eliminar(idtran) {
   /* this.catalogosServices.noEliminarEmpleado(idempleado).subscribe(data => {
      if (data == 1) {
        Swal.fire({
          icon: 'error',
          title: '¡ERROR!',
          text: 'No es posible eliminar este registro, ya existen activos denominados a este empleado',
          confirmButtonText: 'Aceptar'
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó eliminar un empleado en el sistema.`).subscribe();
      } else {*/
        Swal.fire({
          title: '¿Estás seguro de eliminar este registro?',
          text: "¡No podrás revertir esta acción!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '¡Si, eliminar!',
          cancelButtonText: "Cancelar"
        }).then((result) => {
          if (result.value) {
            this.mantenimientoService.eliminarRevalorizacion(idtran).subscribe(data => {
              if (data == 1) {
                Swal.fire({
                  icon: 'success',
                  title: '¡ELIMINADO!',
                  text: '¡El registro ha sido eliminado con éxito!',
                  confirmButtonText: 'Aceptar'
                });
                this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Eliminó una revalorización.`).subscribe();
                this.mantenimientoService.listarRevalorizacion(this.revalorizacion.controls["idBien"].value).subscribe(data => { this.revalorizaciones = data });
              } else {
                Swal.fire({
                  icon: 'success',
                  title: '¡Error!',
                  text: '¡Ocurrió un error al eliminar el registro!',
                  confirmButtonText: 'Aceptar'
                });
                this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó eliminar una revalorización en el sistema.`).subscribe();
              }
            });
          }
        })
      //}
   // })
  }
  guardarDatos() {
    this.mantenimientoService.insertarRevalorizacion(this.revalorizacion.value).subscribe(res => {
      if (res == 1) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Revalorización guardada con éxito!',
          showConfirmButton: false,
          timer: 3000
        });
        this.controlService.listarActivosRevalorizar().subscribe(data => {
          this.bienes = data
         // this.tablaMuebles = 'block';
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Realizó una revalorización de activos.`).subscribe();
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡Los activos ya han sido depreciados en el periodo actual!',
          showConfirmButton: false,
          timer: 3000
        })
      }
    });
    this.controlService.listarActivosRevalorizar().subscribe(data => {
      this.bienes = data
     // this.tablaMuebles = 'block';
    });
  
    this.display = 'none';
  }
  open(idBien, vidaUtil, fecha) {
    // alert(id);
    this.revalorizacion.controls["fecha"].setValue(fecha);
    var fecharecup = this.revalorizacion.controls["fecha"].value.split("-");
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
    this.titulo = "Revalorización";
    this.revalorizacion.controls["idBien"].setValue(idBien);
    this.revalorizacion.controls["vidaUtil"].setValue(vidaUtil);
    this.revalorizacion.controls["valorRevalorizacion"].setValue("");
    this.revalorizacion.controls["fecha"].setValue("");
    this.display = 'block';
  }

  validarVidaUtil(vida) {
    var id = this.revalorizacion.controls["idBien"].value;
    this.controlService.VidaUtilRevalorizar(id).subscribe(data => {
      if (vida.value > 0 && vida.value < data.vidaUtil || vida.value > 0 && vida.value < data.realvidautil) {
        this.vidaUtilCorrecta = true;
      } else {
        this.vidaUtilCorrecta = false;
      }
    });
  }
  detalles(id, tipo) {
    if (tipo == 1) {
      this.configuracionService.recuperarDatosGenrales(id).subscribe(data => {
        this.displayfoto = 'none';
        this.displayMensaje = 'none';
        if (data.foto != null) {
          this.foto = data.foto;
          this.displayfoto = 'block';
          this.displayMensaje = 'none';
        } else {
          this.displayMensaje = 'block';
          this.displayfoto = 'none';
        }
        this.descripcion = data.descripcion;
        this.codigo = data.codigo;
        this.fecha = data.fecha;
        this.valorAdquisicion = data.valorAquisicion;
        this.responsable = data.respondable;
        this.ubicacion = data.ubicacion;
        this.valorAcual = data.valorActual;
        this.provDon = data.provDon;
        this.noSerie = data.noSerie;
        this.vidaUtil = data.vidaUtil;
        this.Observaciones = data.observaciones;
      });
      this.display2 = 'block';
    } else {
      this.configuracionService.recuperarDatosGenralesEdificiosIntangibles(id).subscribe(data => {
        this.displayfoto = 'none';
        this.displayMensaje = 'none';
        if (data.foto != null) {
          this.foto = data.foto;
          this.displayfoto = 'block';
          this.displayMensaje = 'none';
        } else {
          this.displayMensaje = 'block';
          this.displayfoto = 'none';
        }
        this.descripcion = data.descripcion;
        this.codigo = data.codigo;
        this.fecha = data.fecha;
        this.valorAdquisicion = data.valorAquisicion;
        this.valorAcual = data.valorActual;
        this.provDon = data.provDon;
        this.clasificacion = data.clasificacion;
        this.vidaUtil = data.vidaUtil;
        this.Observaciones = data.observaciones;

      });
      this.display3 = 'block';
    }
  }
  close() {
    this.display = 'none';
  }
  close2() {
    this.display2 = 'none';
  }
  close3() {
    this.display3 = 'none';
  }
  close6() {
    this.display6 = 'none';
  }
 /* ValidarActivosRevalorizacion() {
    this.controlService.ValidarActivosARevalorizar().subscribe(data => {
      if (data == 1) {

        this.router.navigate(["/tabla-revalorizar"]);
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡Los activos ya han sido depreciados en el periodo actual!',
          showConfirmButton: false,
          timer: 3000
        })
        this.close();
      }
    });
  }*/
  buscar(buscador) {
    this.p = 1;
    if (this.banderaBuscador == 1) {
      this.controlService.buscarActivoRevalorizar(buscador.value).subscribe(res => { this.bienes = res });
    } else if (this.banderaBuscador == 2) {
      this.controlService.buscarEdificiosRevalorizar(buscador.value).subscribe(res => { this.bienes = res });
    } else if (this.banderaBuscador == 3) {
      this.controlService.buscarActivoIntangibleRevalorizar(buscador.value).subscribe(res => { this.bienes = res });
    }
  }
  open5() { //para modal de ayuda
    this.display5 = 'block';
  }
  close5() { //para modal de ayuda
    this.display5 = "none";
  }

}