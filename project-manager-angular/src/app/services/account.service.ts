import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginDTO } from '../models/login.dto';
import { UserDTO } from '../models/user.dto';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private loggedUserSubject$ = new BehaviorSubject<UserDTO | undefined>(undefined);

  public getLoggedUser$ = this.loggedUserSubject$.asObservable();

  constructor(private http: HttpClient) {
  }

  loadUserInfo(): Observable<UserDTO> {
    return this.http.get<UserDTO>('/api/User/UserInfo');
  }

  setLoggedUser(user: UserDTO) {
    this.loggedUserSubject$.next(user);
  }

  login(model: LoginDTO): Observable<void> {
    return this.http.post<undefined>('/api/User/login', model);
  }

  logout(): Observable<void> {
    return this.http.post<undefined>('/api/User/logout', null);
  }
}
