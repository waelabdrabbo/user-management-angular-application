import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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
    private modalService: NgbModal) { }


  private currentUrl: string;
  public usersData: User[];
  public user: User = {
    first_name: '',
    last_name: ''
  };
  newUser: User = new User();
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  loading: boolean;
  @Output()
  add: EventEmitter<User> = new EventEmitter();

  ngOnInit() {
    // Initialize Users
    this.route['data'].subscribe(
      res => {
        this.currentUrl = res['url'];
        this.usersData = res['data']['data'];
        console.log('%cUsers Data Initialized!', 'color:green');
        console.table(this.usersData);
      },
      err => console.log(err),
      () => this.loading = false
    );
    // Alert
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(3000)
    ).subscribe(() => this.successMessage = null);
  }

  // Add User
  addUser() {
    this.usersService.addUser('user', this.user).subscribe(
      (res) => {
        this.newUser = res;
        this.newUser.avatar = 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg';
        const last: any = this.usersData[this.usersData.length - 1]; // get the last id number in the users array
        let i = last.id;
        this.newUser.id = ++i; // to add the user by incremental id
        console.log('%cUser Added!', 'color:green');
        this.add.emit(this.newUser);
        this.usersData = this.usersData.concat(this.newUser);
        this._success.next('The User Has been Updated successfully.');
        return this;
      }, (err) => {
        console.log(err);
      }
    );
  }

  // Delete User
  deleteUser(id: number) {
    this.usersService.deleteUser(`${id}`).subscribe(
      res => {
        this.usersData = this.usersData.filter(value => value.id !== id);
        this._success.next('The User Has been Deleted successfully.');
        console.log('User Deleted!');
      }, (err) => {
        console.log(err);
      }
    );
  }

  // Modal
  open(content, first_name: string, last_name: string, id?: number) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => { });
    this.user.first_name = first_name;
    this.user.last_name = last_name;
  }

}
