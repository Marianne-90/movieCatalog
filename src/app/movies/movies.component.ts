import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../movie.service'; // Importa la interfaz Movie
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, RouterLink], // Agrega CommonModule
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = []; // Usa la interfaz Movie[]

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
        console.log('Películas:', this.movies);
      },
      error: (error) => {
        console.error('Error al obtener las películas:', error);
      },
    });
  }

  getCoverUrl(cover: string): string {
    return `http://localhost:80/tareas/catalogo/public/img/${cover}`;
  }
}
