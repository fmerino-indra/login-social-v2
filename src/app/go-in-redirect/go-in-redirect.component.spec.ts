import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoInRedirectComponent } from './go-in-redirect.component';

describe('GoInRedirectComponent', () => {
  let component: GoInRedirectComponent;
  let fixture: ComponentFixture<GoInRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoInRedirectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoInRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
