import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Device, DeviceDTO, Page } from '../device.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private http = inject(HttpClient);
  private apiUrl = 'api/core/device';

  findAll(page: number = 0, size: number = 10): Observable<Page<Device>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<Device>>(this.apiUrl, { params });
  }

  findById(id: string): Observable<Device> {
    return this.http.get<Device>(`${this.apiUrl}/${id}`);
  }

  save(dto: DeviceDTO): Observable<Device> {
    return this.http.post<Device>(this.apiUrl, dto);
  }

  update(id: string, dto: DeviceDTO): Observable<Device> {
    return this.http.put<Device>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}