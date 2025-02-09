import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movie, MovieService } from '../movie.service';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms'; // Importa Validators, FormGroup, FormControl
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-movie',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.css',
})
export class AddMovieComponent {
  @Output() movieCreated = new EventEmitter<Movie>();
  @Output() modalClosed = new EventEmitter<void>();

  movieForm!: FormGroup; // Define el formulario reactivo

  movieCreate: Movie = {
    id: 0,
    title: '',
    synopsis: '',
    year: 0,
    cover: '',
    created_at: '',
    updated_at: '',
  };
  cover: File | null = null;

  constructor(
    private movieService: MovieService,
    private toastr: ToastrService,
    public modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.movieForm = new FormGroup({
      // Crea el formulario y las validaciones
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      synopsis: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(300),
      ]),
      year: new FormControl(null, [Validators.min(1400)]), // Validators.required no es necesario si permites valores vacíos
      cover: new FormControl(null, [Validators.required]),
    });
  }
  addMovie() {
    if (!this.cover) {
      this.toastr.error('La imagen es obligatoria', 'Error');
      return; // Detiene la ejecución si no hay imagen
    }

    // Obtén los valores del formulario reactivo
    const movieData = this.movieForm.value;

    this.movieService.createMovie(movieData, this.cover).subscribe({
      // Usa movieData
      next: (response) => {
        this.movieCreated.emit(response);
        this.toastr.success('¡Película creada!', 'Éxito');
        this.movieForm.reset(); // Restablece el formulario reactivo
        this.cover = null;
        this.modalService.dismissAll();
      },
      error: (error) => {
        console.error('Error al crear la película:', error);
        this.toastr.error(
          error.error.errors ? error.error.errors : error.error,
          'Error'
        );
      },
    });
  }

  onFileChange(event: any) {
    this.cover = event.target.files[0];
  }

  closeModal() {
    this.modalService.dismissAll(); // Cierra el modal
    this.modalClosed.emit(); // Emite el evento de cierre
  }
}
