import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-page-button',
  templateUrl: './page-button.component.html',
  styleUrls: ['./page-button.component.scss'],
})
export class PageButtonComponent {

  @Input() submitForm = false;
  @Input() disabled = false;
  @Input() icon = '';
  @Input() text = '';
  @Output() clickEvent = new EventEmitter();

  sendClick() {
    if (!this.disabled)
      this.clickEvent.emit();
  }
}
