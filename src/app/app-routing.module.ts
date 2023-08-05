import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { ConfirmSignUpComponent } from './confirm-sign-up/confirm-sign-up.component';
import { AuthGuard } from '../guards/auth.guard';
import { NewPasswordComponent } from './new-password/new-password.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'confirm-sign-up', component: ConfirmSignUpComponent },
  { path: 'new-password', component: NewPasswordComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
