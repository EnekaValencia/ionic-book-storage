import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', loadChildren: () => import('./home/home.module')
    .then(m => m.HomePageModule)
  },
  {
    path: 'details/:id', loadChildren: () => 
    import('src/app/details/details.module')
    .then(m => m.DetailsPageModule)
  },
  {
    path: 'create', loadChildren:() => 
    import('src/app/create/create.module')
    .then(m => m.CreatePageModule)
  },
  {
    path: 'edit/:id', loadChildren: () => 
    import('src/app/edit/edit.module')
    .then(m => m.EditPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
