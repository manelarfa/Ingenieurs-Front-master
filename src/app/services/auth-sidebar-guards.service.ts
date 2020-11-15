import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthSideBarGuardsService implements CanActivate {

  constructor(private auth: AuthenticationService,private router:Router) { }
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {

    try{
      this.auth.loadToken();
    }catch(ex)
    {

    }


    console.log(this.auth.isAuthentificated());

      if(this.auth.isAdmin()) {
        return true;
      } else {
        this.router.navigate(['/menu']);
      }
  }


}
