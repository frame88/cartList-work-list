import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/login/auth.guard';

const routes: Routes = [

  // {
  //   path:'',
  //   redirectTo: 'chat/',
  //   pathMatch: 'full',
  // },
  {
    path: 'nuovapagina',
    loadChildren: () => import('./nuovapagina/nuovapagina.module').then( m => m.NuovapaginaPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./core/login/login/login.module').then(m => m.LoginPageModule),

  },
  /*
  {
    path: '**',
    redirectTo:'login',
    // pathMatch: 'full',
  },*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
