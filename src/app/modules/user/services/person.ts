import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page, Person } from '../user.model';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private http = inject(HttpClient);

  // Caminho via Nginx (/api/core/) + Caminho do Controller (/api/person)
  private readonly API_URL = '/api/core/api/person';

  findAll(page: number = 0, size: number = 10): Observable<Page<Person>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<Person>>(this.API_URL, { params });
  }

  findById(id: string): Observable<Person> {
    return this.http.get<Person>(`${this.API_URL}/${id}`);
  }

  create(person: Person): Observable<Person> {
    return this.http.post<Person>(this.API_URL, person);
  }

  update(id: string, person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.API_URL}/${id}`, person);
  }

  delete(id: string): Observable<string> {
    // O backend retorna String no delete, então responseType text é necessário
    return this.http.delete(`${this.API_URL}/${id}`, { responseType: 'text' });
  }
}
