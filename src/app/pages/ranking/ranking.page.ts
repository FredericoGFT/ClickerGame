import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'src/app/ui-controls/models/user';
import { UserService } from 'src/app/ui-controls/services/user.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {

  title = 'Ranking'
  users: User[] = [];

  constructor(
    private location: Location,
    private userService: UserService) {}

  ngOnInit() {
    this.getUsersList();
  }

  goBack() {
    this.location.back();
  }

  private getUsersList() {
    const tempUsers = this.userService.getUsers();
    if (tempUsers.length > 0) {
      this.users = tempUsers.sort(function(a, b) {
        return b.score - a.score;
      });
    }
  }
}
