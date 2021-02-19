import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LuckyComponent } from './lucky/lucky.component';
import { MainRoutingModule } from './main-routing.module';
import { ResultComponent } from './result/result.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SevenSegModule } from 'ng-sevenseg';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule,
    SevenSegModule
  ],
  declarations: [
    HomeComponent,
    LuckyComponent,
    ResultComponent,
    MainLayoutComponent
  ]
})
export class MainModule { }
