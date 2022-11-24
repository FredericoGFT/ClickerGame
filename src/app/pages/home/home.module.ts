import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { UiComponentsModule } from 'src/app/ui-controls/ui-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    UiComponentsModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
