import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PageButtonComponent } from './page-button.component';

describe('PageButtonComponent', () => {
  let component: PageButtonComponent;
  let fixture: ComponentFixture<PageButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageButtonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PageButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit on click', () => {
    spyOn(component.clickEvent, 'emit');
    const button = fixture.nativeElement.querySelector('ion-button');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.clickEvent.emit).toHaveBeenCalled();
 });
});
