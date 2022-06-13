import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { catchError, firstValueFrom, lastValueFrom, map, Observable, of } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private accountService: AccountService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.accountService.loadUserInfo().pipe(
      catchError(() => {
        this.router.navigate(['/auth/login']);
        return of(false);
      }),
      map((user: any) => {
        if(user){
          this.accountService.setLoggedUser(user);
          return true;
        }
        return false;
      }))
  }
}
