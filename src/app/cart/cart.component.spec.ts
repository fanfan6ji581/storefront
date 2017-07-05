import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs/observable/of';
import { By } from '@angular/platform-browser';

import { CartComponent } from './cart.component';
import { SfCurrencyPipe } from '../shared/sf-currency.pipe';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { QuantityPickerComponent } from '../shared/quantity-picker/quantity-picker.component';
import { reducer } from '../shared/root.reducers';
import * as testingModels from '../shared/testing/models';
import * as cartActions from './shared/cart.actions';
import { CartItem } from './shared/cart-item.model';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let de: DebugElement;

  function setup(params?: { storeSelectReturnValue: any }) {
    const store = TestBed.get(Store);
    if (params) {
      store.select.and.returnValue(params.storeSelectReturnValue);
    }
    return {
      store,
    };
  }

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
      ],
      providers: [
        {
          provide: Store,
          useValue: jasmine.createSpyObj('Store', ['select', 'dispatch'])
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    setup({ storeSelectReturnValue: of([]) });
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    component.loading$ = of(false);
    fixture.detectChanges();
    de = fixture.debugElement;

  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show empty message', () => {
    component.cartItems$ = of([]);
    fixture.detectChanges();
    const emptyMsgEl = de.query(By.css('h4'));
    expect(emptyMsgEl).toBeTruthy();
  });

  it('should show cart items', () => {
    component.cartItems = testingModels.cartItems;
    fixture.detectChanges();
    const tableEl = de.query(By.css('.responsive-table'));
    expect(tableEl).toBeTruthy();
    expect(de.queryAll(By.css('.responsive-table .product-cover-img')).length).toBe(2);
  });

  it('should trigger delete cart when click delete', () => {
    component.cartItems = testingModels.cartItems;
    fixture.detectChanges();

    const deleteBtnEl = fixture.debugElement.query(By.css('.responsive-table .cartitem-cta'));
    deleteBtnEl.triggerEventHandler('click', null);

    const store = TestBed.get(Store);
    expect(store.dispatch).toHaveBeenCalledWith(new cartActions.DeleteAction(testingModels.product1.id));
  });

  it('should trigger change quantity when click quantity + or - btn', () => {
    component.cartItems = testingModels.cartItems;
    fixture.detectChanges();

    const plusBtnEl = fixture.debugElement.query(By.css('.responsive-table .quantity-picker .qp-actions a'));
    plusBtnEl.triggerEventHandler('click', null);

    const store = TestBed.get(Store);
    expect(store.dispatch).toHaveBeenCalledWith(
      new cartActions.SetValueAction(new CartItem(testingModels.product1, testingModels.cartItems[0].quantity+1)));

    const minusBtnEl = fixture.debugElement.query(By.css('.responsive-table .quantity-picker .qp-actions a:nth-child(2)'));
    minusBtnEl.triggerEventHandler('click', null);

    expect(store.dispatch).toHaveBeenCalledWith(
      new cartActions.SetValueAction(new CartItem(testingModels.product1, testingModels.cartItems[0].quantity)));
  });

});
