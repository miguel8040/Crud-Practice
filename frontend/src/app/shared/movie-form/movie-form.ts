import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-movie-form',
  imports: [],
  templateUrl: './movie-form.html',
  styleUrl: './movie-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieForm {}
