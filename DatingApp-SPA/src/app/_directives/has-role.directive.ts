import { Directive, ViewContainerRef, TemplateRef, OnInit, Input } from '@angular/core';
import { AuthService } from '../_Services/Auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {

  @Input() appHasRole: string[] ;
  isVisible = false;
  constructor(private viewContainerRef: ViewContainerRef,
              private templatRef: TemplateRef<any>, private authService: AuthService ) { }

  ngOnInit() {
   const userRoles = this.authService.decodedToken.role as Array<string>;
   if (!userRoles) {
      this.viewContainerRef.clear();
   }

   if (this.authService.roleMatch(this.appHasRole)) {

     if (!this.isVisible) {
      this.isVisible = true;
      this.viewContainerRef.createEmbeddedView(this.templatRef);
     } else {
     this.isVisible = false;
     this.viewContainerRef.clear();
   }
  }
}

}
