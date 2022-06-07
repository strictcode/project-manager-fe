import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  public isUserLoggedIn = false;

  public user$ = this.accountService.getLoggedUser$;

  mobileMenu = false;

  footerDate = new Date();

  currentVersion: any;

  constructor(private accountService: AccountService, private router: Router,
    public datepipe: DatePipe) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.accountService.logout().subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  textForAvatar(name: string) {
    if (name) {
      if (name.length > 1) {
        return name.substring(0, 2).toUpperCase();
      }
    }
    return 'U';
  }

  showMobile(){
    this.mobileMenu = true;
  }

  close(){
    this.mobileMenu = false;
  }

}
