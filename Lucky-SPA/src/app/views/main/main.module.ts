import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LuckyComponent } from './lucky/lucky.component';
import { MainRoutingModule } from './main-routing.module';
import { ResultComponent } from './result/result.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule
  ],
  declarations: [
    HomeComponent,
    LuckyComponent,
    ResultComponent,
    MainLayoutComponent
  ],
  providers: [
    // AuditConformOrNonResolver,
    // AuditConformOrNonUpdateResolver
  ]
})
export class MainModule { }