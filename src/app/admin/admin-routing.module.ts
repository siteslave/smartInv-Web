import { RequestApproveComponent } from './request/request-approve/request-approve.component';
import { RequestPageComponent } from './request/request-page/request-page.component';
import { ReceiveNewComponent } from './receives/receive-new/receive-new.component';
import { ReceiveMainComponent } from './receives/receive-main/receive-main.component';
import { ProductMainComponent } from './products/product-main/product-main.component';
import { SuppliersMainComponent } from './suppliers/suppliers-main/suppliers-main.component';
import { DepartmentMainComponent } from './departments/department-main/department-main.component';
import { UnitsMainComponent } from './units/units-main/units-main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../admin-guard.service';
import { LayoutComponent } from './layout/layout.component';
// pages
import { MainPageComponent } from './main-page/main-page.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { GenericMainComponent } from './generics/generic-main/generic-main.component';
const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', component: MainPageComponent },
      { path: 'generic', component: GenericMainComponent },
      { path: 'units', component: UnitsMainComponent },
      { path: 'departments', component: DepartmentMainComponent },
      { path: 'suppliers', component: SuppliersMainComponent },
      { path: 'products', component: ProductMainComponent },
      { path: 'receives', component: ReceiveMainComponent },
      { path: 'receives/new', component: ReceiveNewComponent },
      { path: 'requests', component: RequestPageComponent },
      { path: 'requests/approve/:requestId', component: RequestApproveComponent },
      { path: '**', component: PageNotFoundComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
