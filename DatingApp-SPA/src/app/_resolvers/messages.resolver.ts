import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from '../_Services/user.service';
import { AlertifyService } from '../_Services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../_models/Message';
import { AuthService } from '../_Services/Auth.service';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
    constructor(private userService: UserService, private alertify: AlertifyService,
                private router: Router, private authService: AuthService ) {}
    pageNumber = 1;
    pageSize = 5;
    messageContainer = 'Unread';
    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
       return this.userService.getMessages(this.authService.decodedToken.nameid, this.pageNumber,
         this.pageSize, this.messageContainer).pipe(
            catchError( error => {
                this.alertify.error('Problem retrieving messages');
                this.router.navigate(['/home']);
                return of(null);

            }

            )
        );

    }

}