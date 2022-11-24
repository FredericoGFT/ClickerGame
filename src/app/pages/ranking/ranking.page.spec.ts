import { ScrollingModule } from '@angular/cdk/scrolling';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { UiPipesModule } from 'src/app/pipes/ui-pipes.module';
import { HeaderComponent } from 'src/app/ui-controls/header/header.component';
import { UiComponentsModule } from 'src/app/ui-controls/ui-components.module';

import { RankingPage } from './ranking.page';

describe('RankingPage', () => {
  let component: RankingPage;
  let fixture: ComponentFixture<RankingPage>;
  let headerComponent: HeaderComponent;
  let fixtureHeaderComponent: ComponentFixture<HeaderComponent>;
  const title = 'Ranking';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingPage ],
      imports: [UiComponentsModule, ScrollingModule, UiPipesModule, IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RankingPage);
    fixtureHeaderComponent = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    headerComponent = fixtureHeaderComponent.componentInstance;
    headerComponent.title = title;
    fixture.detectChanges();
    fixtureHeaderComponent.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Component header should has title', () => {
    expect(headerComponent).toBeTruthy();
    const compiledHeader = fixtureHeaderComponent.debugElement.nativeElement;
    expect(compiledHeader.innerHTML).toContain(title);
  });

  it('User values should be displayed', () => {
    const users: User[] = [{ name: 'test', score: 105, autoClikers: 11 }];

    const jsonUsers = JSON.stringify(users);
    localStorage.setItem('gameUsers', jsonUsers);
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.innerHTML).toContain(users[0].name);
    expect(compiled.innerHTML).toContain(users[0].score.toString());
    expect(compiled.innerHTML).toContain(users[0].autoClikers.toString());
  });
});
