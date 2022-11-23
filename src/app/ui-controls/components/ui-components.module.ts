import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { PageButtonComponent } from './buttons/page-button/page-button.component';

@NgModule({
  declarations: [HeaderComponent, PageButtonComponent],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [HeaderComponent, PageButtonComponent]
})
export class UiComponentsModule { }
