import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LocalStorageService,
  PrismService,
  SessionStorageService,
  SyncCountdownTimeService,
  SyncScoreService
} from './services';
import { PhpQuestionService } from './services/firestore/php-question.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    LocalStorageService,
    PhpQuestionService,
    PrismService,
    SessionStorageService,
    SyncCountdownTimeService,
    SyncScoreService
  ]
})
export class CoreModule {
}
