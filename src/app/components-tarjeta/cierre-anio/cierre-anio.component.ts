import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cierre-anio',
  templateUrl: './cierre-anio.component.html',
  styleUrls: ['./cierre-anio.component.css']
})
export class CierreAnioComponent implements OnInit {
  displayCierre='none';
  aceptacion:boolean=false;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.displayCierre='block';
  }
  cierre(){
    this.displayCierre='block';
  }
  close(){
    this.displayCierre='none';
    this.router.navigate(["./"]);
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'El cierre no fue ejcutado.',
      showConfirmButton: false,
      timer: 3000
    })
    
  }
  Aceptar(aceptar){
    if(aceptar){
      this.aceptacion=true;
    }else{
      this.aceptacion=false;
    }
  }
}
