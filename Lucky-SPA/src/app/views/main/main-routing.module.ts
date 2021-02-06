import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LuckyComponent } from './lucky/lucky.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {
    path: '',
    // resolve: { res: AuditConformOrNonResolver },
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        // resolve: { res: AuditConformOrNonResolver },
        component: HomeComponent
      },
      {
        path: 'lucky',
        // resolve: { res: AuditConformOrNonUpdateResolver },
        component: LuckyComponent
      },
      {
        path: 'result',
        // resolve: { res: AuditConformOrNonUpdateResolver },
        component: ResultComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
