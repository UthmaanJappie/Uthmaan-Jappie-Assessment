import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideContactNavbarComponent } from './side-contact-navbar.component';

describe('SideContactNavbarComponent', () => {
  let component: SideContactNavbarComponent;
  let fixture: ComponentFixture<SideContactNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideContactNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideContactNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
