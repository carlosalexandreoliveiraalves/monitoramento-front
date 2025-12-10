import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { ApiResponse, SensorRecord } from '../sensor.model';

@Injectable({
  providedIn: 'root',
})
export class MonitorService {

  private readonly API_URL = environment.ApiUrlMonitor;

  private http = inject(HttpClient);
  private unwrapList() {
    return map((response: ApiResponse<SensorRecord[]>) => response.data);
  }

  // Helper 2: Para item único (getLatest) - Pega o PRIMEIRO item do array
  private unwrapSingle() {
    return map((response: ApiResponse<SensorRecord[]>) => {
      // Verifica se existe data, se é array e se tem itens
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        return response.data[0];
      }
      // Se vier vazio, retorna null ou um objeto zerado para não quebrar a tela
      return { value: 0 } as SensorRecord;
    });
  }

  // --- PH ---
  getAllPh(): Observable<SensorRecord[]> {
    return this.http.get<ApiResponse<SensorRecord[]>>(`${this.API_URL}/ph`)
      .pipe(this.unwrapList());
  }

  getLatestPh(): Observable<SensorRecord> {
    // Note que tipamos o get como SensorRecord[] porque o JSON traz um array
    return this.http.get<ApiResponse<SensorRecord[]>>(`${this.API_URL}/ph/latest`)
      .pipe(this.unwrapSingle()); // <--- MUDANÇA AQUI
  }

  // --- TEMPERATURA ---
  getAllTemperature(): Observable<SensorRecord[]> {
    return this.http.get<ApiResponse<SensorRecord[]>>(`${this.API_URL}/temperature`)
      .pipe(this.unwrapList());
  }

  getLatestTemperature(): Observable<SensorRecord> {
    return this.http.get<ApiResponse<SensorRecord[]>>(`${this.API_URL}/temperature/latest`)
      .pipe(this.unwrapSingle()); // <--- MUDANÇA AQUI
  }

  // --- TURBIDEZ ---
  getAllTurbidity(): Observable<SensorRecord[]> {
    return this.http.get<ApiResponse<SensorRecord[]>>(`${this.API_URL}/turbidity`)
      .pipe(this.unwrapList());
  }

  getLatestTurbidity(): Observable<SensorRecord> {
    return this.http.get<ApiResponse<SensorRecord[]>>(`${this.API_URL}/turbidity/latest`)
      .pipe(this.unwrapSingle()); // <--- MUDANÇA AQUI
  }
}
