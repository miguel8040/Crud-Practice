import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LayoutHeader } from '../layout-header/layout-header';
import { LayoutFooter } from '../layout-footer/layout-footer';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterModule,
    LayoutHeader,
    LayoutFooter
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout { }
