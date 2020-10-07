import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-select-tipo-activo',
  templateUrl: './select-tipo-activo.component.html',
  styleUrls: ['./select-tipo-activo.component.css']
})
export class SelectTipoActivoComponent implements OnInit {

  display = 'none';
  tipoActivo: FormGroup;

  constructor(private router: Router) {
    this.tipoActivo=new FormGroup({

    })
   }

  ngOnInit(){
    this.display='block';
  }

  close() {
    this.display = 'none';
    this.router.navigate(["./"]);
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'No seleccionó ningún formulario',
      showConfirmButton: false,
      timer: 3000
    })

  }

  formEdificiosInsta() {
    this.router.navigate(["./form-edificios-instalaciones"]);
  }
  formTangible() {
    this.router.navigate(["./form-nuevoBien"]);
  }
  formIntangible() {
    this.router.navigate(["./form-activo-intangible"]);
  }
}
