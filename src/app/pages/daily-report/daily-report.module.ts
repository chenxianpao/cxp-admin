/**
 * Created by chenxianpao on 2018/8/27.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { PersonlReportComponent } from './personl-report/personl-report.component';
import { DailyReportComponent } from './daily-report.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    ThemeModule,
  ],
  declarations: [
    DailyReportComponent,
    PersonlReportComponent,
  ],
})

export class DailyReportModule { }
