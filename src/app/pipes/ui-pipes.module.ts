import { NgModule } from "@angular/core";
import { ScoreUnitsPipe } from "./score-units.pipe";

@NgModule({
  declarations: [
    ScoreUnitsPipe
  ],
  exports: [
    ScoreUnitsPipe
  ]
})
export class UiPipesModule {}
