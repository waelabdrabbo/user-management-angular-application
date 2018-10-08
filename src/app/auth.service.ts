import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'https://reqres.in/api/login';
  constructor(private http: HttpClient, private router: Router) { }
  loginUser(user) {
    return this.http.post<any>(this.loginUrl, user);
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }
  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
