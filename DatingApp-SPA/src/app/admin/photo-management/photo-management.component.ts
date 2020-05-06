import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_Services/admin.service';
import { AlertifyService } from 'src/app/_Services/alertify.service';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css']
})
export class PhotoManagementComponent implements OnInit {

  photos: any;

  constructor(private adminService: AdminService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getPhotosForApproval();
  }

  getPhotosForApproval() {
    this.adminService.getPhotosForApproval().subscribe((photos) => {
      this.photos = photos;

    }, error => {
      this.alertify.error(error.error);

    });

  }

  approvaPhoto(photoId: number) {
    this.adminService.approvaPhoto(photoId).subscribe(() => {
      this.photos.splice(this.photos.findIndex(d => d.id === photoId), 1);
    }, error => {
      this.alertify.error(error.error);
    });
  }
  rejectPhoto(photoId: number) {
    this.adminService.rejectPhoto(photoId).subscribe(() => {
      this.photos.splice(this.photos.findIndex(d => d.id === photoId), 1);
    }, error => {
      this.alertify.error(error.error);
    });
  }

}
