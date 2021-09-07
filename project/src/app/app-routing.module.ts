import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch:'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./featured/pages/home/home.module')
      .then(m => m.HomeModule)
  },
  {
    path: 'attempts',
    loadChildren: () => import('./featured/pages/attempt/attempt.module')
      .then(m => m.AttemptModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
