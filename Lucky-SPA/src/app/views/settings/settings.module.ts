import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsRoutingModule } from './settings-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { BackgroundComponent } from './background/background.component';
import { ConfigComponent } from './config/config.component';
import { EmpComponent } from './emp/emp.component';
import { PrizeComponent } from './prize/prize.component';
import { SettingsHomeComponent } from './settings-home/settings-home.component';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LayoutComponent,
    BackgroundComponent,
    ConfigComponent,
    EmpComponent,
    PrizeComponent,
    SettingsHomeComponent
  ],
  providers: [
    // AuditConformOrNonResolver,
    // AuditConformOrNonUpdateResolver
  ]
})
export class SettingsModule { }
