import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla-tarjeta',
  templateUrl: './tabla-tarjeta.component.html',
  styleUrls: ['./tabla-tarjeta.component.css']
})
export class TablaTarjetaComponent implements OnInit {

  display = 'none';

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.display = 'none';
  }

}
