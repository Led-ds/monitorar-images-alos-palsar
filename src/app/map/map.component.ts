import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit, AfterViewInit {

  // Evento que emite as coordenadas para o componente pai
  @Output() coordinatesSelected = new EventEmitter<{ latitude: number, longitude: number }>();

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    const map = L.map('map').setView([51.505, -0.09], 13);  // Defina coordenadas iniciais

     //Adicionando a camada de tiles (OpenStreetMap)
     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Evento de clique no mapa
    map.on('click', (event) => {
      const latitude = event.latlng.lat;
      const longitude = event.latlng.lng;

      // Emitir as coordenadas para o componente pai
      this.coordinatesSelected.emit({ latitude, longitude });
    });
  }
}

