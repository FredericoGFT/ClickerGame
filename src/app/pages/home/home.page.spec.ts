import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { PageButtonComponent } from 'src/app/ui-controls/page-button/page-button.component';
import { HeaderComponent } from 'src/app/ui-controls/header/header.component';
import { UiComponentsModule } from 'src/app/ui-controls/ui-components.module';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let headerComponent: HeaderComponent;
  let fixtureHeaderComponent: ComponentFixture<HeaderComponent>;
  let buttonComponent: PageButtonComponent;
  let fixtureButtonComponent: ComponentFixture<PageButtonComponent>;
  const title = 'Login';
  const buttonText = 'JOIN';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [ReactiveFormsModule, UiComponentsModule, IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    fixtureHeaderComponent = TestBed.createComponent(HeaderComponent);
    fixtureButtonComponent = TestBed.createComponent(PageButtonComponent);
    component = fixture.componentInstance;
    headerComponent = fixtureHeaderComponent.componentInstance;
    headerComponent.title = title;
    buttonComponent = fixtureButtonComponent.componentInstance;
    buttonComponent.text = buttonText;
    buttonComponent.submitForm = true;
    fixture.detectChanges();
    fixtureHeaderComponent.detectChanges();
    fixtureButtonComponent.detectChanges();
  }));

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Component header has title', () => {
    expect(headerComponent).toBeTruthy();
    const compiledHeader = fixtureHeaderComponent.debugElement.nativeElement;
    expect(compiledHeader.innerHTML).toContain(title);
  });

  it('Name label should create', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.innerHTML).toContain("Name*");
  });

  it('Input required validation should fired', () => {
    component.formData.controls['name'].markAsTouched();
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', null);
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.innerHTML).toContain('Name is required.');
  });

  it('Input min validation should fired', () => {
    component.formData.controls['name'].setValue('z');
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', null);
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.innerHTML).toContain('Name should be min 2 chars long.');
  });

  it('Submit button should create', () => {
    const compiledButton = fixtureButtonComponent.debugElement.nativeElement;
    expect(compiledButton.innerHTML).toContain(buttonText);
    expect(compiledButton.innerHTML).toContain('type="submit"');
  });
});
