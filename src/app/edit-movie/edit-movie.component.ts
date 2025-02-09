import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movie, MovieService } from '../movie.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-movie',
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.css',
})
export class EditMovieComponent {
  @Input() movie: Movie | undefined;

  @Output() movieUpdated = new EventEmitter<Movie>(); // Emite un evento al actualizar la película
  @Output() movieDeleted = new EventEmitter<void>(); // Emite un evento al eliminar la película

  movieEdit: any = {};
  isEditing: boolean = false;
  cover: File | null = null;

  constructor(
    private movieService: MovieService,
    private modalService: NgbModal,
    private toastr: ToastrService // Inyecta ToastrService
  ) {}

  toggleEditing() {
    this.isEditing = !this.isEditing;
    if (this.isEditing && this.movie?.id) {
      this.movieEdit = { ...this.movie };
    } else if (!this.isEditing && this.movie?.id) {
      console.log('película para actualizar', this.movieEdit, this.movie);

      // Guardar los cambios
      const updatedMovie = { ...this.movie, ...this.movieEdit }; // Fuciona los cambios con la película original
      if (this.cover) {
        this.movieService
          .updateMovie(this.movie.id, updatedMovie, this.cover)
          .subscribe({
            next: (response) => {
              this.movieUpdated.emit(response); // Emite la película actualizada
              this.toastr.success('¡Película actualizada!', 'Éxito'); // Mensaje de éxito
              console.log('Película actualizada:', response);
            },
            error: (error) => {
              console.error('Error al actualizar la película:', error);
              this.toastr.error(error.error, 'Error');
            },
          });
      } else {
        this.movieService
          .updateMovie(this.movie.id, updatedMovie, null)
          .subscribe({
            next: (response) => {
              this.movieUpdated.emit(response); // Emite la película actualizada
              this.toastr.success('¡Película actualizada!', 'Éxito'); // Mensaje de éxito
              console.log('Película actualizada:', response);
            },
            error: (error) => {
              this.toastr.error(error, 'Error');
              console.error('Error al actualizar la película:', error);
            },
          });
      }
    }
  }

  onFileChange(event: any) {
    this.cover = event.target.files[0];
  }

  deleteMovie() {
    if (this.movie?.id) {
      this.movieService.deleteMovie(this.movie.id).subscribe({
        next: () => {
          console.log('Película eliminada');
          this.toastr.success('¡Película eliminada!', 'Éxito');
          this.movieDeleted.emit(); // Emitir el evento al eliminar
        },
        error: (error) => {
          console.error('Error al eliminar la película:', error);
          console.error('Error al eliminar la película:', error);
        },
      });
    }
  }

  openConfirmationModal(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          if (result === 'confirm') {
            // Si el usuario confirma
            this.deleteMovie(); // Llama a la función de eliminación
          }
        },
        (reason) => {
          // Si el usuario cierra el modal sin confirmar, no se hace nada
        }
      );
  }

  cancelEditing() {
    this.isEditing = false;
  }
}
