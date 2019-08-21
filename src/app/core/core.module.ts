import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  CountdownTimeSyncService,
  LocalStorageService,
  PhpQuestionService,
  PrismService,
  ScoreSyncService,
  SessionStorageService
} from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    CountdownTimeSyncService,
    LocalStorageService,
    PhpQuestionService,
    PrismService,
    ScoreSyncService,
    SessionStorageService,
  ]
})
export class CoreModule {
}
