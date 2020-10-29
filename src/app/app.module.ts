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
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";
PdfMakeWrapper.setFonts(pdfFonts);
 
//Importaciones personales
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule } from 'ngx-mask'; 
import {NgxSpinnerModule} from 'ngx-spinner'
//Registrar o declarar el componente creado
import { SharedComponent } from './components/shared/shared.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
//componnete catalogos
import { TablaActivosComponent } from './components-control/tabla-activos/tabla-activos.component';
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
import { FormTipoTrasladoComponent } from './components-catalogos/form-tipo-traslado/form-tipo-traslado.component';
import { FormTipoDescargoComponent } from './components-catalogos/form-tipo-descargo/form-tipo-descargo.component';
import { SolicitudActivosAsignadosComponent } from './components-baja/solicitud-activos-asignados/solicitud-activos-asignados.component';
import { FormCoopeComponent } from './components-configuracion/form-coope/form-coope.component';
import { SelectTipoActivoComponent } from './components-control/select-tipo-activo/select-tipo-activo.component';
import { FormEdificiosInstalacionesComponent } from './components-control/form-edificios-instalaciones/form-edificios-instalaciones.component';
import { FormActivoIntangibleComponent } from './components-control/form-activo-intangible/form-activo-intangible.component';
import { RegistroActivosComponent } from './components-control/registro-activos/registro-activos.component';
import { TablaRevalorizarComponent } from './components-control/tabla-revalorizar/tabla-revalorizar.component';
import { TipoDepreciacionComponent } from './components-tarjeta/tipo-depreciacion/tipo-depreciacion.component';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    SharedComponent,
    FooterComponent,
    HeaderComponent,
    TablaActivosComponent,
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
    FormTipoTrasladoComponent,
    FormTipoDescargoComponent,
    SolicitudActivosAsignadosComponent,
    FormCoopeComponent,
    SelectTipoActivoComponent,
    FormEdificiosInstalacionesComponent,
    FormActivoIntangibleComponent,
    RegistroActivosComponent,
    TablaRevalorizarComponent,
    TipoDepreciacionComponent,

   
    //Aqui vamos a agregar los compoenentes del proyecto

  ],
    imports: [
    HttpModule,
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
    FormsModule,
        ReactiveFormsModule,
      NgxPaginationModule,NgxSpinnerModule,
      NgxMaskModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'shared', component: SharedComponent },
      { path: 'tabla-activos', component: TablaActivosComponent },
      { path: 'form-empleado', component: FormEmpleadoComponent },
      { path: 'form-marca', component: FormMarcaComponent },
      { path: 'form-sucursal', component: FormSucursalComponent },
      { path: 'form-donantes', component: FormDonantesComponent },
      { path: 'form-proveedor', component: FormProveedorComponent },
      { path: 'form-clasificacion', component: FormClasificacionComponent },
      { path: 'form-categoria', component: FormCategoriaComponent },
      { path: 'form-cargo', component: FormCargoComponent },
      {path: 'form-area-negocio', component: FormAreasNegocioComponent},
      {path: 'form-tecnico', component: FormTecnicoComponent},
      {path: 'form-tipo-usuario', component: FormTipoUsuarioComponent},
      {path: 'form-usuario', component: FormUsuarioComponent},
      {path: 'form-nuevoBien/:id', component: FormNuevoBienComponent},
      {path: 'registro-activos/:param', component: RegistroActivosComponent},
      {path: 'form-asignacion', component: FormAsignancionComponent},
      {path: 'form-desasignacion', component: FormDesasignarComponent},
      {path: 'form-solicitud-mantenimiento', component: FormSolicitudMantenimientoComponent},
      {path: 'form-informe-mantenimiento', component: FormInformeMantenimientoComponent},
      {path: 'historial-mantenimiento', component: HistorialMantenimientoComponent},
      {path: 'tabla-informe', component: TablaInformeComponent},
      {path: 'tabla-solicitud', component: TablaSolicitudComponent},
      {path: 'cuadro-solicitud', component: CuadroSolicitudComponent},
      {path: 'solicitud', component: SolicitudComponent},
      {path: 'gestion-descargo', component: GestionDescargoComponent},
      {path: 'tabla-tarjeta', component: TablaTarjetaComponent},
      {path: 'tabla-depreciacion', component: TablaDepreciacionComponent},
      {path: 'report-tarjeta/:id/:tipo', component: ReportTarjetaComponent},
      {path: 'cuadro-control', component: CuadroControlComponent},
      {path: 'tabla-revalorizar', component: TablaRevalorizarComponent},
      {path: 'cierre-anio', component: CierreAnioComponent},
      {path: 'form-tipo-traslado', component: FormTipoTrasladoComponent},
      {path: 'form-tipo-descargo', component: FormTipoDescargoComponent},
      {path: 'solicitud-activos-asignados', component: SolicitudActivosAsignadosComponent},
      {path: 'form-conficooperativa', component: FormCoopeComponent},
      {path: 'select-tipo-activo', component: SelectTipoActivoComponent},
      {path: 'form-edificios-instalaciones/:id', component: FormEdificiosInstalacionesComponent},
      {path: 'form-activo-intangible/:id', component: FormActivoIntangibleComponent},
      {path: 'tipo-depreciacion', component: TipoDepreciacionComponent},
      { path: '',   redirectTo: 'tabla-activos', pathMatch: 'full' }, // redirect to `first
      
    ]),
    NoopAnimationsModule
    ],
    providers: [CargarScriptsService, CatalogosService, UsuarioService, MantenimientoService, BajaService, ConfiguracionService],

    bootstrap: [AppComponent, NavMenuComponent, HeaderComponent]
})
export class AppModule { }
