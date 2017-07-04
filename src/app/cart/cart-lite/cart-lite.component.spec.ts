import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartLiteComponent } from './cart-lite.component';

describe('CartLiteComponent', () => {
  let component: CartLiteComponent;
  let fixture: ComponentFixture<CartLiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartLiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartLiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
