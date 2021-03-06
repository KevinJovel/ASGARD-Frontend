import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
//Importaciones personales
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner'
//Registrar o declarar el componente creado
import { SharedComponent } from './components/shared/shared.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';

//Importaciones para reportes
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake

// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);

//componnete catalogos
import { FormEmpleadoComponent } from './components-catalogos/form-empleado/form-empleado.component';
import { FormMarcaComponent } from './components-catalogos/form-marca/form-marca.component';
import { FormSucursalComponent } from './components-catalogos/form-sucursal/form-sucursal.component';
import { FormDonantesComponent } from './components-catalogos/form-donantes/form-donantes.component';
import { FormProveedorComponent } from './components-catalogos/form-proveedor/form-proveedor.component';
import { FormCargoComponent } from './components-catalogos/form-cargo/form-cargo.component';
import { FormClasificacionComponent } from './components-catalogos/form-clasificacion/form-clasificacion.component';
import { FormCategoriaComponent } from './components-catalogos/form-categoria/form-categoria.component';
import { FormAreasNegocioComponent } from './components-catalogos/form-areas-negocio/form-areas-negocio.component';
import { FormTecnicoComponent } from './components-catalogos/form-tecnico/form-tecnico.component';

//componente usuario
import { FormUsuarioComponent } from './components-usuarios/form-usuario/form-usuario.component';
import { FormTipoUsuarioComponent } from './components-usuarios/form-tipo-usuario/form-tipo-usuario.component';

//componentes control
import { FormNuevoBienComponent } from './components-control/form-nuevo-bien/form-nuevo-bien.component';
import { FormAsignancionComponent } from './components-control/form-asignancion/form-asignancion.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

//componentes mantenimiento
import { FormSolicitudMantenimientoComponent } from './components-mantenimiento/form-solicitud-mantenimiento/form-solicitud-mantenimiento.component';
import { TablaSolicitudComponent } from './components-mantenimiento/tabla-solicitud/tabla-solicitud.component';
import { FormInformeMantenimientoComponent } from './components-mantenimiento/form-informe-mantenimiento/form-informe-mantenimiento.component';
import { TablaInformeComponent } from './components-mantenimiento/tabla-informe/tabla-informe.component';

//componentes de traspaso de activos
import { FormSolicitudTraspasoComponent } from './components-traspaso/form-solicitud-traspaso/form-solicitud-traspaso.component';
import { HistorialSolicitudTraspasoComponent } from './components-traspaso/historial-solicitud-traspaso/historial-solicitud-traspaso.component';
import { TablaSolicitudTraspasoComponent } from './components-traspaso/tabla-solicitud-traspaso/tabla-solicitud-traspaso.component';

//componentes baja
import { CuadroSolicitudComponent } from './components-baja/cuadro-solicitud/cuadro-solicitud.component';
import { SolicitudComponent } from './components-baja/solicitud/solicitud.component';
import { GestionDescargoComponent } from './components-baja/gestion-descargo/gestion-descargo.component';

import { TablaTarjetaComponent } from './components-tarjeta/tabla-tarjeta/tabla-tarjeta.component';
import { TablaDepreciacionComponent } from './components-tarjeta/tabla-depreciacion/tabla-depreciacion.component';
import { HistorialMantenimientoComponent } from './components-mantenimiento/historial-mantenimiento/historial-mantenimiento.component';
import { ReportTarjetaComponent } from './components-tarjeta/report-tarjeta/report-tarjeta.component';
import { CuadroControlComponent } from './components-tarjeta/cuadro-control/cuadro-control.component';
import { CierreAnioComponent } from './components-tarjeta/cierre-anio/cierre-anio.component';
import { FormDesasignarComponent } from './components-control/form-desasignar/form-desasignar.component';
//servicios hay que procurar llevar el orden
import { CargarScriptsService } from './services/cargar-scripts.service';
import { CatalogosService } from './services/catalogos.service';
import { UsuarioService } from './services/usuario.service';
import { MantenimientoService } from './services/mantenimiento.service';
import { BajaService } from './services/baja.service';
import { ConfiguracionService } from './services/configuracion.service';
import { FormTipoDescargoComponent } from './components-catalogos/form-tipo-descargo/form-tipo-descargo.component';
import { FormCoopeComponent } from './components-configuracion/form-coope/form-coope.component';
import { SelectTipoActivoComponent } from './components-control/select-tipo-activo/select-tipo-activo.component';
import { FormEdificiosInstalacionesComponent } from './components-control/form-edificios-instalaciones/form-edificios-instalaciones.component';
import { FormActivoIntangibleComponent } from './components-control/form-activo-intangible/form-activo-intangible.component';
import { RegistroActivosComponent } from './components-control/registro-activos/registro-activos.component';
import { TablaRevalorizarComponent } from './components-control/tabla-revalorizar/tabla-revalorizar.component';
import { TipoDepreciacionComponent } from './components-tarjeta/tipo-depreciacion/tipo-depreciacion.component';
import { FormModificarAsignadosComponent } from './components-control/form-modificar-asignados/form-modificar-asignados.component';
import { TraspasoService } from './services/traspaso.service';
import { MenuReportesComponent } from './components-reportes/menu-reportes/menu-reportes.component';
import { ReportesCatalogosComponent } from './components-reportes/reportes-catalogos/reportes-catalogos.component';
import { ReportesControlActivoComponent } from './components-reportes/reportes-control-activo/reportes-control-activo.component';
import { ReportesMantenimientoComponent } from './components-reportes/reportes-mantenimiento/reportes-mantenimiento.component';
import { ReportesTraspasoComponent } from './components-reportes/reportes-traspaso/reportes-traspaso.component';
import { ReportesDescargoComponent } from './components-reportes/reportes-descargo/reportes-descargo.component';
import { LoginComponent } from './components-usuarios/login/login.component';

