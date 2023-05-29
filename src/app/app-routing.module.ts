import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LandingPageComponent } from './pages/landing-page/landing-page/landing-page.component';
import { TaskPageComponent } from './pages/task-page/task-page.component';
import { OwnerGuard } from './guards/owner.guard';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login-component', component: LoginComponent },
  { path: 'signup-component', component: SignupComponent },
  { path: 'task', component: TaskPageComponent, canActivate: [OwnerGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
