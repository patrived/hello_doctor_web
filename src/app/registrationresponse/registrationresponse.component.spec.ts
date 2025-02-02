import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationresponseComponent } from './registrationresponse.component';

describe('RegistrationresponseComponent', () => {
  let component: RegistrationresponseComponent;
  let fixture: ComponentFixture<RegistrationresponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationresponseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationresponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
