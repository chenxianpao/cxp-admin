import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
// import { ShortcutsComponent } from './shortcuts/shortcuts.component';
import { MachineManagerComponent } from './machine-manager/machine-manager.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpModule } from '@angular/http';
import { UsageComponent } from './machine-manager/usage/usage.component';
import { TrainComponent } from './train/train.component';
import { DemandComponent } from './demand/demand.component';
// import { PersonlReportComponent } from './daily-report/personl-report/personl-report.component';
import { DailyReportModule } from './daily-report/daily-report.module';
// import { ToolsComponent } from './tools/tools.component';
// import { HuangliComponent } from './tools/huangli/huangli.component';
import { ToolsModule } from './tools/tools.module';
const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ECommerceModule,
    Ng2SmartTableModule,
    MiscellaneousModule,
    HttpModule,
    DailyReportModule,
    ToolsModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    // ShortcutsComponent,
    MachineManagerComponent,
    UsageComponent,
    TrainComponent,
    DemandComponent,
    // ToolsComponent,
    // HuangliComponent,
  ],
  entryComponents: [
    UsageComponent,
  ],
})
export class PagesModule {
}
