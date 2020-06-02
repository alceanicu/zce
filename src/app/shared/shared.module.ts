import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

import { ConfirmComponent } from '@app/shared/confirm/confirm.component';
import { QuestionDisplayComponent } from '@app/shared/question-display/question-display.component';

const material = [
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
];

@NgModule({
  declarations: [
    ConfirmComponent,
    QuestionDisplayComponent,
  ],
  entryComponents: [
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    //
    RoundProgressModule,
    NgxUiLoaderModule.forRoot({
      bgsColor: '#00ACC1',
      bgsOpacity: 0.5,
      bgsPosition: 'center-center',
      bgsSize: 60,
      bgsType: 'rectangle-bounce-pulse-out',
      blur: 5,
      fgsColor: '#bc75ea',
      fgsPosition: 'center-center',
      fgsSize: 100,
      fgsType: 'cube-grid',
      gap: 24,
      logoPosition: 'center-center',
      logoSize: 120,
      logoUrl: '',
      masterLoaderId: 'master',
      overlayBorderRadius: '0',
      overlayColor: 'rgba(40, 40, 40, 0.8)',
      pbColor: '#00ACC1',
      pbDirection: 'ltr',
      pbThickness: 3,
      hasProgressBar: true,
      text: 'loading ...',
      textColor: '#FFFFFF',
      textPosition: 'center-center'
    }),
    //
    FlexLayoutModule,
    //
    ...material,
    RouterModule,
  ],
  exports: [
    RoundProgressModule,
    NgxUiLoaderModule,
    //
    FlexLayoutModule,
    //
    ...material,
    //
    QuestionDisplayComponent
  ]
})
export class SharedModule {
}
