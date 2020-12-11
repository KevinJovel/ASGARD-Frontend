import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ControlService } from './../../services/control.service';
import { UsuarioService } from './../../services/usuario.service';
import { SeguridadService } from './../../services/seguridad.service';
import { CatalogosService } from './../../services/catalogos.service';//filtro
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http'
import {environment} from '../../../environments/environment';
import { State, StateService } from './../../services/state.service';//para compartir entre componentes
@Component({
  selector: 'app-registro-activos',
  templateUrl: './registro-activos.component.html',
  styleUrls: ['./registro-activos.component.css']
})
export class RegistroActivosComponent implements OnInit {

  tablaEdificios = 'none';
  tablaMuebles = 'none';
  tablaIntengibles = 'none';
  tablaMueblesNoAsig = 'none';
  disabledFiltro: boolean;
  disabledFiltroBotonAsignacion: boolean;
  banderaBuscador: any = 1;
  BanderaAsignados: boolean = true;
  BtnAsinacion: string;

  dataState: State;//hace referencia a la variable donde estan almacenados los datos
  activos: any;
  idactivo: any;
  id: any;
  tipocombo: string;
  combo: FormGroup;
  p: number = 1;
  foto2: any;
  display = 'none';
  display2 = 'none';
  display3 = 'none';
  display4 = 'none';
  display5 = 'none'; //para ayuda
  displayfoto = 'none';
  displayMensaje = 'none';
  //filtro combo
  areas: any;
  sucursal: any;
  nuevobien: FormGroup;

  //Variable para redireccionar
  parametro: string;

