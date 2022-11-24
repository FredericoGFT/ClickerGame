import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title = '';
  @Input() iconName = '';
  @Output() headerEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  headerClick() {
    this.headerEvent.emit();
  }
}
