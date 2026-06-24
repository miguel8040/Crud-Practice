import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CT_movie } from '../../models/CT_Movie.class';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { MovieForm } from '../../shared/movie-form/movie-form';

@Component({
  selector: 'app-movies',
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    MultiSelectModule,
    ButtonModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    DialogModule,
    MovieForm,
    SkeletonModule
  ],
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Movies {
  movieServ = inject(MovieService);
  genderSelection: string[] = [];
  directorsSelection: string[] = [];

  constructor() { }


  formVisible: boolean = false;
  movieToUpdate: CT_movie | null = null;
  movieUpdateClick(movie: CT_movie | null) {
    this.movieToUpdate = movie ? structuredClone(movie) : new CT_movie().createNew();
    this.formVisible = true;
  }

  onCompleteForm() {
    this.formVisible = false;
    this.movieToUpdate = null;
  }
}
