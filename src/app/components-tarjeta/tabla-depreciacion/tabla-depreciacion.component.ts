import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogosService } from './../../services/catalogos.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DepreciacionService } from './../../services/depreciacion.service';
import { UsuarioService } from './../../services/usuario.service';
import { ConfiguracionService } from './../../services/configuracion.service';
import { ControlService } from './../../services/control.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-depreciacion',
  templateUrl: './tabla-depreciacion.component.html',
  styleUrls: ['./tabla-depreciacion.component.css']
})
export class TablaDepreciacionComponent implements OnInit {
  bienes: any;
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
  datos: FormGroup;
  datosTotal: FormGroup;
  display = 'none';
  display2 = 'none';
  display3 = 'none';
  displayfoto = 'none';
  displayMensaje = 'none';
  //Datos del modal
  coopertativa: string;
  anio: any;
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

  constructor(private catalogosServices: CatalogosService, private controlService: ControlService, private depreciacionService: DepreciacionService, private configuracionService: ConfiguracionService, private router: Router, private usuarioService: UsuarioService) {
    this.combos = new FormGroup({
      'idArea': new FormControl("0"),
      'idSucursal': new FormControl("0"),
      'idTipo': new FormControl("0")
    });
    this.datos = new FormGroup({
      'idBien': new FormControl("0"),
      'Ultimafecha': new FormControl(""),
      'fechaAdquisicion': new FormControl(""),
      'codigo': new FormControl(""),
      'descripcion': new FormControl(""),
      'valorAdquicicion': new FormControl(""),
      'valorActual': new FormControl(""),
      'valorDepreciacion': new FormControl("0.00"),
      'fecha': new FormControl("")
    });
    this.datosTotal = new FormGroup({
      'idBien': new FormControl("0"),
      'fecha': new FormControl(""),
      'valorDepreciacion': new FormControl("0.00")
    });
  }

