import { Component, OnInit } from '@angular/core';
import { BajaService } from './../../services/baja.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//para filtro de areas y sucursales
import { CatalogosService } from './../../services/catalogos.service';
import { UsuarioService } from './../../services/usuario.service';
import { SeguridadService } from './../../services/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-descargo',
  templateUrl: './gestion-descargo.component.html',
  styleUrls: ['./gestion-descargo.component.css']
})
export class GestionDescargoComponent implements OnInit {
  tablaEdificios = 'none';
  tablaMuebles = 'none';
  tablaIntengibles = 'none';
  tablaMueblesNoAsig = 'none';
  disabledFiltro: boolean;
  disabledFiltroBotonAsignacion: boolean;
  banderaBuscador: any = 1;
  BanderaAsignados: boolean = true;
  BtnAsinacion: string;

  datosbien: FormGroup;
  activo: any;
  display = 'none';
  p: number = 1;
  //para filtro
  areas: any;
  sucursal: any;
  solicitud2: FormGroup;
  //Variable para redireccionar
  parametro: string;

  //para ver los datos
  fecha: string; fecha2: string; marca: string; area: string; proveedor: string; donante: string; clasificacion: string;
  responsable: string; codigo: string; descripcion: string; folio: string; entidad: string;
  tipoadqui: string; color: string; estado: string; valor: string; valoractual: string; acuerdo: string; 
  motivo: string; depreciacion: string;
 //variables para division
 isAdmin: boolean = false;
 tipoUsuario = sessionStorage.getItem("tipo");
 idEmpleado = sessionStorage.getItem("empleado");
  constructor(private bajaService: BajaService, private catalogosServices: CatalogosService, private usuarioService: UsuarioService,
  private router: Router, private activateRoute: ActivatedRoute,private seguridadService:SeguridadService) {
    this.solicitud2 = new FormGroup({
      'idsolicitud': new FormControl("0"),
      //para filtro
      'idArea': new FormControl("0"),
      'idSucursal': new FormControl("0"),
      /////////////////////////////////////////////////
      'IdBien': new FormControl("0"),
      'tipoadquicicion': new FormControl("0")
    });

    this.activateRoute.params.subscribe(parametro => {
      this.parametro = parametro["param"];
    })
  }

