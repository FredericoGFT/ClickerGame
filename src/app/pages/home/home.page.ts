import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd, Event as NavigationEvent  } from '@angular/router';
import { User } from 'src/app/ui-controls/models/user';
import { UserService } from 'src/app/ui-controls/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  isSubmitted = false;
  formData: FormGroup = this.formBuilder.group({
    name: ['', {
        validators: [
           Validators.required,
           Validators.minLength(2),
           Validators.maxLength(15)
        ]
    }]
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) {
    }

  ngOnInit() {
    this.router.events.subscribe(
      (event: NavigationEvent) => this.manageNaviagtionEvent(event));
  }

  get errorControl() {
    return this.formData.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.formData.valid) {
      const user: User = {name: this.formData.value.name, score: 0, autoClikers: 0};
      this.userService.setUser(user);
      this.router.navigate(['/game']);
    }
  }

  private manageNaviagtionEvent(event: NavigationEvent){
    if(event instanceof NavigationEnd && event.url === '/home') {
      this.formData.controls['name'].setValue('');
      this.formData.reset();
      this.isSubmitted = false;
    }
  }
}
