import { DetailPageModule } from './../detail/detail.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuovapaginaPage } from './nuovapagina.page';

const routes: Routes = [
  {
    path: '',
    component: NuovapaginaPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuovapaginaPageRoutingModule {}
