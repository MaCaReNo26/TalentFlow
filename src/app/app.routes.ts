
import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'registro',
    pathMatch: 'full'
  },

  {
    path: 'registro',
    loadComponent: () =>
      import('./pages/registro/registro.page')
        .then(m => m.RegistroPage)
  },

  {
    path: 'candidatos',
    loadComponent: () =>
      import('./pages/candidatos/candidatos.page')
        .then(m => m.CandidatosPage)
  },

  {
    path: '**',
    redirectTo: 'registro'
  }

];
