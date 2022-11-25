import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent, NavigationEnd  } from '@angular/router';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-game',
  templateUrl: 'game.page.html',
  styleUrls: ['game.page.scss'],
})
export class GamePage implements OnInit {

  title = ''
  user: User | undefined = undefined;
  score = 0;
  autoClikers = 0;
  showAutoMergeButton = false;
  disabledAutoMerge = true;
  autoClickerBaseCost = 50;
  autoClickerCost = 0;
  intervals: any[] = [];

  constructor(
    private router: Router,
    private location: Location,
    private userService: UserService) {
    }

  ngOnInit() {
    this.router.events.subscribe(
      (event: NavigationEvent) => this.manageNavigationEvent(event));

    this.userService.getBrowserClose().subscribe(() => {
      this.saveUser();
      this.clearIntervals();
    });

    this.getUser();
  }

  /**
   * Add a new point.
   */
  merge() {
    if (this.user) {
      this.score++;
      this.enabledAutoMerge();
    }
  }

  /**
   * Start an auto merge action.
   */
  autoMerge() {
    this.autoClickerCost += this.autoClickerBaseCost;
    this.disabledAutoMerge = true;
    this.score = 0;
    this.autoClikers++;
    this.intervals.push(setInterval(() => {
      this.timeAutoMerge();
    }, 100));
  }

  /**
   * Returns the game to the init state.
   */
  restart() {
    this.score = 0;
    this.autoClikers = 0;
    this.autoClickerCost = this.autoClickerBaseCost;
    this.showAutoMergeButton = false;
    this.clearIntervals();
    this.saveUser();
  }

  /**
   * Navigate to the Ranking page.
   */
  goRanking() {
    this.saveUser();
    this.clearIntervals();
    this.router.navigate(['/ranking']);
  }

  /**
   * Exit the game, go to the Home page.
   */
  exit() {
    this.saveUser();
    this.clearIntervals();
    this.router.events.subscribe().unsubscribe();
    this.location.back();
  }

  private manageNavigationEvent(event: NavigationEvent){
    // Acces from login after reload navigator.
    if(event instanceof NavigationStart
      && event.url === '/game' && event.restoredState === null
      && !this.user) {
        this.getUser();
    }
    // Back from ranting.
    if(event instanceof NavigationEnd
      && event.url === '/game' && event.urlAfterRedirects === '/game') {
        this.getUser();
    }
  }

  private getUser() {
    if (!this.user)
      this.user = this.userService.getCurrentUser();

    if (this.user) {
      this.title = `Hi ${this.user.name}!`;
      this.score = this.user.score;
      this.autoClikers = this.user.autoClikers;
      this.autoMergeValues();
    }
    else
      this.router.navigate(['/']);
  }

  /**
   * Set auto merge values from user data.
   */
  private autoMergeValues() {
    this.autoClickerCost = this.autoClickerBaseCost + (this.autoClickerBaseCost * this.autoClikers);

    if (this.autoClikers > 0) {
      for(let i = 0; i < this.autoClikers; i++) {
        this.intervals.push(setInterval(() => {
          this.timeAutoMerge();
        }, 100))
      }
      this.showAutoMergeButton = true;
      this.disabledAutoMerge = true;
    }

    if (this.user && this.user.score >= this.autoClickerCost) {
      this.showAutoMergeButton = true;
      this.disabledAutoMerge = false;
    }
  }

  /**
   * Do an auto merge action.
   */
  private timeAutoMerge() {
    this.score += 1;
    this.enabledAutoMerge();
  }

  /**
   * If the score is enough, show the atuo merge button.
   */
  private enabledAutoMerge() {
    if (this.score >= this.autoClickerCost) {
      this.showAutoMergeButton = true;
      this.disabledAutoMerge = false;
    }
  }

  /**
   * Save user data.
   */
  private saveUser() {
    if (this.user) {
      this.user.score = this.score;
      this.user.autoClikers = this.autoClikers;
      this.userService.setUser(this.user);
    }
  }

  /**
   * Clear all intervals.
   */
  private clearIntervals() {
    this.intervals.forEach(interval => {
      clearInterval(interval);
    });
    this.intervals = [];
  }
}
