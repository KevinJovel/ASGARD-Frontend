import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../../services/usuario.service'
@Component({
  selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    
})
export class HeaderComponent implements OnInit {
  isExpanded = false;
  nombreusuario:string;
    constructor(private usuarioService:UsuarioService) {
       
    }

  ngOnInit() {
    this.nombreusuario=sessionStorage.getItem("nombre");
  }
  collapse() {
    this.isExpanded = false;
  }
  logout(){
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),"Cerró sesión en el sistema.").subscribe();
    sessionStorage.removeItem("idUser");
    sessionStorage.removeItem("nombre");
    sessionStorage.removeItem("empleado");
    sessionStorage.removeItem("tipo");
    window.location.href = "/";
  }

}
