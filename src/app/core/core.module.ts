import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LocalStorageService,
  PhpQuestionService,
  PrismService,
  SessionStorageService,
  SyncCountdownTimeService,
  SyncScoreService
} from './services';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    LocalStorageService,
    PhpQuestionService,
    PrismService,
    SyncCountdownTimeService,
    SyncScoreService,
    SessionStorageService
  ]
})
export class CoreModule {
}
