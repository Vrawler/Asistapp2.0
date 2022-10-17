import { Component, OnInit } from '@angular/core';

//1. Lo primero es importar una variable de google para usar la API
//Esto es javascript
declare var google;

@Component({
  selector: 'app-geo',
  templateUrl: './geo.page.html',
  styleUrls: ['./geo.page.scss'],
})
export class GeoPage implements OnInit {

  //2. Variables necesarias para el mapa
  mapa: any;

  constructor() { }

  ngOnInit() {
  }

  //3. Métodos para el mapa
  initMap(){
    //variable que trae el div del documento
    var map: HTMLElement = document.getElementById('map');

    //Traemos el mata y asignamos a la varible que trae el div
    this.mapa = new google.maps.Map(map,{
      center:{ lat: 0, lng: 0 },
      zoom: 18
    });

  }

}
