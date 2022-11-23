import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { GamePage } from './game.page';
import { GamePageRoutingModule } from './game-routing.module';
import { UiComponentsModule } from 'src/app/ui-controls/components/ui-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamePageRoutingModule,
    UiComponentsModule
  ],
  declarations: [GamePage]
})
export class GamePageModule {}
