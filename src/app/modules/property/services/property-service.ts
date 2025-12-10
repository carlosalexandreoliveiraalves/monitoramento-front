import { inject, Injectable } from '@angular/core';
import { Page, Property, PropertyDTO } from '../components/property.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private http = inject(HttpClient);
  private apiUrl = 'api/core/property'; // Ajuste conforme sua URL base

  findAll(page: number = 0, size: number = 10): Observable<Page<Property>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<Property>>(this.apiUrl, { params });
  }

  findById(id: string): Observable<Property> {
    return this.http.get<Property>(`${this.apiUrl}/${id}`);
  }

  save(dto: PropertyDTO): Observable<Property> {
    return this.http.post<Property>(this.apiUrl, dto);
  }

  update(id: string, dto: PropertyDTO): Observable<Property> {
    return this.http.put<Property>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string): Observable<string> {
    // O backend retorna String no delete conforme seu controller
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}