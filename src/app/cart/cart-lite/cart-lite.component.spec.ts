import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { By } from '@angular/platform-browser';

import { CartLiteComponent } from './cart-lite.component';
import { SfCurrencyPipe } from '../../shared/sf-currency.pipe';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { reducer } from '../../shared/root.reducers';
import * as testingModels from '../../shared/testing/models';
import * as cartActions from '../shared/cart.actions';

describe('CartLiteComponent', () => {
  let component: CartLiteComponent;
  let fixture: ComponentFixture<CartLiteComponent>;
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
        CartLiteComponent,
        SfCurrencyPipe,
        SpinnerComponent,
      ],
      imports: [
        RouterTestingModule,
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
    fixture = TestBed.createComponent(CartLiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
    component.loading$ = of(false);
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
    expect(de.queryAll(By.css('.product-cover-img')).length).toBe(2);
  });

    it('should trigger delete cart when click delete', () => {
    component.cartItems = testingModels.cartItems;
    fixture.detectChanges();

    const deleteBtnEl = fixture.debugElement.query(By.css('.cartitem-cta'));
    deleteBtnEl.triggerEventHandler('click', null);

    const store = TestBed.get(Store);
    expect(store.dispatch).toHaveBeenCalledWith(new cartActions.DeleteAction(testingModels.product1.id));
  });
});
