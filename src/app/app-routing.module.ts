import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule)},
  {path: 'random', loadChildren: () => import('./random/random.module').then(m => m.RandomModule)},
  {path: 'exam', loadChildren: () => import('./exam/exam.module').then(m => m.ExamModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preload all modules; optionally we could
      // implement a custom preloading strategy for just some
      // of the modules (PRs welcome 😉)
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
