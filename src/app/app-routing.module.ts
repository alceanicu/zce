import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './shared';
import { PreloadSelectedModuleStrategy } from './preload-selected-module-strategy';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'page-not-found', component: PageNotFoundComponent},
  {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule)},
  {path: 'random', loadChildren: () => import('./random/random.module').then(m => m.RandomModule)},
  {path: 'exam', loadChildren: () => import('./exam/exam.module').then(m => m.ExamModule)},
  {path: '**', redirectTo: '/page-not-found'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // implement a custom preloading strategy for just some of the modules (PRs welcome 😉)
      preloadingStrategy: PreloadSelectedModuleStrategy
    })
  ],
  exports: [
    RouterModule
  ],
  providers: [
    PreloadSelectedModuleStrategy
  ]
})
export class AppRoutingModule {
}
