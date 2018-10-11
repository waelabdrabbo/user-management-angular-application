import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/users.service';
import { User } from '../users/users';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }
  private currentUrl: string;
  public user: User;

  ngOnInit() {
    this.route['data'].subscribe(
      res => {
        this.user = res['data']['data'];
        this.currentUrl = res['url'];
        console.log(this.currentUrl);
        console.log('%cUser Data Initialized!', 'color:green');
        console.table(this.user);
      }
    );

}
deleteUser(id: number) {
  this.usersService.deleteUser(`${id}`).subscribe(
    res => {
      console.log('User Deleted!');
      this.router.navigate(['/users']);
    }, (err) => {
      console.log('Cannot Remove this User');
    }
  );
}
}
