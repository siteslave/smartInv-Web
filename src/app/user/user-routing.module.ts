import { RequestNewComponent } from './request/request-new/request-new.component';
import { ChangePasswordPageComponent } from './change-password/change-password-page/change-password-page.component';
import { StockPageComponent } from './stock/stock-page/stock-page.component';
import { RequestPageComponent } from './request/request-page/request-page.component';
import { MainPageComponent } from './main/main-page/main-page.component';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from '../user-guard.service';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
const routes: Routes = [
  {
    path: 'users',
    component: LayoutComponent,
    canActivate: [UserGuard],
    children: [
      { path: '', redirectTo: 'request', pathMatch: 'full' },
      // { path: 'main', component: MainPageComponent },
      { path: 'request', component: RequestPageComponent },
      { path: 'request/new', component: RequestNewComponent },
      { path: 'stock', component: StockPageComponent },
      { path: 'change-password', component:  ChangePasswordPageComponent},
      { path: '**', component: PageNotFoundComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
