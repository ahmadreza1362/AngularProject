import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from '../_Services/user.service';
import { AlertifyService } from '../_Services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
    constructor(private userService: UserService, private alertify: AlertifyService, private router: Router ) {}
    pageNumber = 1;
    pageSize = 5;
    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
       return this.userService.getUsers(this.pageNumber, this.pageSize).pipe(
            catchError( error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);

            }

            )
        );

    }

}