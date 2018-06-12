import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AppService} from '../app.service';

@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivate {

  constructor(public appService:AppService,
              public router:Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.appService.logedIn) {
          return true;
      } else {
          this.router.navigateByUrl('/sign-in');
      }
  }
}
