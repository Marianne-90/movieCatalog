import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; // Importa throwError
import { catchError, map } from 'rxjs/operators'; // Importa operadores

// Define una interfaz para tipar la respuesta de la API
export interface Movie {
  id: number;
  title: string;
  synopsis: string;
  year: number;
  cover: string;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'http://localhost/tareas/catalogo/public/api/';
  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    // Tipa el Observable con Movie[]
    return this.http.get<{ data: Movie[] }>(`${this.apiUrl}movies`).pipe(
      // Tipa la respuesta con { data: Movie[] }
      map((response) => response.data), // Extrae el array de películas del objeto 'data'
      catchError(this.handleError) // Maneja los errores
    );
  }

  getMovie(id: number): Observable<Movie> {
    // Tipa el Observable con Movie
    return this.http.get<{ data: Movie }>(`${this.apiUrl}movies/${id}`).pipe(
      // Tipa la respuesta con { data: Movie }
      map((response) => response.data), // Extrae la película del objeto 'data'
      catchError(this.handleError) // Maneja los errores
    );
  }

  createMovie(movie: Movie): Observable<Movie> {
    return this.http
      .post<Movie>(`${this.apiUrl}movies`, movie)
      .pipe(catchError(this.handleError));
  }

  updateMovie(id: number, movie: Movie): Observable<Movie> {
    return this.http
      .put<Movie>(`${this.apiUrl}movies/${id}`, movie)
      .pipe(catchError(this.handleError));
  }

  deleteMovie(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}movies/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Un error del lado del cliente o de la red ocurrió. Manejarlo apropiadamente.
      console.error('An error occurred:', error.error.message);
    } else {
      // El backend retornó un código de respuesta no exitoso.
      // El cuerpo de la respuesta puede contener pistas sobre lo que salió mal.
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    // Retornar un Observable con un mensaje de error amigable para el usuario.
    return throwError(
      () =>
        new Error('Algo salió mal. Por favor, inténtalo de nuevo más tarde.')
    );
  }
}
