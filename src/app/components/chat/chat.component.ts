import { Component, OnInit, AfterContentChecked } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, AfterContentChecked {
  publicChats: any[] = [];
  newMessage: string | undefined;
  privateChat = new Map<string, any>();
  disabled: boolean = true;

  userData = {
    username: '',
    receiverName: '',
    connected: false,
    message: '',
  };

  tab: string = 'CHATROOM';
  private stompClient: any;

  constructor() {}

  ngAfterContentChecked(): void {
    console.log('Tab : ', this.tab);
    console.log('Private : ', this.privateChat);
  }

  ngOnInit(): void {
    // this.connect();
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;
    if (connected) {
      this.publicChats = [];
    }
  }

  connect() {
    const socket = new SockJS('http://localhost:8080/testchat');
    this.stompClient = Stomp.over(socket);
    // const _this = this;
    // this.stompClient?.connect({}, function (frame: any) {
    //   console.log('Connected : ' + frame);
    //   _this.stompClient?.subscribe('/start/public', function (data: any) {
    //     console.log(data.body);
    //     _this.showMessage(data.body);
    //   });
    // });
    this.stompClient.connect({}, () => {
      this.userData = { ...this.userData, connected: true };
      this.stompClient.subscribe('/start/public', (message: any) => {
        this.onMessageReceived(message);
        // this.showMessage(message.body);
      });

      this.stompClient.subscribe(
        '/user/' + this.userData.username + '/private',
        (message: any) => {
          console.log('Private chat : ', message);

          this.onPrivateMessage(message);
        }
      );

      this.userJoin();
    });
  }

  // user join
  userJoin() {
    const chatMessage = { senderName: this.userData?.username, status: 'JOIN' };
    this.stompClient?.send('/message', {}, JSON.stringify(chatMessage));
  }

  // message received
  onMessageReceived(payload: any) {
    const payloadData = JSON.parse(payload.body);
    console.log('Payload : ', payloadData);
    switch (payloadData.status) {
      case 'JOIN':
        if (!this.privateChat?.get(payloadData.senderName)) {
          this.privateChat.set(payloadData.senderName, []);
        }
        break;
      case 'MESSAGE':
        this.publicChats.push(payloadData);
        break;
    }
  }

  onPrivateMessage(message: any) {
    console.log('Private message : ', message);

    const payloadData = JSON.parse(message.body);
    if (this.privateChat.has(payloadData.senderName)) {
      this.privateChat.get(payloadData.senderName)?.push(payloadData);
    } else {
      this.privateChat.set(payloadData.senderName, [payloadData]);
    }
  }

  // get message from input
  // handleMessage(event: any) {
  //   const { value } = event.target;
  //   if (this.userData?.message) {
  //     this.userData.message = value;
  //   }
  // }

  // send public messge
  sendMessage() {
    // if (this.stompClient) {
    //   const chatMessage = {
    //     senderName: this.userData?.username,
    //     message: this.userData?.message,
    //     status: 'MESSAGE',
    //   };
    //   console.log('Hello : ', chatMessage);
    //   this.stompClient?.send('/app/messasge', {}, JSON.stringify(chatMessage));

    //   this.userData!.message = '';
    // }

    // this.stompClient.send(
    //   '/current/message',
    //   {},
    //   JSON.stringify(this.newMessage)
    // );
    // this.newMessage = '';
    const chatMessage = {
      senderName: this.userData?.username,
      message: this.userData?.message,
      status: 'MESSAGE',
    };
    this.stompClient.send('/current/message', {}, JSON.stringify(chatMessage));
    this.userData.message = '';
  }

  // send private message
  sendPrivateMessage() {
    if (this.stompClient) {
      const chatMessage = {
        senderName: this.userData?.username,
        receiverName: this.tab,
        message: this.userData?.message,
        status: 'MESSAGE',
      };

      if (this.userData?.username !== this.tab) {
        this.privateChat.get(this.tab)?.push(chatMessage);
      }

      this.stompClient.send(
        '/current/private-message',
        {},
        JSON.stringify(chatMessage)
      );
      this.userData!.message = '';
    }
  }

  // handleUsername(event: any) {
  //   const { value } = event.target;
  //   if (this.userData?.username) {
  //     this.userData.username = value;
  //   }
  // }

  // showMessage(message: string) {
  //   console.log('Message : ', message);
  //   this.publicChats.push(message);
  // }

  registerUser() {
    this.connect();
  }
}
