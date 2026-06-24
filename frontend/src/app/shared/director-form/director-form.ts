import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, signal, ViewChild } from '@angular/core';
import { CT_Director } from '../../models/CT_Director.class';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { DirectorService } from '../../services/director.service';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-director-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    ToggleSwitchModule,
    ToastModule,
    RippleModule
  ],
  templateUrl: './director-form.html',
  styleUrl: './director-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DirectorForm {
  @Input() director: CT_Director | null = null;
  @Output() onComplete = new EventEmitter<boolean>(false);

  directorServ = inject(DirectorService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);


  //#region ------------ Save director -------------
  loadingSend = signal<boolean>(false);
  @ViewChild('formData') formData!: NgForm;
  save() {
    this.loadingSend.set(true);
    if (this.formData.invalid || !this.director) {
      Object.values(this.formData.controls).forEach(control => {
        control.markAllAsTouched();
      });
      this.loadingSend.set(false);
      return;
    }
    if (this.director && this.director.pkDirector) {
      this.directorServ.put(this.director).then(q => {
        this.loadingSend.set(false);
        if (q.status) {
          this.messageService.add({ severity: 'success', summary: 'Succes Update', detail: 'Director has been udpate successfully' });
          this.onComplete.emit();
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: q.message });
        }
      })
    } else if (this.director) {
      this.directorServ.post(this.director).then(q => {
        this.loadingSend.set(false);
        if (q.status) {
          this.messageService.add({ severity: 'success', summary: 'Succes Upload', detail: 'Director has been added successfully' });
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
      message: 'Do you want to delete this director?',
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
        if (!this.director) return;
        this.loadingDelete.set(true);
        this.directorServ.delete(this.director.pkDirector).then(q => {
          this.loadingDelete.set(false);
          if (q.status) {
            this.messageService.add({ severity: 'success', summary: 'Delete Success', detail: 'Director has been deleted successfully' });
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
