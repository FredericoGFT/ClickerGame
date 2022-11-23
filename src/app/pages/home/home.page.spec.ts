import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/ui-controls/components/header/header.component';
import { UiComponentsModule } from 'src/app/ui-controls/components/ui-components.module';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let headerComponent: HeaderComponent;
  let fixtureHeaderComponent: ComponentFixture<HeaderComponent>;
  const title = 'Login';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [ReactiveFormsModule, UiComponentsModule, IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
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

  fit('Component header has title', () => {
    expect(headerComponent).toBeTruthy();
    const compiledFA = fixtureHeaderComponent.debugElement.nativeElement;
    expect(compiledFA.innerHTML).toContain(title);
  });

  it('Name label should create', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.innerHTML).toContain("Name*");
  });
});
