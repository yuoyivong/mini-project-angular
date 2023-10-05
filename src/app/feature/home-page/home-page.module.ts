import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from 'src/app/components/home/home.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core/core.module';
import { ShareModule } from 'src/app/shared/share/share.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, CoreModule, RouterModule],
  exports: [HomeComponent],
})
export class HomePageModule {}
