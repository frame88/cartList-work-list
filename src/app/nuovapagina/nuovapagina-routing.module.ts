import { DetailPageModule } from './../detail/detail.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuovapaginaPage } from './nuovapagina.page';

const routes: Routes = [
  {
    path: '',
    component: NuovapaginaPage
  },
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuovapaginaPageRoutingModule {}
