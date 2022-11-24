import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/ui-controls/header/header.component';
import { UiComponentsModule } from 'src/app/ui-controls/ui-components.module';

import { GamePage } from './game.page';

describe('GamePage', () => {
  let component: GamePage;
  let fixture: ComponentFixture<GamePage>;
  let headerComponent: HeaderComponent;
  let fixtureHeaderComponent: ComponentFixture<HeaderComponent>;
  const title = 'Hi';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamePage],
      imports: [UiComponentsModule, IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GamePage);
    fixtureHeaderComponent = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    headerComponent = fixtureHeaderComponent.componentInstance;
    headerComponent.title = title;
    fixture.detectChanges();
    fixtureHeaderComponent.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('Component header should has title', () => {
    expect(headerComponent).toBeTruthy();
    const compiledHeader = fixtureHeaderComponent.debugElement.nativeElement;
    expect(compiledHeader.innerHTML).toContain(title);
  });
});
