import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_Services/Auth.service';
import { UserService } from '../_Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_Services/alertify.service';
import { Pagination, PaginatedResult } from '../_models/Pagination';
import { User } from '../_models/user';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  users: User[];
  pagination: Pagination;
  likesParam: string;
  constructor(private authService: AuthService, private userService: UserService,
              private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(response =>
      {
        this.users = response['users'].result;
        this.pagination = response['users'].pagination;
     });
    this.likesParam = 'Likers';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers()
  {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
    .subscribe((res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

}
