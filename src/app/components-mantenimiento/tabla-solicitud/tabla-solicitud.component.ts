import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-solicitud',
  templateUrl: './tabla-solicitud.component.html',
  styleUrls: ['./tabla-solicitud.component.css']
})
export class TablaSolicitudComponent implements OnInit {
  solicitudes: any;
  p: number = 1;
  clasificacion: FormGroup;
  display = 'none';
  titulo: string;
  constructor() { }
  
  ngOnInit(): void {
  }
  crearinforme(){

  }
  open(){}
  buscar(nombre){}
}
