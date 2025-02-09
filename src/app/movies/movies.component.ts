import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../movie.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AddMovieComponent } from '../add-movie/add-movie.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, RouterLink, AddMovieComponent], // Agrega CommonModule
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = []; // Usa la interfaz Movie[]
  closeResult = '';

  constructor(
    private movieService: MovieService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
      },
      error: (error) => {
        console.error('Error al obtener las películas:', error);
      },
    });
  }

  getCoverUrl(cover: string): string {
    return `http://localhost:80/tareas/catalogo/public/img/${cover}`;
  }

  openModal(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === '0') {
      return 'by pressing ESC';
    } else if (reason === '1') {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onMovieCreated(movie: Movie) {
    this.movies.push(movie); // Agrega la nueva película a la lista
  }

  onModalClosed() {
    // Puedes realizar acciones adicionales aquí si es necesario
  }
}
