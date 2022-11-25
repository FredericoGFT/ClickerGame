import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { HeaderComponent } from 'src/app/ui-controls/header/header.component';
import { PageButtonComponent } from 'src/app/ui-controls/page-button/page-button.component';
import { UiComponentsModule } from 'src/app/ui-controls/ui-components.module';
import { GamePage } from './game.page';

describe('GamePage', () => {
  let component: GamePage;
  let fixture: ComponentFixture<GamePage>;
  let headerComponent: HeaderComponent;
  let fixtureHeaderComponent: ComponentFixture<HeaderComponent>;
  let mergeButtonComponent: PageButtonComponent;
  let buyButtonComponent: PageButtonComponent;
  let restartButtonComponent: PageButtonComponent;
  let rankingButtonComponent: PageButtonComponent;
  let fixtureMergeButtonComponent: ComponentFixture<PageButtonComponent>;
  let fixtureBuyButtonComponent: ComponentFixture<PageButtonComponent>;
  let fixtureRestartButtonComponent: ComponentFixture<PageButtonComponent>;
  let fixtureRankingButtonComponent: ComponentFixture<PageButtonComponent>;
  const user: User = { name: 'test', score: 49, autoClikers: 0 };
  const title = `Hi ${user.name}`;
  const iconName = 'return-down-back-outline';
  const mergeButtonText = 'MERGE';
  const buyButtonText = 'BUY AUTO MERGE (50)';
  const restartButtonText = 'RESTART';
  const rankingButtonText = 'RANKING';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamePage],
      imports: [UiComponentsModule, IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GamePage);
    fixtureHeaderComponent = TestBed.createComponent(HeaderComponent);
    fixtureMergeButtonComponent = TestBed.createComponent(PageButtonComponent);
    fixtureBuyButtonComponent = TestBed.createComponent(PageButtonComponent);
    fixtureRestartButtonComponent = TestBed.createComponent(PageButtonComponent);
    fixtureRankingButtonComponent = TestBed.createComponent(PageButtonComponent);

    component = fixture.componentInstance;
    component.user = user;
    headerComponent = fixtureHeaderComponent.componentInstance;
    headerComponent.title = title;
    headerComponent.iconName = iconName;
    mergeButtonComponent = fixtureMergeButtonComponent.componentInstance;
    mergeButtonComponent.text = mergeButtonText;
    buyButtonComponent = fixtureBuyButtonComponent.componentInstance;
    buyButtonComponent.text = buyButtonText;
    restartButtonComponent = fixtureBuyButtonComponent.componentInstance;
    restartButtonComponent.text = restartButtonText;
    rankingButtonComponent = fixtureRankingButtonComponent.componentInstance;
    rankingButtonComponent.text = buyButtonText;

    fixture.detectChanges();
    fixtureHeaderComponent.detectChanges();
    fixtureMergeButtonComponent.detectChanges();
    fixtureBuyButtonComponent.detectChanges();
    fixtureRestartButtonComponent.detectChanges();
    fixtureRankingButtonComponent.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Component header should has title', () => {
    expect(headerComponent).toBeTruthy();
    const compiledHeader = fixtureHeaderComponent.debugElement.nativeElement;
    expect(compiledHeader.innerHTML).toContain(title);
    expect(compiledHeader.innerHTML).toContain(iconName);
  });

  it('Merge button should create', () => {
    const compiledButton = fixtureMergeButtonComponent.debugElement.nativeElement;
    const innerHTML = compiledButton.innerHTML as string;
    expect(innerHTML).toContain(mergeButtonText);
    expect(innerHTML.indexOf('type="submit"')).toBeLessThan(0);
  });

  it('Merge button should fired', fakeAsync(() => {
    spyOn(component, 'merge');
    let button = fixture.nativeElement.querySelector('ion-button');
    button.dispatchEvent(new Event('click'));
    tick();

    fixture.detectChanges();
    expect(component.merge).toHaveBeenCalled();
  }));

  it('Merge function should work', () => {
    let buttons = fixture.nativeElement.querySelectorAll('app-page-button') as any[];
    let itemFound = undefined;
    buttons.forEach(item => {
      if (item.innerText.indexOf(buyButtonText) > -1) // Buy button is not display.
        itemFound = item;
    })
    expect(itemFound == undefined).toBeTrue();

    component.merge();
    fixture.detectChanges();

    const strong = fixture.nativeElement.querySelector('strong');
    expect(strong.innerHTML).toContain(`requests: ${(++user.score).toString()}`);

    buttons = fixture.nativeElement.querySelectorAll('app-page-button') as any[];
    itemFound = undefined;
    buttons.forEach(item => {
      if (item.innerText.indexOf(buyButtonText) > -1) // Buy button is display.
        itemFound = item;
    })
    expect(itemFound != undefined).toBeTrue();
  });

  it('Buy button should create', (done) => {
    fixture = TestBed.createComponent(GamePage);
    component = fixture.componentInstance;

    user.score = 50;
    component.user = user;

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('app-page-button') as any[];
      let itemFound = undefined;
      buttons.forEach(item => {
        if (item.innerText.indexOf(buyButtonText) > -1)
          itemFound = item;
      })
      expect(itemFound != undefined).toBeTrue();
      done();
    });
  });

  it('Restart button should create', () => {
    const buttons = fixture.nativeElement.querySelectorAll('app-page-button') as any[];
    let itemFound = undefined;
    buttons.forEach(item => {
      if (item.innerText.indexOf(restartButtonText) > -1)
        itemFound = item;
    })
    expect(!itemFound).toBeFalse();
  });

  it('Restart button should fired', fakeAsync(() => {
    spyOn(component, 'restart');
    const buttons = fixture.nativeElement.querySelectorAll('ion-button') as any[]
    let index = -1;

    for(let i = 0; i < buttons.length; i++) {
      if (buttons[i].innerText.indexOf(restartButtonText) > -1)
        index = i;
    }

    expect(index > -1).toBeTrue();
    if (index > -1) {
      buttons[index].dispatchEvent(new Event('click'));
      tick();

      fixture.detectChanges();
    }
    expect(component.restart).toHaveBeenCalled();
  }));

  it('Restart function should work', () => {
    component.restart();
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('app-page-button') as any[];
    let itemFound = undefined;
    buttons.forEach(item => {
      if (item.innerText.indexOf(buyButtonText) > -1) // Buy button is not display.
        itemFound = item;
    })
    expect(fixture.nativeElement.innerHTML.indexOf('Merged pull requests: 0') > -1).toBeTrue();
    expect(itemFound == undefined).toBeTrue();
  });

  it('Ranking button should create', () => {
    const buttons = fixture.nativeElement.querySelectorAll('app-page-button') as any[];
    let itemFound = undefined;
    buttons.forEach(item => {
      if (item.innerText.indexOf(rankingButtonText) > -1)
        itemFound = item;
    })
    expect(!itemFound).toBeFalse();
  });
});
