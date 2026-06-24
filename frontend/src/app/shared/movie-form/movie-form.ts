import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CT_movie, DTO_Movie } from '../../models/CT_Movie.class';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectModule } from 'primeng/select';
import { DirectorService } from '../../services/director.service';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-movie-form',
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    ToggleSwitchModule,
    ToastModule,
    RippleModule,
    SelectModule,
    DatePickerModule
  ],
  templateUrl: './movie-form.html',
  styleUrl: './movie-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieForm {
  @Input() movie: DTO_Movie | null = null;
  @Output() onComplete = new EventEmitter<boolean>(false);



  movieServ = inject(MovieService);
  directorServ = inject(DirectorService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

}
