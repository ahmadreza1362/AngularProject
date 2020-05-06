import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/user';
import { AuthService } from 'src/app/_Services/Auth.service';
import { UserService } from 'src/app/_Services/user.service';
import { AlertifyService } from 'src/app/_Services/alertify.service';
 
@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
@Input() user: User;
  constructor(private authService: AuthService , private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  SendLike(id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(
      response => {
        this.alertify.success('you have liked: ' + this.user.knownAs);

      }, error => {
        console.log(error);
        this.alertify.error(error.error);
      });
  }

}
