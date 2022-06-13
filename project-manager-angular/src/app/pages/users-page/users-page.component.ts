import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  public users$ = this.accountService.getUsers$;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.searchForUsers();
  }
}
