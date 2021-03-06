import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { cs_CZ } from 'ng-zorro-antd/i18n';
import { DatePipe, registerLocaleData } from '@angular/common';
import cs from '@angular/common/locales/cs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ProjectPageDetailComponent } from './pages/project-page-detail/project-page-detail.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { IssueFormComponent } from './components/issue-form/issue-form.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { IssueComponentComponent } from './components/issue-component/issue-component.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

registerLocaleData(cs);

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardPageComponent,
    AdminLayoutComponent,
    PublicLayoutComponent,
    RegisterPageComponent,
    ProjectPageDetailComponent,
    UsersPageComponent,
    IssueFormComponent,
    IssueComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzLayoutModule,
    NzMenuModule,
    NzAvatarModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    NzIconModule,
    BrowserAnimationsModule,
    NzNotificationModule,
    NzEmptyModule,
    NzModalModule,
    NzBreadCrumbModule,
    NzBadgeModule,
    NzSelectModule,
    DragDropModule
  ],
  providers: [DatePipe, { provide: NZ_I18N, useValue: cs_CZ }],
  bootstrap: [AppComponent]
})
export class AppModule { }
