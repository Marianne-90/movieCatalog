import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { Movie } from '../movie.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
  imports: [FormsModule, CommonModule],
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

  toggleEditing() {
    this.isEditing = !this.isEditing;

    if (this.isEditing) {
      // Clona el objeto movie para no modificar el original mientras se edita
      this.movieEdit = { ...this.movie };
    } else {
      console.log('editando');
    }
  }

  onFileChange(event: any) {
    this.cover = event.target.files[0];
  }

  deleteMovie() {
    console.log('eliminando');
  }

  goBack() {
    this.router.navigate(['/movies']); // Navega a la ruta /movies
  }
}
