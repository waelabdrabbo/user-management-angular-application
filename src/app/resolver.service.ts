import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from './users/users.service';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResolverService {

  constructor(private usersService: UsersService, private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const url = route['data'];
    const userId = route.paramMap.get('id');
    if (!userId) {
      return this.usersService.getUsers(url['url']).pipe(map(
        res => {
          if (res) {
            return res;
          } else {
            this.router.navigate(['']);
          }
        }
      ));
    } else {
      return this.usersService.getUsers(`${url['url']}/${userId}`).pipe(map(
        res => {
          if (res) {
            return res;
          } else {
            this.router.navigate(['']);
          }
        }
      ));
    }
  }
}
