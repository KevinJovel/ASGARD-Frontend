import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    
})
export class HeaderComponent implements OnInit {
  isExpanded = false;
  nombreusuario:string;
    constructor() {
       
    }

  ngOnInit() {
    this.nombreusuario=sessionStorage.getItem("nombre");
  }
  collapse() {
    this.isExpanded = false;
  }
  logout(){
    sessionStorage.removeItem("idUser");
    sessionStorage.removeItem("nombre");
    sessionStorage.removeItem("empleado");
    sessionStorage.removeItem("tipo");
    window.location.href = "/";
  }

}