  ngOnInit(): void {
    this.catalogosServices.getComboSucursal().subscribe(data => { this.sucursales = data });
    this.depreciacionService.TablaDepreciacion().subscribe(data => {
      this.bienes = data
      this.tablaMuebles = 'block';
    });
  }
  CambiarTipo() {
    switch (this.combos.controls["idTipo"].value) {
      case '1':
        this.tablaEdificios = 'none'
        this.tablaIntengibles = 'none'
        this.depreciacionService.TablaDepreciacion().subscribe(data => {
          this.bienes = data
          this.tablaMuebles = 'block';
        });
        this.disabledFiltro = false;
        this.banderaBuscador = 1;
        break;
      case '2':
        this.tablaMuebles = 'none'
        this.tablaIntengibles = 'none'
        this.depreciacionService.TablaDepreciacionEdificios().subscribe(res => {
          this.bienes = res
          this.tablaEdificios = 'block'
        });
        this.disabledFiltro = true;
        this.banderaBuscador = 2;
        break;
      case '3':
        this.tablaEdificios = 'none'
        this.tablaMuebles = 'none'
        this.depreciacionService.TablaDepreciacionIntangibles().subscribe(res => {
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
    this.depreciacionService.ComboArea(id).subscribe(data => { this.areas = data });
  }
  Filtrar() {
    var id = this.combos.controls['idArea'].value;
    this.depreciacionService.FiltroTablaDepreciacion(id).subscribe(data => { this.bienes = data });
  }
  Reload() {
    this.combos.controls['idSucursal'].setValue(0);
    this.combos.controls['idArea'].setValue(0);
    this.combos.controls['idTipo'].setValue(0);
    this.tablaEdificios = 'none';
    this.tablaIntengibles = 'none';
    this.depreciacionService.TablaDepreciacion().subscribe(data => {
      this.bienes = data
      this.tablaMuebles = 'block';
      this.banderaBuscador = 1;
    });
    this.disabledFiltroBotonAsignacion = false;
    this.disabledFiltro = false;
  }
  AplicarDepreciacion() {
    console.log(this.datos.value);
    if (this.datos.valid == true) {

      this.depreciacionService.transaccionDepreciacion(this.datos.value).subscribe((data) => {
        if (data == 1) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Depreciación aplicada con éxito!',
            showConfirmButton: false,
            timer: 3000
          });
          this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Realizó el proceso de depreciación.`).subscribe();
          this.display = 'none';
          this.tablaEdificios = 'none'
          this.tablaIntengibles = 'none'
          this.depreciacionService.TablaDepreciacion().subscribe(data => {
            this.bienes = data
            this.tablaMuebles = 'block'
            this.combos.controls['idTipo'].setValue(0);
          });
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '¡Ocurrió un error al aplicar la depreciación!',
            showConfirmButton: false,
            timer: 3000
          });
          this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó realizar el proceso de depreciación.`).subscribe();
        }
      });
    }
  }
  AplicarDepreciacionTotal() {
    this.depreciacionService.ListaActivosDepreciar().subscribe(data => {
      data.forEach(item => {
        try {
          //sentencias del metodo
          this.depreciacionService.DatosDepreciacion(item.id).subscribe(data => {
            if (data.valorActual <= 0) {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: '¡Ocurrió un error al realizar el proceso!',
                showConfirmButton: false,
                timer: 3000
              });
              this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó realizar el proceso de depreciación total.`).subscribe();
            } else {
              this.datosTotal.controls["idBien"].setValue(data.idBien);
              this.anio = data.anio;
              this.datos.controls["codigo"].setValue(data.codigo);
              this.datos.controls["descripcion"].setValue(data.descipcion);
              this.datos.controls["valorAdquicicion"].setValue(data.valorAdquicicon);
              this.datos.controls["valorActual"].setValue(data.valorActual);
              if (data.tipo == 2) {
                if (data.concepto = "Compra") {
                  this.datos.controls["Ultimafecha"].setValue(data.fechaAsignacion);
                } else {
                  this.datos.controls["Ultimafecha"].setValue(data.fecha);
                }
                this.datos.controls["fechaAdquisicion"].setValue(data.fechaAsignacion);
              } else {
                this.datos.controls["fechaAdquisicion"].setValue(data.fechaAdquisicion);
                this.datos.controls["Ultimafecha"].setValue(data.fecha);
              }
              //split a la fecha de adquisicion para calculos
              var fechaAdquisicion = this.datos.controls["fechaAdquisicion"].value.split("-");
              let diaA = fechaAdquisicion[0];
              let mesA = fechaAdquisicion[1];
              let anioA = fechaAdquisicion[2];
              //split a la fecha de la ultima transaccion para calculos
              var Ultimafecha = this.datos.controls["Ultimafecha"].value.split("-");
              let dia = Ultimafecha[0];
              let mes = Ultimafecha[1];
              let anio = Ultimafecha[2];
              //Decalracion de variables de tiempo, cada variable hace referencia a un momento en el tiempo
              //de vida util del activo
              const FECHA_ADQUISICION = new Date(anioA, mesA - 1, diaA);//La fecha en la que se adquirio el bien
              const FECHA_FINAL_DEPRECIACION = new Date((parseInt(anioA) + data.vidaUtil), mesA - 1, diaA);//La fecha final de vida util del bien, se le suma la vida util al año
              const ULTIMA_TRANSACCION = new Date(anio, mes - 1, dia);//La ultima transaccion registrada en el sistema con este id
              //dias totales epara depreciacion
              let diasTotalesDepreciacion = this.diasToatales(FECHA_ADQUISICION, FECHA_FINAL_DEPRECIACION);
              //transaccion actual
              let transaccion = new Date(this.anio, 11, 31);
              //Dias transcurridos entre la ultima depreciacion y la fecha de adquisicon
              const DIAS_TOTALES_TRANSCURRIDOS = this.diasToatales(FECHA_ADQUISICION, ULTIMA_TRANSACCION);
              //dias transcurridos entre la ultima transaccion "Depreciaocion" y la transaccion actual
              const DIAS_TOTALES_TRANSACCION_ACTUAL = this.diasToatales(ULTIMA_TRANSACCION, transaccion);
              //Validacion de valor a depreciar
              const DIAS_DESPUES_TRANSACCION_ACTUAL = (this.diasToatales(FECHA_ADQUISICION, transaccion));
              var montoDepreciacion;
              if (DIAS_DESPUES_TRANSACCION_ACTUAL > diasTotalesDepreciacion) {
                transaccion = FECHA_FINAL_DEPRECIACION;
                let valorActual = data.valorActual;
                let valorDiario = valorActual / (diasTotalesDepreciacion - DIAS_TOTALES_TRANSCURRIDOS);
                const DIAS_TOTALES_ULTIMA_TRANSACCION = this.diasToatales(ULTIMA_TRANSACCION, FECHA_FINAL_DEPRECIACION);
                montoDepreciacion = (valorDiario * DIAS_TOTALES_ULTIMA_TRANSACCION);
                this.datosTotal.controls["fecha"].setValue(mesA + "/" + diaA + "/" + (parseInt(anioA) + data.vidaUtil));
              } else {
                let valorActual = data.valorActual;
                let valorDiario = valorActual / (diasTotalesDepreciacion - DIAS_TOTALES_TRANSCURRIDOS);
                montoDepreciacion = (valorDiario * DIAS_TOTALES_TRANSACCION_ACTUAL);
                this.datosTotal.controls["fecha"].setValue(12 + "/" + 31 + "/" + this.anio);
              }
              this.datosTotal.controls["valorDepreciacion"].setValue(montoDepreciacion);
              if (this.datosTotal.valid == true) {
                console.log(this.datosTotal.value);
                this.depreciacionService.transaccionDepreciacion(this.datosTotal.value).subscribe((data) => {
                  if (data == 1) {
                    console.log("Realizo depreciación");

                  } else {
                    Swal.fire({
                      position: 'center',
                      icon: 'error',
                      title: '¡Ocurrio un error 1!',
                      showConfirmButton: false,
                      timer: 3000
                    })
                  }
                });
              } else {
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: '¡Ocurrio un error 2!',
                  showConfirmButton: false,
                  timer: 3000
                })
              }
            }
          });
        } catch (error) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '¡Ocurrio un error catch!',
            showConfirmButton: false,
            timer: 3000
          });
        }
      });
      let timerInterval
      Swal.fire({
        title: '¡Ejecutando Depreciación!',
        html: 'Espere un momento',
        timer: 5000,
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
            const content = Swal.getContent()
            if (content) {
              const b = content.querySelector('b')
              if (b) {
                Swal.getTimerLeft()
              }
            }
          }, 100)
        },
        onClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Depreciacion realizada con exito!',
            showConfirmButton: false,
            timer: 3000
          });
          this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Realizó el proceso de depreciación total.`).subscribe();
          this.router.navigate(["/tabla-tarjeta"]);
        }
      })
    });
  }
  open(id) {
    this.depreciacionService.DatosDepreciacion(id).subscribe(data => {
      if (data.valorActual <= 0) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: '¡Ocurrio un error al recuperar la información!',
          showConfirmButton: false,
          timer: 3000
        });
      } else {
        this.datos.controls["idBien"].setValue(data.idBien);
        this.coopertativa = data.cooperativa;
        this.anio = data.anio;
        this.datos.controls["codigo"].setValue(data.codigo);
        this.datos.controls["descripcion"].setValue(data.descipcion);
        this.datos.controls["valorAdquicicion"].setValue(data.valorAdquicicon);
        this.datos.controls["valorActual"].setValue(data.valorActual);
        if (data.tipo == 2) {
          if (data.concepto = "Compra") {
            this.datos.controls["Ultimafecha"].setValue(data.fechaAsignacion);
          } else {
            this.datos.controls["Ultimafecha"].setValue(data.fecha);
          }
          this.datos.controls["fechaAdquisicion"].setValue(data.fechaAsignacion);
        } else {
          this.datos.controls["fechaAdquisicion"].setValue(data.fechaAdquisicion);
          this.datos.controls["Ultimafecha"].setValue(data.fecha);
        }
        //split a la fecha de adquisicion para calculos
        var fechaAdquisicion = this.datos.controls["fechaAdquisicion"].value.split("-");
        let diaA = fechaAdquisicion[0];
        let mesA = fechaAdquisicion[1];
        let anioA = fechaAdquisicion[2];
        //split a la fecha de la ultima transaccion para calculos
        var Ultimafecha = this.datos.controls["Ultimafecha"].value.split("-");
        let dia = Ultimafecha[0];
        let mes = Ultimafecha[1];
        let anio = Ultimafecha[2];
        //Decalracion de variables de tiempo, cada variable hace referencia a un momento en el tiempo
        //de vida util del activo
        const FECHA_ADQUISICION = new Date(anioA, mesA - 1, diaA);//La fecha en la que se adquirio el bien
        const FECHA_FINAL_DEPRECIACION = new Date((parseInt(anioA) + data.vidaUtil), mesA - 1, diaA);//La fecha final de vida util del bien, se le suma la vida util al año
        const ULTIMA_TRANSACCION = new Date(anio, mes - 1, dia);//La ultima transaccion registrada en el sistema con este id
        //dias totales epara depreciacion
        let diasTotalesDepreciacion = this.diasToatales(FECHA_ADQUISICION, FECHA_FINAL_DEPRECIACION);
        //transaccion actual
        let transaccion = new Date(this.anio, 11, 31);
        //Dias transcurridos entre la ultima depreciacion y la fecha de adquisicon
        const DIAS_TOTALES_TRANSCURRIDOS = this.diasToatales(FECHA_ADQUISICION, ULTIMA_TRANSACCION);
        //dias transcurridos entre la ultima transaccion "Depreciaocion" y la transaccion actual
        const DIAS_TOTALES_TRANSACCION_ACTUAL = this.diasToatales(ULTIMA_TRANSACCION, transaccion);
        //Validacion de valor a depreciar
        const DIAS_DESPUES_TRANSACCION_ACTUAL = (this.diasToatales(FECHA_ADQUISICION, transaccion));
        var montoDepreciacion;
        if (DIAS_DESPUES_TRANSACCION_ACTUAL > diasTotalesDepreciacion) {
          transaccion = FECHA_FINAL_DEPRECIACION;
          let valorActual = data.valorActual;
          console.log(`Valor actual ${valorActual}`);
          let valorDiario = valorActual / (diasTotalesDepreciacion - DIAS_TOTALES_TRANSCURRIDOS);
          const DIAS_TOTALES_ULTIMA_TRANSACCION = this.diasToatales(ULTIMA_TRANSACCION, FECHA_FINAL_DEPRECIACION);
          montoDepreciacion = (valorDiario * DIAS_TOTALES_ULTIMA_TRANSACCION);
          this.datos.controls["fecha"].setValue(mesA + "/" + diaA + "/" + (parseInt(anioA) + data.vidaUtil));
        } else {
          let valorActual = data.valorActual;
          console.log(`Valor actual ${valorActual}`);
          let valorDiario = valorActual / (diasTotalesDepreciacion - DIAS_TOTALES_TRANSCURRIDOS);
          montoDepreciacion = (valorDiario * DIAS_TOTALES_TRANSACCION_ACTUAL);
          this.datos.controls["fecha"].setValue(12 + "/" + 31 + "/" + this.anio);
        }
        this.datos.controls["valorDepreciacion"].setValue(montoDepreciacion);
        let valorRnDepreciar = Math.round(montoDepreciacion * 100) / 100;
        valorRnDepreciar.toFixed(2);
        this.valorDepreciarStr = valorRnDepreciar.toString();
        //pasar a 2 decimales el valor actual
        let valorRnActual = Math.round(data.valorActual * 100) / 100;
        valorRnActual.toFixed(2);
        this.valorActualStr = valorRnActual.toString();
        this.display = 'block';
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Consultó la ifnromación de un activo.`).subscribe();
        //Console logs
        // console.log(data.idBien);
        //Console logs de prueba --- se eliminara una vez se tenga claro que funciona correctamente
        // console.log(`Fecha adquisicion ${FECHA_ADQUISICION}`);
        // console.log(`Ultima Final de depreciacion ${FECHA_FINAL_DEPRECIACION}`);
        // console.log(`Ultima transaccion "Depreciacion" ${ULTIMA_TRANSACCION}`);
        // console.log(`Dias totales a depreciar ${diasTotalesDepreciacion}`);
        // console.log(`Dias trascurridos ${DIAS_TOTALES_TRANSCURRIDOS}`);
        // console.log(`Dias trascurridos ACTUAL ${DIAS_TOTALES_TRANSACCION_ACTUAL}`);
        // console.log(`Dias DESPUES DE ACTUAL ${DIAS_DESPUES_TRANSACCION_ACTUAL}`);
        // console.log(transaccion);
        // console.log(ULTIMA_TRANSACCION);
        // console.log(transaccion);
      }
    });
  }
  diasToatales(fechaIngreso, fechaDepreciacion) {
    let unDia = 1000 * 60 * 60 * 24;
    const diferecia = Math.abs(fechaIngreso - fechaDepreciacion)
    return Math.floor(diferecia / unDia);
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
  buscar(buscador) {
    this.p = 1;
    if (this.banderaBuscador == 1) {
      this.depreciacionService.BuscarTablaDepreciacion(buscador.value).subscribe(res => { this.bienes = res });
    } else if (this.banderaBuscador == 2) {
      this.controlService.buscarActivoEdificioAsig(buscador.value).subscribe(res => { this.bienes = res });
    } else if (this.banderaBuscador == 3) {
      this.controlService.buscarActivoIntengibleAsig(buscador.value).subscribe(res => { this.bienes = res });
    }
  }
  // if (this.persona.valid == true) {
  //   var fechaNac = this.persona.controls["fechaNacimiento"].value.split("-");
  //   var anio = fechaNac[0];
  //   var mes = fechaNac[1];
  //   var dia = fechaNac[2];
  //   this.persona.controls["fechaNacimiento"].setValue(mes + "/" + dia + "/" + anio);
  //       this.personaService.agregarPersona(this.persona.value).subscribe(data => { this.route.navigate(["/mantenimiento-persona"]) });

  // }

}
