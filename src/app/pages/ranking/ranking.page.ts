import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

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
    if (tempUsers.length > 0)
      this.users = tempUsers.sort((a, b) => b.score - a.score);
  }
}
