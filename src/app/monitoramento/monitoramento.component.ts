import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiRadarService } from '../service/api-radar.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';


@Component({
  selector: 'app-monitoramento',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './monitoramento.component.html',
  styleUrls: ['./monitoramento.component.css'],
})
export class MonitoramentoComponent implements OnInit {
  private initialLatitude: number | null = null;
  private initialLongitude: number | null = null;

  public iframeSrc: SafeResourceUrl;
  
  public deformacaoForm = {
    latitude: 0,
    longitude: 0,
    deslocamento: 0,
    risco: '',
  };

  constructor(private sanitizer: DomSanitizer, private service: ApiRadarService) {
    
    // Defina um local padrão para inicializar o mapa
    const defaultLocation = 'brazil+brasilia';
    const zoom = 10;
    
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://maps.google.co.uk/maps?f=q&source=s_q&hl=en&geocode=&q=${defaultLocation}&ie=UTF8&t=m&z=${zoom}&output=embed`
    );
  }

  ngOnInit(): void {}

  // Calcula o deslocamento entre dois pontos
  private calculateDisplacement(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Raio da Terra em km
    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(lat1)) *
        Math.cos(this.degreesToRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distância em km

    return distance * 100; // Converte para centímetros
  }

  private degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  onSubmit(): void {
    this.service.submitDeformacao(this.deformacaoForm).subscribe(
      (response) => {
        console.log('Deformação enviada com sucesso!', response);
      },
      (error) => {
        console.error('Erro ao enviar deformação', error);
      }
    );
  }
}
