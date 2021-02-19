import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsRoutingModule } from './settings-routing.module';
import { LayoutComponent } from './layout/layout.component';
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
    ConfigComponent,
    EmpComponent,
    PrizeComponent,
    SettingsHomeComponent
  ]
})
export class SettingsModule { }
