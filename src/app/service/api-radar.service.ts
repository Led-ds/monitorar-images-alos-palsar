import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deformacao } from '../model/deformacao';

@Injectable({
  providedIn: 'root',
})
export class ApiRadarService {
  private apiUrl = 'http://localhost:8080/api/analise'; // Endereço da API

  constructor(private http: HttpClient) {}

  // Método para buscar deformações
  getDeformacoes(): Observable<Deformacao[]> {
    return this.http.get<Deformacao[]>(`${this.apiUrl}/deformacoes`);
  }

  // Método para enviar uma nova deformação
  sendDeformacao(deformacao: Deformacao): Observable<Deformacao> {
    return this.http.post<Deformacao>(`${this.apiUrl}/deformacao`, deformacao);
  }

  submitDeformacao(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/deformacao`, data);
  }
}
