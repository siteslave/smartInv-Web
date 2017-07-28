import { StdService } from './std.service';
import { UserModule } from './user/user.module';
import { HelperModule } from './helper/helper.module';
import { DirectivesModule } from './directives/directives.module';
import { BrowserModule,  } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ClarityModule } from 'clarity-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { LoginModule } from './login/login.module';
import { AdminModule } from './admin/admin.module';
import { AdminGuard } from './admin-guard.service';
import { UserGuard } from './user-guard.service';
import { AlertService } from './alert.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AccessDeniedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ClarityModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    LoginModule,
    AdminModule,
    UserModule,
    DirectivesModule,
    HelperModule
  ],
  providers: [
    AdminGuard,
    UserGuard,
    AlertService,
    StdService,
    { provide: 'API_URL', useValue: environment.apiUrl },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
