import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigComponent } from './config/config.component';
import { EmpComponent } from './emp/emp.component';
import { LayoutComponent } from './layout/layout.component';
import { PrizeComponent } from './prize/prize.component';
import { SettingsHomeComponent } from './settings-home/settings-home.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: SettingsHomeComponent
      },
      {
        path: 'danh-sach',
        component: EmpComponent
      },
      {
        path: 'giai-thuong',
        component: PrizeComponent
      },
      {
        path: 'cau-hinh',
        component: ConfigComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