  ngOnInit(): void {
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Consultó el historial de baja de activos.`).subscribe()
    //METODO PARA TABLA VACIA
    if(this.tipoUsuario=="1"){
      this.isAdmin=true;
    this.bajaService.validarHistorialParaBaja().subscribe(res => {
      if (res == 1) {
          this.bajaService.listarBienesAsignadosBajas().subscribe(res => { this.activo = res });
          this.catalogosServices.getComboSucursal().subscribe(data => { this.sucursal = data });//filtro
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se encontró ningún historial de baja.',
          showConfirmButton: false,
          timer: 4000
        });
        this.router.navigate(["/"]);
      }
    });
    if (this.parametro == "ver") {
      this.tablaMuebles = 'none';
      this.tablaIntengibles = 'none';
      this.tablaMueblesNoAsig = 'none';
      this.tablaEdificios = 'none'
      this.bajaService.listarBienesAsignadosBajas().subscribe(res => {
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
      this.bajaService.getBienesAsignadosEdificiosBajas().subscribe(res => {
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
      this.bajaService.listarBienesNoAsignadosBajas().subscribe(res => {
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
      this.bajaService.getBienesAsignadosIntengiblesBajas().subscribe(res => {
        this.activo = res
        this.tablaIntengibles = 'block'
      });
      this.disabledFiltro = true;
      this.banderaBuscador = 3;
    }
  }else{
    this.tablaMuebles = 'none';
    this.tablaIntengibles = 'none';
    this.tablaMueblesNoAsig = 'none';
    this.tablaEdificios = 'none'
    this.seguridadService.getHistorialBajaJefe(this.idEmpleado).subscribe(res => { this.activo = res 
      this.tablaMuebles = 'block';
    });
    this.isAdmin=false;
    this.banderaBuscador=5;
  }
}
  close() {
    this.display = 'none';
  }

  ver(id: any) {
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Consultó el informe de baja de un activo.`).subscribe()
    this.display = 'block';
    this.bajaService.verDescargos(id).subscribe((data) => {
      this.codigo = data.codigo;
      this.folio = data.folio;
      this.fecha = data.fechacadena;
      this.fecha2 = data.fechacadena2;
      this.entidad = data.entidadbeneficiaria;
      this.proveedor = data.proveedor;
      this.clasificacion = data.clasificacion;
      this.acuerdo = data.acuerdo;
      this.donante = data.donante;
      this.color = data.color;
      this.marca = data.marca;
      this.descripcion = data.descripcion;
      this.estado = data.estadoingreso;
      this.tipoadqui = data.tipoadquicicion;
      this.valor = data.valor;
     // this.valoractual = data.valoractual;
      //this.depreciacion = data.depreciacion;
      this.motivo = data.nombredescargo;
      this.responsable = data.responsable;
      //console.log(id);
    });
  }


  FiltrarArea() {
    var id = this.solicitud2.controls['idSucursal'].value;
    this.bajaService.ComboArea(id).subscribe(data => { this.areas = data });
  }

  Filtrar() {
    var id = this.solicitud2.controls['idArea'].value;
    this.bajaService.FiltroTablaActivosBajas(id).subscribe(data => { this.activo = data });
  }

  Reload() {
    this.solicitud2.controls['idSucursal'].setValue(0);
    this.solicitud2.controls['idArea'].setValue(0);
    this.solicitud2.controls['idsolicitud'].setValue(1);
    this.BtnAsinacion = "Ver no asignados";
    this.tablaMueblesNoAsig = 'none';
    this.tablaEdificios = 'none';
    this.tablaIntengibles = 'none';
    this.bajaService.listarBienesAsignadosBajas().subscribe(res => {
      this.activo = res
      this.tablaMuebles = 'block';
      this.banderaBuscador = 1;
    });
    this.disabledFiltroBotonAsignacion = false;
    this.BanderaAsignados = true
    this.disabledFiltro = false;
  }

  buscar(buscador) {
    this.p = 1;
    if (this.banderaBuscador == 1) {
      this.bajaService.buscarBienAsigBajas(buscador.value).subscribe(res => { this.activo = res });
    } else if (this.banderaBuscador == 2) {
      this.bajaService.buscarActivoEdificioAsigBajas(buscador.value).subscribe(res => { this.activo = res });
    } else if (this.banderaBuscador == 3) {
      this.bajaService.buscarActivoIntengibleAsigBajas(buscador.value).subscribe(res => { this.activo = res });
    } else if (this.banderaBuscador == 4) {
      this.bajaService.buscarActivoNoAsigBajas(buscador.value).subscribe(res => { this.activo = res });
    }else if (this.banderaBuscador == 5) {
      this.seguridadService.BuscarHistorialBajaJefe(this.idEmpleado,buscador.value).subscribe(res => { this.activo = res });
    }
  }

  CambiarTipo() {
    switch (this.solicitud2.controls["idsolicitud"].value) {
      case '1':
        this.tablaEdificios = 'none'
        this.tablaIntengibles = 'none'
        this.bajaService.listarBienesAsignadosBajas().subscribe(res => {
          this.activo = res
          this.tablaMuebles = 'block'
        });
        this.disabledFiltro = false;
        this.banderaBuscador = 1;
        break;
      case '2':
        this.tablaMuebles = 'none'
        this.tablaIntengibles = 'none'
        this.bajaService.getBienesAsignadosEdificiosBajas().subscribe(res => {
          this.activo = res
          this.tablaEdificios = 'block'
        });
        this.disabledFiltro = true;
        this.banderaBuscador = 2;
        break;
      case '3':
        this.tablaEdificios = 'none'
        this.tablaMuebles = 'none'
        this.bajaService.getBienesAsignadosIntengiblesBajas().subscribe(res => {
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
      this.bajaService.listarBienesNoAsignadosBajas().subscribe(res => {
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
      this.bajaService.listarBienesAsignadosBajas().subscribe(res => {
        this.activo = res
        this.tablaMuebles = 'block';
        this.banderaBuscador = 1;
      });
      this.disabledFiltroBotonAsignacion = false;
      this.BanderaAsignados = true
    }
  }

}
