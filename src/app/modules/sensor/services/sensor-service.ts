import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Page, Sensor, SensorDTO } from '../sensor.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  private http = inject(HttpClient);
  private apiUrl = 'api/core/sensor';

  findAll(page: number = 0, size: number = 10): Observable<Page<Sensor>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    return this.http.get<Page<Sensor>>(this.apiUrl, { params });
  }

  findById(id: string): Observable<Sensor> {
    return this.http.get<Sensor>(`${this.apiUrl}/${id}`);
  }

  save(dto: SensorDTO): Observable<Sensor> {
    return this.http.post<Sensor>(this.apiUrl, dto);
  }

  update(id: string, dto: SensorDTO): Observable<Sensor> {
    return this.http.put<Sensor>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}