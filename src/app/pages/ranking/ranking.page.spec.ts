import { ScrollingModule } from '@angular/cdk/scrolling';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { UiComponentsModule } from 'src/app/ui-controls/components/ui-components.module';

import { RankingPage } from './ranking.page';

describe('RankingPage', () => {
  let component: RankingPage;
  let fixture: ComponentFixture<RankingPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingPage ],
      imports: [UiComponentsModule, ScrollingModule, IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RankingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
