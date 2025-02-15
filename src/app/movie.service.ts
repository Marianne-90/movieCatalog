import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
  private apiUrl = 'https://catalogo-mtml.onrender.com/api/';
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

  createMovie(movie: Movie, cover: File | null): Observable<Movie> {
    const formData = new FormData();
    formData.append('title', movie.title);
    formData.append('synopsis', movie.synopsis);
    formData.append('year', movie.year.toString());
    if (cover) {
      formData.append('cover', cover, cover.name);
    }

    return this.http
      .post<{ data: Movie }>(`${this.apiUrl}movies`, formData) // Tipa la respuesta como { data: Movie }
      .pipe(
        map((response) => response.data), // Extrae la película del objeto data
        catchError(this.handleError)
      );
  }

  updateMovie(id: number, movie: Movie, cover: File | null): Observable<Movie> {
    const formData = new FormData();
    formData.append('title', movie.title);
    formData.append('synopsis', movie.synopsis);
    formData.append('year', movie.year.toString());
    if (cover) {
      formData.append('cover', cover, cover.name);
    }
    formData.append('_method', 'PUT'); // Simula PUT con POST

    return this.http
      .post<{ data: Movie }>(`${this.apiUrl}movies/${id}`, formData) // Tipa la respuesta como { data: Movie }
      .pipe(
        map((response) => response.data), // Extrae la película del objeto data
        catchError(this.handleError)
      );
  }

  deleteMovie(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}movies/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Un error del lado del cliente o de la red ocurrió.
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );

      console.log(error.error);

      return throwError(() => new Error(`${error.error}`));
    }

    return throwError(
      () =>
        new Error('Algo salió mal. Por favor, inténtalo de nuevo más tarde.')
    );
  }
}
