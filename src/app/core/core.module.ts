import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  DataShareService,
  LocalStorageService,
  PhpQuestionService,
  PrismService,
  SessionStorageService
} from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    DataShareService,
    LocalStorageService,
    PhpQuestionService,
    PrismService,
    SessionStorageService,
  ]
})
export class CoreModule {
}
