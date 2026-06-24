import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DirectorService } from '../../services/director.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CT_Director } from '../../models/CT_Director.class';
import { DirectorForm } from '../../shared/director-form/director-form';
import { SkeletonModule } from 'primeng/skeleton';




@Component({
  selector: 'app-directors',
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
    DirectorForm,
    SkeletonModule
  ],
  templateUrl: './directors.html',
  styleUrl: './directors.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Directors {
  directorServ = inject(DirectorService);
  nationalitySelection: string[] = [];

  constructor() { }


  formVisible: boolean = false;
  directorToUpdate: CT_Director | null = null;
  directorUpdateClick(director: CT_Director | null) {
    this.directorToUpdate = director ? structuredClone(director) : new CT_Director().createNew();
    this.formVisible = true;
  }

  onCompleteForm() {
    this.formVisible = false;
    this.directorToUpdate = null;
  }
}
