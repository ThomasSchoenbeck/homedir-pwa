import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListComponent } from './pages/list/list.component';
import { AuthGuard } from './auth.guard';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { animation: 'Login'  } },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { animation: 'Dashboard'  } },
  { path: 'list', component: ListComponent, canActivate: [AuthGuard], data: { animation: 'List'  } },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard], data: { animation: 'Profile'  } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
