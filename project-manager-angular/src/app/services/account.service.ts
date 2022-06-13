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

  private usersSubject$ = new BehaviorSubject<UserDTO[]>([]);

  public getUsers$ = this.usersSubject$.asObservable();

  constructor(private http: HttpClient) {
  }

  searchForUsers() {
    this.http.get<UserDTO[]>('/api/User').subscribe({
      next: (users) => {
        this.usersSubject$.next(users);
      }
    })
  }

  loadUserInfo(): Observable<UserDTO> {
    return this.http.get<UserDTO>('/api/User/UserInfo');
  }

  setLoggedUser(user: UserDTO) {
    this.loggedUserSubject$.next(user);
  }

  login(model: LoginDTO): Observable<void> {
    return this.http.post<undefined>('/api/User/Login', model);
  }

  register(model: LoginDTO): Observable<void> {
    return this.http.post<undefined>('/api/User/Register', model);
  }

  logout(): Observable<void> {
    return this.http.post<undefined>('/api/User/Logout', null);
  }
}
