import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [
            {
                path: '',
                redirectTo: 'movies',
                pathMatch: 'full'
            },
            {
                path: 'movies',
                loadComponent: () => import('./pages/movies/movies')
            },
            {
                path: 'directors',
                loadComponent: () => import('./pages/directors/directors')
            },
        ]
    }
];