  //descripcion: string;
  bienObj: any = {};
  Bien: any = {};//para mandar datos
  disabled: boolean;
  //para ver los datos
  fecha: string; marca: string; area: string; proveedor: string; donante: string; clasificacion: string;
  destino: string; responsable: string; codigo: string; descripcion: string; modelo: string;
  tipoadqui: string; color: string; numserie: string; vidautil: string; estado: string; valor: string;
  plazo: string; prima: string; cuota: string; interes: string; valorresidual: string; foto: string;
  noformu: string;
  ubicacion: string;
  provDon: string;
  Observaciones: string;
  //variables para division de roles
  isAdmin: boolean = false;
  tipoUsuario = sessionStorage.getItem("tipo");
  idEmpleado = sessionStorage.getItem("empleado");
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private stateService: StateService, private controlService: ControlService,
    private catalogosServices: CatalogosService, private usuarioService: UsuarioService, private seguridadService: SeguridadService, private http:HttpClient) {

    this.combo = new FormGroup({
      'idArea': new FormControl("0"),
      'idSucursal': new FormControl("0"),
      'idTipo': new FormControl("0"),
      'IdBien': new FormControl("0"),
      'bandera': new FormControl("0"),
      'idEmpleado': new FormControl("0"),
      'tipoadquicicion': new FormControl("0"),
    });
    this.activatedRoute.params.subscribe(parametro => {
      this.parametro = parametro["param"];
    })
  }

  ngOnInit() {
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Consultó el registro de activos.`).subscribe();

    if (this.tipoUsuario == "1") {
      this.isAdmin = true;
      if (this.parametro == "ver") {
        this.tablaMuebles = 'none';
        this.tablaIntengibles = 'none';
        this.tablaMueblesNoAsig = 'none';
        this.tablaEdificios = 'none'
        this.controlService.getBienesAsignados().subscribe(res => {
          this.activos = res
          this.tablaMuebles = 'block';
        });
        this.BtnAsinacion = "Ver no asignados"
        this.banderaBuscador = 1;
      } else if (this.parametro == "edificios") {
        this.BtnAsinacion = "Ver asignados";
        this.tablaMuebles = 'none';
        this.tablaIntengibles = 'none';
        this.tablaMueblesNoAsig = 'none';
        this.controlService.getBienesAsignadosEdificios().subscribe(res => {
          this.activos = res
          this.tablaEdificios = 'block'
        });
        this.disabledFiltro = true;
        this.banderaBuscador = 2;
      } else if (this.parametro == "tangibles") {
        this.BtnAsinacion = "Ver asignados";
        this.tablaEdificios = 'none';
        this.tablaIntengibles = 'none';
        this.tablaMuebles = 'none';
        this.controlService.getActivosSinAsignar().subscribe(res => {
          this.activos = res
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
        this.controlService.getBienesAsignadosIntengibles().subscribe(res => {
          this.activos = res
          this.tablaIntengibles = 'block'
        });
        this.disabledFiltro = true;
        this.banderaBuscador = 3;
      }
    } else {
      this.isAdmin = false;
      this.tablaMuebles = 'none';
      this.tablaIntengibles = 'none';
      this.tablaMueblesNoAsig = 'none';
      this.tablaEdificios = 'none'
      this.seguridadService.getActivosJefe(this.idEmpleado).subscribe(res => {
        this.activos = res
        this.tablaMuebles = 'block';
      });
      this.banderaBuscador = 5;
    }
    this.catalogosServices.getComboSucursal().subscribe(data => { this.sucursal = data });//filtro  
  }
  CambiarTipo() {
    switch (this.combo.controls["idTipo"].value) {
      case '1':
        this.tablaEdificios = 'none'
        this.tablaIntengibles = 'none'
        this.controlService.getBienesAsignados().subscribe(res => {
          this.activos = res
          this.tablaMuebles = 'block'
        });
        this.disabledFiltro = false;
        this.banderaBuscador = 1;
        break;
      case '2':
        this.tablaMuebles = 'none'
        this.tablaIntengibles = 'none'
        this.controlService.getBienesAsignadosEdificios().subscribe(res => {
          this.activos = res
          this.tablaEdificios = 'block'
        });
        this.disabledFiltro = true;
        this.banderaBuscador = 2;
        break;
      case '3':
        this.tablaEdificios = 'none'
        this.tablaMuebles = 'none'
        if(this.tipoUsuario=="1"){
          this.controlService.getBienesAsignadosIntengibles().subscribe(res => {
            this.activos = res
            this.tablaIntengibles = 'block'
          });
          this.disabledFiltro = true;
          this.banderaBuscador = 3;
        }else{
          this.controlService.getBienesAsignadosIntengibles().subscribe(res => {
            this.activos = res
            this.tablaIntengibles = 'block'
          });
          this.disabledFiltro = true;
          this.banderaBuscador = 3;
        }
      

       
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
      this.controlService.getActivosSinAsignar().subscribe(res => {
        this.activos = res
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
      this.controlService.getBienesAsignados().subscribe(res => {
        this.activos = res
        this.tablaMuebles = 'block';
        this.banderaBuscador = 1;
      });
      this.disabledFiltroBotonAsignacion = false;
      this.BanderaAsignados = true
    }

  }
  FiltrarArea() {
    var id = this.combo.controls['idSucursal'].value;
    this.controlService.comboAreaDeSucursal(id).subscribe(data => { this.areas = data });
  }

  Filtrar() {
    var id = this.combo.controls['idArea'].value;
    this.controlService.FiltroTablaActivos(id).subscribe(data => { this.activos = data });
  }

  Reload() {
    this.combo.controls['idSucursal'].setValue(0);
    this.combo.controls['idArea'].setValue(0);
    this.combo.controls['idTipo'].setValue(1);
    this.BtnAsinacion = "Ver no asignados";
    this.tablaMueblesNoAsig = 'none';
    this.tablaEdificios = 'none';
    this.tablaIntengibles = 'none';
    if (this.tipoUsuario == "1") {
      this.controlService.getBienesAsignados().subscribe(res => {
        this.activos = res
        this.tablaMuebles = 'block';
        this.banderaBuscador = 1;
      });
    } else {
      this.seguridadService.getActivosJefe(this.idEmpleado).subscribe(res => {
        this.activos = res
        this.tablaMuebles = 'block';
        this.banderaBuscador = 1;
      });
    }

    this.disabledFiltroBotonAsignacion = false;
    this.BanderaAsignados = true
    this.disabledFiltro = false;

  }

  activosAsignadosJefePDF() {
    this.http.get(environment.urlService+"api/Reporte/activosJefePdf/" + parseInt(this.idEmpleado),{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió reporte de activos.`).subscribe();
  }

  codigoDeBarrasPdf(id) {

    this.controlService.VerDatosActivosAsig(id).subscribe(data => {
      this.idactivo = data.idBien
    });
    this.http.get(environment.urlService + "api/ReportesSeguridad/codigoBarraActivoPdf/" + parseInt(this.idactivo), { responseType: 'arraybuffer' }).subscribe(pdf => {
      const blod = new Blob([pdf], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blod);
      window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Imprimió un código de barras .`).subscribe();
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

  close4() {
    this.display4 = 'none';
  }

  ver(id: any) {
    this.display = 'block';
    this.controlService.VerDatosActivosAsig(id).subscribe((data) => {
      //Validacion para cambiar si es proveedor o donantes
      if (data.isProvDon == 1) {
        this.tipocombo = "Proveedor:";
      } else {
        this.tipocombo = "Donante:";
      }
      //Mensaje cuando no hay imagen
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
      this.idactivo = data.idBien
      this.fecha = data.fecha;
      this.codigo = data.codigo;
      this.descripcion = data.descripcion;
      this.valor = data.valorAquisicion;
      this.marca = data.marca;
      this.modelo = data.modelo;
      this.color = data.color;
      this.estado = data.estadoingreso;
      this.clasificacion = data.clasificacion;
      this.responsable = data.responsable;
      this.ubicacion = data.ubicacion;
      this.tipoadqui = data.tipoadquicicion;
      this.provDon = data.provDon;
      this.prima = data.prima;
      this.cuota = data.cuota;
      this.plazo = data.plazo;
      this.interes = data.interes;
      this.valorresidual = data.valorresidual;
      this.vidautil = data.vidaUtil;
      this.foto = data.foto;
      this.Observaciones = data.observaciones;

    });
  }

  verNoAsignados(id: any) {
    this.display4 = 'block';
    this.controlService.VerDatosActivosNoAsig(id).subscribe((data) => {
      //Validacion para cambiar si es proveedor o donantes
      if (data.isProvDon == 1) {
        this.tipocombo = "Proveedor:";
      } else {
        this.tipocombo = "Donante:";
      }
      //Mensaje cuando no hay imagen
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
      this.fecha = data.fecha;
      this.descripcion = data.descripcion;
      this.valor = data.valorAquisicion;
      this.marca = data.marca;
      this.modelo = data.modelo;
      this.color = data.color;
      this.estado = data.estadoingreso;
      this.clasificacion = data.clasificacion;
      this.tipoadqui = data.tipoadquicicion;
      this.provDon = data.provDon;
      this.prima = data.prima;
      this.cuota = data.cuota;
      this.plazo = data.plazo;
      this.interes = data.interes;
      this.valorresidual = data.valorresidual;
      this.vidautil = data.vidaUtil;
      this.foto = data.foto;
      this.Observaciones = data.observaciones;
    });
  }

  verEdificios(id: any) {
    this.display2 = 'block';
    this.controlService.DatosGeneralesEdificios(id).subscribe((data) => {
      //Validacion para cambiar si es proveedor o donantes
      if (data.isProvDon == 1) {
        this.tipocombo = "Proveedor:";
      } else {
        this.tipocombo = "Donante:";
      }
      //Mensaje cuando no hay imagen
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
      this.fecha = data.fecha;
      this.descripcion = data.descripcion;
      this.codigo = data.codigo;
      this.valor = data.valorAquisicion;
      this.ubicacion = data.ubicacion;
      this.foto = data.foto;
      this.Observaciones = data.observaciones;
      this.vidautil = data.vidaUtil;
      this.cuota = data.cuota;
      this.prima = data.prima;
      this.provDon = data.provDon;
      this.interes = data.interes;
      this.plazo = data.plazo;
      this.estado = data.estadoingreso;
      this.clasificacion = data.clasificacion;
      this.tipoadqui = data.tipoadquicicion;
      this.valorresidual = data.valorresidual;
    });

  }

  verIntangibles(id: any) {
    this.display3 = 'block';
    this.controlService.DatosGeneralesIntangibles(id).subscribe((data) => {
      //Validacion para cambiar si es proveedor o donantes
      if (data.isProvDon == 1) {
        this.tipocombo = "Proveedor:";
      } else {
        this.tipocombo = "Donante:";
      }
      //Mensaje cuando no hay imagen
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
      this.fecha = data.fecha;
      this.descripcion = data.descripcion;
      this.codigo = data.codigo;
      this.valor = data.valorAquisicion;
      this.ubicacion = data.ubicacion;
      this.provDon = data.provDon;
      this.foto = data.foto;
      this.Observaciones = data.observaciones;
      this.vidautil = data.vidaUtil;
      this.cuota = data.cuota;
      this.prima = data.prima;
      this.interes = data.interes;
      this.plazo = data.plazo;
      this.clasificacion = data.clasificacion;
      this.tipoadqui = data.tipoadquicicion;
      this.valorresidual = data.valorresidual;
    });

  }

  MandarDatos(id) {
    this.Bien = this.bienObj;
    //creamos un nuevo objeto datas a partir de otro
    this.controlService.RecuperarFormCompleto(id).subscribe((res) => {
      let datas = {
        bienObj: res,  //en esto obtengo un solo objeto q es datas   
        // para acceder a los datos unicamente en el otro componente 
        // this.dataState.data.Bien // para poder acceder a los datos de esa variable         
      };
      this.stateService.changeValue(datas);
      this.router.navigate(["./form-nuevoBien"]);
    });

  }

  buscar(buscador) {
    this.p = 1;
    if (this.banderaBuscador == 1) {
      this.controlService.buscarActivoAsig(buscador.value).subscribe(res => { this.activos = res });
    } else if (this.banderaBuscador == 2) {
      this.controlService.buscarActivoEdificioAsig(buscador.value).subscribe(res => { this.activos = res });
    } else if (this.banderaBuscador == 3) {
      this.controlService.buscarActivoIntengibleAsig(buscador.value).subscribe(res => { this.activos = res });
    } else if (this.banderaBuscador == 4) {
      this.controlService.buscarActivoNoAsig(buscador.value).subscribe(res => { this.activos = res });
    }
    //buscadores en division de roles
    else if (this.banderaBuscador == 5) {
      this.seguridadService.buscarActivoAsigJefe(this.idEmpleado,buscador.value).subscribe(res => { this.activos = res });
    }
  }

  open() {
    //limpia cache
    this.nuevobien.controls["idbien"].setValue("0");
    this.nuevobien.controls["bandera"].setValue("0");
    this.nuevobien.controls["color"].setValue("");
    this.nuevobien.controls["descripcion"].setValue("");
    this.nuevobien.controls["modelo"].setValue("");
    this.nuevobien.controls["tipoadquicicion"].setValue("");
    this.nuevobien.controls["idmarca"].setValue("");
    this.nuevobien.controls["idclasificacion"].setValue("");
    this.nuevobien.controls["idproveedor"].setValue("");
    this.nuevobien.controls['idresponsable'].setValue("");
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
  open5() { //para modal de ayuda
    this.display5 = 'block';
  }
  close5() { //para modal de ayuda
    this.display5 = "none";
  }

}

