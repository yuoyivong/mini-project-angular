import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from 'src/app/components/chat/chat.component';

@NgModule({
  declarations: [ChatComponent],
  imports: [CommonModule, FormsModule],
  exports: [ChatComponent],
})
export class ChatModule {}
