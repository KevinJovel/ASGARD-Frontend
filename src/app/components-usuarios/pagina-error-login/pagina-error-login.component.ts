import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../services/usuario.service'
@Component({
  selector: 'app-pagina-error-login',
  templateUrl: './pagina-error-login.component.html',
  styleUrls: ['./pagina-error-login.component.css']
})
export class PaginaErrorLoginComponent implements OnInit {

  constructor(private usuarioService:UsuarioService) { }

  ngOnInit(): void {
  
  
  }

}
