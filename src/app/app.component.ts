import { Component, OnInit } from '@angular/core';
import { UserService } from './user.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isActivated: boolean = false ;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.activatedUser.subscribe(data => {
      this.isActivated = data ;
    })
  }
}
