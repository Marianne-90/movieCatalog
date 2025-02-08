import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home Page',
    component: HomeComponent,
  },
  {
    path: 'home',
    title: 'Home Page',
    component: HomeComponent,
  },
  {
    path: 'movies',
    title: 'Movies',
    component: MoviesComponent,
  },
  {
    path: 'movies/:id',
    title: 'Movie Details',
    component: MovieComponent,
  },
];
