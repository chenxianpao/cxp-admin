/**
 * Created by chenxianpao on 2018/8/30.
 */
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ShortcutsComponent } from './shortcuts/shortcuts.component';
import { HuangliComponent } from './huangli/huangli.component';
import { ToolsComponent } from './tools.component';

@NgModule({
  imports: [
    ThemeModule,
    // NgxEchartsModule,
  ],
  declarations: [
    ShortcutsComponent,
    HuangliComponent,
    ToolsComponent,
    // DashboardComponent,
    // StatusCardComponent,
    // TemperatureDraggerComponent,
    // ContactsComponent,
    // RoomSelectorComponent,
    // TemperatureComponent,
    // RoomsComponent,
    // TeamComponent,
    // KittenComponent,
    // SecurityCamerasComponent,
    // ElectricityComponent,
    // ElectricityChartComponent,
    // WeatherComponent,
    // PlayerComponent,
    // SolarComponent,
    // TrafficComponent,
    // TrafficChartComponent,
  ],
})
export class ToolsModule { }
