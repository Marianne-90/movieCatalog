import { Component } from '@angular/core';
import { MovieComponent } from '../movie/movie.component';

@Component({
  selector: 'app-movies',
  imports: [MovieComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {
  movies: any[] = [];
}
