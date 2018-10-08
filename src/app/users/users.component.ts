import { Component, OnInit, EventEmitter } from '@angular/core';
import { UsersService } from './users.service';
import { User } from './users';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal) { }
    private _success = new Subject<string>();
    staticAlertClosed = false;
    successMessage: string;
    private currentUrl: string;
    public usersData: User[];
    public user: User = {
    id: 0,
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg',
    first_name: '',
    last_name: ''
  };

  ngOnInit() {
    this.route['data'].subscribe(
      res => {
        this.currentUrl = res['url'];
        this.usersData = res['data']['data'];
        console.log('%cUsers Data Initialized!', 'color:green');
        console.table(this.usersData);
      }
    );
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(3000)
    ).subscribe(() => this.successMessage = null);
  }

  open(content, first_name: string, last_name: string) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this._success.next('The User Has been Updated successfully.');
    }, (reason) => { });
    this.user.first_name = first_name;
    this.user.last_name = last_name;
  }

  addUser() {
    this.usersService.addUser('user', this.user).subscribe(
      res => {
        this.usersData.push(this.user);
        console.log('%cUser Added!', 'color:green');
        console.table(res);
      }, (err) => {
        console.log(err);
      }
    );
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(`${id}`).subscribe(
      res => {
        this.usersData = this.usersData.filter(value => value.id !== id);
        console.log('User Deleted!');

      }, (err) => {
        console.log('Cannot Remove this User');
      }
    );
  }
}
