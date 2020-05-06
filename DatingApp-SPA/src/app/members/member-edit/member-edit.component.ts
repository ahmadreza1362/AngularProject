import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_Services/user.service';
import { AuthService } from 'src/app/_Services/Auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
 @ViewChild('editForm', {static: true})  editFrom2: NgForm;
 user: User;
 photoUrl: string;
 @HostListener('window:beforeunload', ['$event'])
 unloadNotification($event: any) {
   if (this.editFrom2.dirty) {
     $event.returnValue = true;
   }
 }
  
  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
              private userService: UserService, private authService: AuthService ) { }

  ngOnInit() {
    this.route.data.subscribe( data=> {
      this.user = data['user'];
      this.authService.currentPhotoUrl.subscribe( photoUrl => this.photoUrl = photoUrl);
    });
  }

  updateUser() {

    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('Profile updated successfully');
      this.editFrom2.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });
  }
  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }
}
