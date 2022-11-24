import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { UiComponentsModule } from 'src/app/ui-controls/ui-components.module';

import { GamePage } from './game.page';

describe('GamePage', () => {
  let component: GamePage;
  let fixture: ComponentFixture<GamePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamePage],
      imports: [UiComponentsModule, IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
