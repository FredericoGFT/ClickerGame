import { Component, HostListener } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  @HostListener('window:beforeunload')
  async ngOnDestroy()
  {
    await this.userService.onBrowserClose();
  }

  constructor(
    private userService: UserService) {}
}