// Guardas
import { SeguridadGuard } from './guards/seguridad.guard';
import { JefeGuard } from './guards/jefe.guard';
import { PaginaErrorLoginComponent } from './components-usuarios/pagina-error-login/pagina-error-login.component';
import { ConfiguracionInicioComponent } from './components-usuarios/configuracion-inicio/configuracion-inicio.component';
import { BitacoraComponent } from './components-usuarios/bitacora/bitacora.component';
import { BackupComponent } from './components-usuarios/backup/backup.component';
import { ChartsModule } from 'ng2-charts';
import { ActivosPorAnioComponent } from './Components-graficas/activos-por-anio/activos-por-anio.component';
import { MenuGraficasComponent } from './Components-graficas/menu-graficas/menu-graficas.component';
import { MontoPorAnioComponent } from './Components-graficas/monto-por-anio/monto-por-anio.component';
import { GastosMttoAnioComponent } from './Components-graficas/gastos-mtto-anio/gastos-mtto-anio.component';
import { CargosDescargosAnioComponent } from './Components-graficas/cargos-descargos-anio/cargos-descargos-anio.component';
import { ProvisionAnioComponent } from './Components-graficas/provision-anio/provision-anio.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    SharedComponent,
    FooterComponent,
    HeaderComponent,
    FormEmpleadoComponent,
    FormMarcaComponent,
    FormSucursalComponent,
    FormDonantesComponent,
    FormClasificacionComponent,
    FormProveedorComponent,
    FormCargoComponent,
    FormAreasNegocioComponent,
    FormTecnicoComponent,
    FormUsuarioComponent,
    FormTipoUsuarioComponent,
    FormNuevoBienComponent,
    FormAsignancionComponent,
    FormSolicitudMantenimientoComponent,
    TablaSolicitudComponent,
    FormInformeMantenimientoComponent,
    TablaInformeComponent,
    CuadroSolicitudComponent,
    SolicitudComponent,
    GestionDescargoComponent,
    TablaTarjetaComponent,
    TablaDepreciacionComponent,
    HistorialMantenimientoComponent,
    ReportTarjetaComponent,
    CuadroControlComponent,
    FormCategoriaComponent,
    CierreAnioComponent,
    FormDesasignarComponent,
    FormTipoDescargoComponent,
    FormCoopeComponent,
    SelectTipoActivoComponent,
    FormEdificiosInstalacionesComponent,
    FormActivoIntangibleComponent,
    RegistroActivosComponent,
    TablaRevalorizarComponent,
    TipoDepreciacionComponent,
    FormModificarAsignadosComponent,
    FormSolicitudTraspasoComponent,
    HistorialSolicitudTraspasoComponent,
    TablaSolicitudTraspasoComponent,
    MenuReportesComponent,
    ReportesCatalogosComponent,
    ReportesControlActivoComponent,
    ReportesMantenimientoComponent,
    ReportesTraspasoComponent,
    ReportesDescargoComponent,
    LoginComponent,
    PaginaErrorLoginComponent,
    ConfiguracionInicioComponent,
    BitacoraComponent,
    BackupComponent,
    ActivosPorAnioComponent,
    MenuGraficasComponent,
    MontoPorAnioComponent,
    GastosMttoAnioComponent,
    CargosDescargosAnioComponent,
    ProvisionAnioComponent,



    //Aqui vamos a agregar los compoenentes del proyecto

  ],
  imports: [
    HttpModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    NgxPaginationModule, NgxSpinnerModule,
    NgxMaskModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'shared', component: SharedComponent },
      { path: 'form-empleado', component: FormEmpleadoComponent, canActivate: [SeguridadGuard] },
      { path: 'form-marca', component: FormMarcaComponent, canActivate: [SeguridadGuard] },
      { path: 'form-sucursal', component: FormSucursalComponent, canActivate: [SeguridadGuard] },
      { path: 'form-donantes', component: FormDonantesComponent, canActivate: [SeguridadGuard] },
      { path: 'form-proveedor', component: FormProveedorComponent, canActivate: [SeguridadGuard] },
      { path: 'form-clasificacion', component: FormClasificacionComponent, canActivate: [SeguridadGuard] },
      { path: 'form-categoria', component: FormCategoriaComponent, canActivate: [SeguridadGuard] },
      { path: 'form-cargo', component: FormCargoComponent, canActivate: [SeguridadGuard] },
      { path: 'form-area-negocio', component: FormAreasNegocioComponent, canActivate: [SeguridadGuard] },
      { path: 'form-tecnico', component: FormTecnicoComponent, canActivate: [SeguridadGuard] },
      { path: 'form-tipo-usuario', component: FormTipoUsuarioComponent, canActivate: [SeguridadGuard] },
      { path: 'form-usuario', component: FormUsuarioComponent, canActivate: [SeguridadGuard] },
      { path: 'form-nuevoBien/:id', component: FormNuevoBienComponent, canActivate: [SeguridadGuard] },
      { path: 'registro-activos/:param', component: RegistroActivosComponent },
      { path: 'form-asignacion', component: FormAsignancionComponent, canActivate: [SeguridadGuard] },
      { path: 'form-desasignacion', component: FormDesasignarComponent, canActivate: [SeguridadGuard] },
      { path: 'form-solicitud-mantenimiento', component: FormSolicitudMantenimientoComponent },
      { path: 'form-solicitud-traspaso', component: FormSolicitudTraspasoComponent },
      { path: 'historial-solicitud-traspaso', component: HistorialSolicitudTraspasoComponent },
      { path: 'tabla-solicitud-traspaso', component: TablaSolicitudTraspasoComponent, canActivate: [SeguridadGuard] },
      { path: 'form-informe-mantenimiento', component: FormInformeMantenimientoComponent, canActivate: [SeguridadGuard] },
      { path: 'historial-mantenimiento', component: HistorialMantenimientoComponent },
      { path: 'tabla-informe', component: TablaInformeComponent },
      { path: 'tabla-solicitud', component: TablaSolicitudComponent, canActivate: [SeguridadGuard] },
      { path: 'cuadro-solicitud/:param', component: CuadroSolicitudComponent },
      { path: 'solicitud', component: SolicitudComponent, canActivate: [SeguridadGuard] },
      { path: 'gestion-descargo/:param', component: GestionDescargoComponent },
      { path: 'tabla-tarjeta', component: TablaTarjetaComponent },
      { path: 'tabla-depreciacion', component: TablaDepreciacionComponent, canActivate: [SeguridadGuard] },
      { path: 'report-tarjeta/:id/:tipo', component: ReportTarjetaComponent },
      { path: 'cuadro-control', component: CuadroControlComponent },
      { path: 'tabla-revalorizar', component: TablaRevalorizarComponent, canActivate: [SeguridadGuard] },
      { path: 'cierre-anio', component: CierreAnioComponent, canActivate: [SeguridadGuard] },
      { path: 'form-tipo-descargo', component: FormTipoDescargoComponent },
      { path: 'form-conficooperativa', component: FormCoopeComponent, canActivate: [SeguridadGuard] },
      { path: 'select-tipo-activo', component: SelectTipoActivoComponent, canActivate: [SeguridadGuard] },
      { path: 'form-edificios-instalaciones/:id', component: FormEdificiosInstalacionesComponent, canActivate: [SeguridadGuard] },
      { path: 'form-activo-intangible/:id', component: FormActivoIntangibleComponent, canActivate: [SeguridadGuard] },
      { path: 'tipo-depreciacion', component: TipoDepreciacionComponent, canActivate: [SeguridadGuard] },
      { path: 'form-modificar-asignados/:id', component: FormModificarAsignadosComponent, canActivate: [SeguridadGuard] },
      { path: 'menu-reportes', component: MenuReportesComponent, canActivate: [SeguridadGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'app-bitacora', component: BitacoraComponent, canActivate: [SeguridadGuard]  },
      { path: 'app-backup', component: BackupComponent, canActivate: [SeguridadGuard] },
      { path: 'app-menu-graficas', component: MenuGraficasComponent, canActivate: [SeguridadGuard] },
      { path: 'graph-activos-anio', component: ActivosPorAnioComponent, canActivate: [SeguridadGuard] },
      { path: 'graph-monto-anio', component: MontoPorAnioComponent, canActivate: [SeguridadGuard] },
      { path: 'graph-gastos-monto-anio', component: GastosMttoAnioComponent, canActivate: [SeguridadGuard] },
      { path: 'graph-cargos-descargos-anio', component: CargosDescargosAnioComponent, canActivate: [SeguridadGuard] },
      { path: 'graph-provision', component: ProvisionAnioComponent, canActivate: [SeguridadGuard] },
      { path: 'pagina-error-login', component: PaginaErrorLoginComponent },
      { path: '', redirectTo: 'tabla-activos', pathMatch: 'full' }, // redirect to `first

    ]),
    NoopAnimationsModule
  ],
  providers: [CargarScriptsService, CatalogosService, UsuarioService, MantenimientoService, BajaService, ConfiguracionService, TraspasoService, SeguridadGuard, JefeGuard],

  bootstrap: [AppComponent, NavMenuComponent, HeaderComponent]
})
export class AppModule { }
