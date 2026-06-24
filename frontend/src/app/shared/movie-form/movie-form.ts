import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, signal, ViewChild } from '@angular/core';
import { CT_movie, DTO_Movie } from '../../models/CT_Movie.class';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
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

  //#region ------------ Save -------------
  loadingSend = signal<boolean>(false);
  @ViewChild('formData') formData!: NgForm;
  save() {
    this.loadingSend.set(true);
    if (this.formData.invalid || !this.movie) {
      Object.values(this.formData.controls).forEach(control => {
        control.markAllAsTouched();
      });
      this.loadingSend.set(false);
      return;
    }
    if (this.movie && this.movie.pkMovie) {
      this.movieServ.put(this.movie).then(q => {
        this.loadingSend.set(false);
        if (q.status) {
          this.messageService.add({ severity: 'success', summary: 'Succes Update', detail: 'Movie has been udpate successfully' });
          this.onComplete.emit();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: q.message });
        }
      })
    } else if (this.movie) {
      this.movieServ.post(this.movie).then(q => {
        this.loadingSend.set(false);
        if (q.status) {
          this.messageService.add({ severity: 'success', summary: 'Succes Upload', detail: 'Movie has been added successfully' });
          this.onComplete.emit();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: q.message });
        }
      })
    }
  }


  //#region -------- Delete Building ----------
  loadingDelete = signal<boolean>(false);
  delete(event: Event) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: 'Do you want to delete this Movie?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger'
      },
      accept: () => {
        if (!this.movie) return;
        this.loadingDelete.set(true);
        this.movieServ.delete(this.movie.pkMovie).then(q => {
          this.loadingDelete.set(false);
          if (q.status) {
            this.messageService.add({ severity: 'success', summary: 'Delete Success', detail: 'Movie has been deleted successfully' });
            this.onComplete.emit();
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: q.message });
          }
        })
      },
    });
  }
  //#endregion
}
