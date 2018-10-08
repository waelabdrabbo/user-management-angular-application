import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private endpoint = 'https://reqres.in/api/';
  constructor(private http: HttpClient) { }

  getUsers(url: string) {
    return this.http.get(this.endpoint + url + '?per_page=8').pipe(map((data) => data));
  }

  addUser(url: string, data: object) {
    return this.http.post(this.endpoint + url, data).pipe(map((res) => res));
  }

  updateUser(url: string, data: object) {
    return this.http.put(this.endpoint + url, data).pipe(map((res) => res));
  }

  deleteUser(url: string) {
    return this.http.delete(this.endpoint + url).pipe(map((data) => data));
  }
}
