import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProjectPageDetailComponent } from './pages/project-page-detail/project-page-detail.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { ProjectDetailResolver } from './resolver/project-detail.resolver';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'projects', component: DashboardPageComponent},
      { path: 'projects/:id', component: ProjectPageDetailComponent, resolve: { project: ProjectDetailResolver}},
      { path: 'users', component: UsersPageComponent},
      { path: '**', pathMatch: 'full', redirectTo: '/projects'}
    ],
  },
  {
    path: 'auth',
    component: PublicLayoutComponent,
    children: [
      { path: 'login', component: LoginPageComponent},
      { path: 'register', component: RegisterPageComponent}
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: '/admin'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
