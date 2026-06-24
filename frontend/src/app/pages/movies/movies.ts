import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CT_movie, DTO_Movie } from '../../models/CT_Movie.class';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SkeletonModule } from 'primeng/skeleton';
import { Table, TableModule } from 'primeng/table';
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

  @ViewChild('dt1') dt1?: Table;
  clearFilters() {
    if (!this.dt1) return;
    this.dt1.clear();
    this.directorsSelection = [];
    this.genderSelection = [];
  }

  constructor() { }


  formVisible: boolean = false;
  movieToUpdate: DTO_Movie | null = null;
  movieUpdateClick(movie: DTO_Movie | null) {
    this.movieToUpdate = movie ? structuredClone(movie) : new DTO_Movie().createNew();
    this.formVisible = true;
  }

  onCompleteForm() {
    this.formVisible = false;
    this.movieToUpdate = null;
  }
}
