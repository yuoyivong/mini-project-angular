import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideState, provideStore } from '@ngrx/store';
import { taskReducer } from './app/reducer/task.reducer';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

// bootstrapApplication(AppComponent, {
//   providers: [provideStore(), provideState({ tasks: taskReducer })],
// });
