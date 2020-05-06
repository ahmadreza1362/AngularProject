import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/_Services/Auth.service';
import { UserService } from 'src/app/_Services/user.service';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { Message } from 'src/app/_models/Message';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};


  constructor(private authService: AuthService, 
              private userService: UserService, private alertify: AlertifyService ) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    
    const currentUser = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId).
    pipe(
      tap( messages => {
        for (let i = 0 ; i < messages.length ; i++) {
          if (messages[i].isRead === false && messages[i].recipientId === currentUser) {
           
             this.userService.markAsRead(currentUser, messages[i].id);
          }

        }
      }

      )
    ).
    subscribe(response => {
      this.messages = response;

    }, error => {
      this.alertify.error(error.error);
    });
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessge(this.authService.decodedToken.nameid , this.newMessage)
    .subscribe((message: Message) => {
      this.messages.unshift(message);
      this.newMessage.content = '';
    }, error =>{
      this.alertify.error(error.error);
    });
  }

}
