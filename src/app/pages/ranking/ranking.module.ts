import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RankingPageRoutingModule } from './ranking-routing.module';
import { RankingPage } from './ranking.page';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { UiComponentsModule } from 'src/app/ui-controls/ui-components.module';
import { UiPipesModule } from 'src/app/pipes/ui-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RankingPageRoutingModule,
    ScrollingModule,
    UiComponentsModule,
    UiPipesModule
  ],
  declarations: [RankingPage]
})
export class RankingPageModule {}
