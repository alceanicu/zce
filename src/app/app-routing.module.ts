import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PreloadSelectedModuleStrategy } from '@app/preload-selected-module-strategy';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
  { path: 'prepare', loadChildren: () => import('./prepare/prepare.module').then(m => m.PrepareModule) },
  { path: 'exam', loadChildren: () => import('./exam/exam.module').then(m => m.ExamModule) },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // useHash supports github.io demo page, remove in your app
      useHash: false,
      scrollPositionRestoration: 'enabled',
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
