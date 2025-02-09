import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService, Movie } from '../movie.service';
import { CommonModule } from '@angular/common';
import { EditMovieComponent } from '../edit-movie/edit-movie.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
  imports: [CommonModule, EditMovieComponent],
})
export class MovieComponent implements OnInit {
  movie: Movie | undefined;
  movieEdit: any = {};
  isEditing: boolean = false;
  cover: File | null = null;

  constructor(
    private route: ActivatedRoute, // Inyecta ActivatedRoute
    private movieService: MovieService,
    private router: Router // Inyecta Router
  ) {}

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie() {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Obtiene el id de la URL y lo convierte a número

    this.movieService.getMovie(id).subscribe({
      next: (movie) => {
        this.movie = movie;
        console.log('Película:', this.movie);
      },
      error: (error) => {
        console.error('Error al obtener la película:', error);
      },
    });
  }

  getCoverUrl(cover: string): string {
    return `http://localhost:80/tareas/catalogo/public/img/${cover}`;
  }

  goBack() {
    this.router.navigate(['/movies']); // Navega a la ruta /movies
  }

  onMovieUpdated(updatedMovie: Movie) {
    this.movie = updatedMovie;
  }
}
