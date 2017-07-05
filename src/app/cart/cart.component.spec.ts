import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';

import { CartComponent } from './cart.component';
import { SfCurrencyPipe } from '../shared/sf-currency.pipe';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { QuantityPickerComponent } from '../shared/quantity-picker/quantity-picker.component';
import { reducer } from '../shared/root.reducers';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CartComponent,
        SfCurrencyPipe,
        SpinnerComponent,
        QuantityPickerComponent,
      ],
      imports: [
        RouterTestingModule,
        FormsModule,
        StoreModule.provideStore(reducer),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
