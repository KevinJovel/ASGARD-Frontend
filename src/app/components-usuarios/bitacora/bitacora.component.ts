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
display5 = 'none';// para ayuda
  constructor(private usuarioService:UsuarioService) {  }

  ngOnInit(): void {
    this.usuarioService.ListarBitacora().subscribe(data=>{
      this.transacciones=data;
    });
  }

  open5() { //para modal de ayuda
    this.display5 = 'block';
  }
  close5() { //para modal de ayuda
    this.display5 = "none";
  }
}
