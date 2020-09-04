import { Component, OnInit, ViewChild} from '@angular/core';
import { BajaService } from './../../services/baja.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gestion-descargo',
  templateUrl: './gestion-descargo.component.html',
  styleUrls: ['./gestion-descargo.component.css']
})
export class GestionDescargoComponent implements OnInit {

  datosbien:FormGroup;
  activo: any;
  display = 'none';
  p: number = 1;

  constructor(private bajaService:BajaService) { }

  ngOnInit(): void {
    this.bajaService.listarBienes().subscribe(res => { this.activo = res });
  }

  close() {
    this.display = 'none';
  }

  buscar(buscador) {
    this.p = 1;
   this.bajaService.buscarBien(buscador.value).subscribe(res => { this.activo = res });
   }
}
