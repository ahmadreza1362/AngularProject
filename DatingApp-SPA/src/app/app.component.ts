import { Component, OnInit } from '@angular/core';
import { AuthService } from './_Services/Auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import { User } from './_models/user';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  
  constructor(private authService: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if(token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
       this.authService.currentUser = JSON.parse(user);
       this.authService.changeMemberPhoto(this.authService.currentUser.photoUrl);
    }


  }

}
