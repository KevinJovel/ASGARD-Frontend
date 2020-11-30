import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../services/usuario.service'
@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {
transacciones:any;
p:number=1;
  constructor(private usuarioService:UsuarioService) {  }

  ngOnInit(): void {
    this.usuarioService.ListarBitacora().subscribe(data=>{
      this.transacciones=data;
    });
  }

}
