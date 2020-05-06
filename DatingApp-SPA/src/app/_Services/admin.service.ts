import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

   baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUserWithRoles() {
   return this.http.get(this.baseUrl + 'admin/UserWithRoles' );
  }

  updateRoles(user: User, roles: {}) {
    return this.http.post(this.baseUrl + 'admin/editRole/' + user.userName, roles);
  }

  getPhotosForApproval() {
    return this.http.get(this.baseUrl + 'admin/PhotosForModeration' );
 
  }
  approvaPhoto(photoId) {
    return this.http.post(this.baseUrl + 'admin/approvePhoto/' + photoId, {} );
  }

 rejectPhoto(photoId) {
  return this.http.post(this.baseUrl + 'admin/rejectPhoto/' + photoId, {} );
 }
}
