import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './pages/landing-page/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TaskPageComponent } from './pages/task-page/task-page.component';
import { JwtInterceptor } from './interceptors/jwt-interceptor';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BoardComponent } from './components/board/board.component';
import { StoreModule, provideStore } from '@ngrx/store';
import { taskReducer } from './reducer/task.reducer';
import { ViewTaskPopupComponent } from './components/view-task-popup/view-task-popup.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryPopupComponent } from './components/category-popup/category-popup.component';
import { AddNewTaskComponent } from './components/add-new-task/add-new-task.component';
import { categoryReducer } from './reducer/category.reducer';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    TaskPageComponent,
    NotFoundPageComponent,
    SidebarComponent,
    BoardComponent,
    ViewTaskPopupComponent,
    AddNewTaskComponent,
    CategoryComponent,
    CategoryPopupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ tasks: taskReducer, categories: categoryReducer }),
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
