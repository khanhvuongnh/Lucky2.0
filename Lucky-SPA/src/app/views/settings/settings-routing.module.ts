import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackgroundComponent } from './background/background.component';
import { ConfigComponent } from './config/config.component';
import { EmpComponent } from './emp/emp.component';
import { LayoutComponent } from './layout/layout.component';
import { PrizeComponent } from './prize/prize.component';
import { SettingsHomeComponent } from './settings-home/settings-home.component';

const routes: Routes = [
  {
    path: '',
    // resolve: { res: AuditConformOrNonResolver },
    component: LayoutComponent,
    children: [
      {
        path: '',
        // resolve: { res: AuditConformOrNonUpdateResolver },
        component: SettingsHomeComponent
      },
      {
        path: 'background',
        // resolve: { res: AuditConformOrNonUpdateResolver },
        component: BackgroundComponent
      },
      {
        path: 'emp',
        // resolve: { res: AuditConformOrNonUpdateResolver },
        component: EmpComponent
      },
      {
        path: 'prize',
        // resolve: { res: AuditConformOrNonUpdateResolver },
        component: PrizeComponent
      },
      {
        path: 'config',
        // resolve: { res: AuditConformOrNonUpdateResolver },
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
