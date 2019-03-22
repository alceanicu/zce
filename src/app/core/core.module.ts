import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PhpQuestionService,
  LocalStorageService,
  PrismService,
  SessionStorageService,
} from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    PhpQuestionService,
    LocalStorageService,
    PrismService,
    SessionStorageService,
  ]
})
export class CoreModule { }
