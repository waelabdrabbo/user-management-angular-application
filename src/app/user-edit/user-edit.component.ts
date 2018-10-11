import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/users.service';
import { User } from '../users/users';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  private currentUrl: string;
  public user: User;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;

  ngOnInit() {
    // Initialize User
    this.route['data'].subscribe(
      res => {
        this.user = res['data']['data'];
        this.currentUrl = res['url'];
        console.log(this.currentUrl);
        console.log('%cUser Data Initialized!', 'color:green');
        console.table(this.user);
      }
    );
    // Alert
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(3000)
    ).subscribe(() => this.successMessage = null);
  }
  // Update User
  updateUser(id: number) {
    this.usersService.updateUser(`${this.currentUrl}/${id}`, this.user).subscribe(
      res => {
        console.log('User Updated!');
        this._success.next('The User Has been Updated successfully.');
        setTimeout(() => {
          this.router.navigate(['/users']);
        }, 3000);
      }, (err) => {
        console.log(err);
      }
    );
  }
}
