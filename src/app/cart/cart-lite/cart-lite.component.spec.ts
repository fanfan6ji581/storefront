import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';

import { CartLiteComponent } from './cart-lite.component';
import { SfCurrencyPipe } from '../../shared/sf-currency.pipe';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { reducer } from '../../shared/root.reducers';

describe('CartLiteComponent', () => {
  let component: CartLiteComponent;
  let fixture: ComponentFixture<CartLiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CartLiteComponent,
        SfCurrencyPipe,
        SpinnerComponent,
      ],
      imports: [
        RouterTestingModule,
        StoreModule.provideStore(reducer),
      ]
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
