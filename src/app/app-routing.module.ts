import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LandingPageComponent } from './pages/landing-page/landing-page/landing-page.component';
import { TaskPageComponent } from './pages/task-page/task-page.component';
import { OwnerGuard } from './guards/owner.guard';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BoardComponent } from './components/board/board.component';
import { AddNewTaskComponent } from './components/add-new-task/add-new-task.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login-component', component: LoginComponent },
  { path: 'signup-component', component: SignupComponent },
  { path: 'task', component: TaskPageComponent, canActivate: [OwnerGuard] },

  {
    path: 'sidebar',
    component: SidebarComponent,
    canActivate: [OwnerGuard],
    children: [
      { path: 'board', component: BoardComponent },
      { path: 'addNewTask', component: AddNewTaskComponent },
    ],
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
