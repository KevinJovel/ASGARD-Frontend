import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ControlService } from './../../services/control.service';
import { UsuarioService } from './../../services/usuario.service';
import { CargarScriptsService } from './../../services/cargar-scripts.service';
//PRUEBA CON OBJETO
import { MantenimientoService } from './../../services/mantenimiento.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-asignancion',
  templateUrl: './form-asignancion.component.html',
  styleUrls: ['./form-asignancion.component.css']
})
export class FormAsignancionComponent implements OnInit {
  activos: any;
  bienes: any;
  empleados: any;
  p: number = 1;
  activo: FormGroup;
  display = 'none';
  display2 = 'none';
  display5 = 'none';// para ayuda
  titulo: string;
  titulo2: string;
  vidaUtilCorrecta: boolean = false;
  fechaMaxima: any;
  fechaMinima: any;
  anio: string;
  nombreActivo: any;
  modelo: any;
  marca: any;
  @Input() noSoli: string;
  constructor(private controlService: ControlService, private _cargarScript: CargarScriptsService, private mantenimientoService: MantenimientoService, private router: Router, private usuarioService: UsuarioService) {
    this._cargarScript.cargar(["/barCode", "/ClearBarcode"]);
    this.activo = new FormGroup({
      'idBien': new FormControl("0"),
      'noSerie': new FormControl("", [Validators.required, Validators.maxLength(50)]),
      'vidaUtil': new FormControl("", [Validators.required, Validators.maxLength(2), Validators.pattern("^[0-9]+$")]),
      'idEmpleado': new FormControl("0"),
      'Responsable': new FormControl(""),
      'codigo': new FormControl(""),
      'codigoBarras': new FormControl(""),
      'fecha': new FormControl("")
    });
  }
  ngOnInit(): void {
    this.controlService.validarActivosAsignar().subscribe(res => {
      if (res == 1) {
        this.controlService.getActivosSinAsignar().subscribe(res => { this.activos = res });
        this.controlService.listarComboAsigar().subscribe(res => { this.empleados = res });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No hay activos disponibles para asignar.',
          showConfirmButton: false,
          timer: 4000
        });
        this.router.navigate(["/"]);
      }
    })
  }
  close() {
    this.display = 'none';
  }
  asignar(id, fecha) {
    this.activo.controls["fecha"].setValue(fecha);
    var fecharecup = this.activo.controls["fecha"].value.split("-");
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

    this.titulo = "Asignar nuevo activo ";
    this.activo.controls["idBien"].setValue(id);
    this.activo.controls["codigo"].setValue("");
    this.activo.controls["idEmpleado"].setValue("0");
    this.activo.controls["noSerie"].setValue("");
    this.activo.controls["vidaUtil"].setValue("");
    this.display = 'block';

  }
  validarVidaUtil(vida) {
    var id = this.activo.controls["idBien"].value;
    this.controlService.getVidaUtil(id).subscribe(data => {
      if (vida.value > 0 && vida.value < data.vidaUtil) {
        this.vidaUtilCorrecta = true;
      } else {
        this.vidaUtilCorrecta = false;
      }
    });

  }
  Gcodigo() {
    if (this.activo.controls["idEmpleado"].value == 0) {
      Swal.fire({
        icon: 'error',
        title: 'ADVERTENCIA',
        text: 'Seleccione un empleado para generar el código',
      })
    } else {
      var idempleado = this.activo.controls["idEmpleado"].value;
      var idbien = this.activo.controls["idBien"].value;
      this.controlService.GenerarCodigo(idempleado, idbien).subscribe(data => {
        var correlativoSucursal = data.correlativoSucursal;
        var correlativoArea = data.correlativoArea;
        var correlativoClasificacion = data.correlativoClasificacion;
        var correlativo = data.correlativo;
        this.activo.controls["codigo"].setValue(correlativoSucursal + "-" + correlativoArea + "-" + correlativoClasificacion + "-" + correlativo);
      });
    }
  }
  GcodigoBarra() {

    if (this.activo.controls["codigo"].value == "") {
      Swal.fire({
        icon: 'error',
        title: '¡ERROR!',
        text: 'Por favor, seleccione el empleado a asignar para poder generar el código'
      });
    } else {
      this.titulo = "Codigo de barras generado";
      this.controlService.DatosCodigoBarras(this.activo.controls["idBien"].value).subscribe(res => {
        this.nombreActivo = res.nombre;
        this.modelo = res.modelo;
        this.marca = res.marca;
      })
      this.display2 = 'block';
    }
  }

  validar() {
    if (this.activo.controls["codigo"].value == "") {
      Swal.fire({
        icon: 'error',
        title: 'ERROR',
        text: 'Seleccione un empleado para generar el codigo',
      })
    }
  }
  AsignarBienes() {
    if (this.activo.valid == true) {
      if (this.activo.controls["idEmpleado"].value == 0) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: '¡Advertencia!',
          text: 'Selecciona el empleado a asignar',
          showConfirmButton: false,
          timer: 3000
        });
      } else {
        var fecha = this.activo.controls["fecha"].value.split("-");
        var anio = fecha[0];
        var mes = fecha[1];
        var dia = fecha[2];
        this.activo.controls["fecha"].setValue(mes + "/" + dia + "/" + anio);
        console.log(this.activo.value);
        this.controlService.AsignarBien(this.activo.value).subscribe(data => {
          if (data == 1) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '¡Activo asignado con éxito!',
              showConfirmButton: false,
              timer: 3000
            });
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Se asignó un activo en el sistema.`).subscribe();
            this.controlService.getActivosSinAsignar().subscribe(res => { this.activos = res });
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: '¡Ocurrió un error al asignar activo!',
              showConfirmButton: false,
              timer: 3000
            });
          }
          this.display = 'none';
        });
      }
    }
  }
  buscar(buscador) {
    this.p = 1;
    this.controlService.buscarActivoNoAsig(buscador.value).subscribe(res => { this.activos = res });
  }

  //PDF
  async recuperar() {
    this.mantenimientoService.listarDatosSolicitud(1).subscribe(data => {
    });
    this.mantenimientoService.listarBienesSolicitados(1).subscribe(res => {
      this.bienes = res;
    });
  }

  close2() {
    this.display2 = 'none';
  }

  ver() {
    var canvas = <HTMLInputElement>document.getElementById("barcode");
  }
  open5() { //para modal de ayuda
    this.display5 = 'block';
  }
  close5() { //para modal de ayuda
    this.display5 = "none";
  }
}
