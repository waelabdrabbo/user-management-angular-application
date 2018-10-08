import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUserData = {};
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }
  loginUser() {
    this.auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          console.log('%cToken :)', 'color:green');
          console.table(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/users']);
        },
        (err) => {
          console.log(err);
        });
  }

}
