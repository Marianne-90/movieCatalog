import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'http://localhost/tareas/catalogo/public/api/';
  constructor(private http: HttpClient) {}

  getMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}movies`);
  }

  getMovie(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}movies/${id}`);
  }

  //! esto está inmpleto la siguiente tarea lo completo
  createMovie(movie: any): Observable<any> {
    return this.http.post(`${this.apiUrl}movies`, movie);
  }
  //! esto está inmpleto la siguiente tarea lo completo
  updateMovie(id: number, movie: any): Observable<any> {
    return this.http.put(`${this.apiUrl}movies/${id}`, movie);
  }

  deleteMovie(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/movies/${id}`);
  }
}
