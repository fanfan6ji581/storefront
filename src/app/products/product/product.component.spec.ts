import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';
import { By } from '@angular/platform-browser';

import { ProductComponent } from './product.component';
import { SfCurrencyPipe } from '../../shared/sf-currency.pipe';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { QuantityPickerComponent } from '../../shared/quantity-picker/quantity-picker.component';
import { reducer } from '../../shared/root.reducers';
import { Product } from '../shared/product.model';
import { CartItem } from '../../cart/shared/cart-item.model';
import * as testingModels from '../../shared/testing/models';
import * as cartActions from '../../cart/shared/cart.actions';

describe('Component: ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
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
        ProductComponent,
        QuantityPickerComponent,
        SfCurrencyPipe,
        SpinnerComponent,
      ],
      imports: [
        FormsModule,
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
    setup({ storeSelectReturnValue: of(testingModels.product1) });
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
    component.loading$ = of(false);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display different title if model changed', () => {
    component.product = testingModels.product2;
    fixture.detectChanges();
    const titltEl = de.query(By.css('h1')).nativeElement;
    expect(titltEl.textContent).toBe(testingModels.product2.title);
  });

  it('should trigger add correct quantity to shopping cart by clicking + or - btn', () => {
    fixture.detectChanges();

    const plusBtnEl = fixture.debugElement.query(By.css('.quantity-picker .qp-actions a'));
    plusBtnEl.triggerEventHandler('click', null);
    plusBtnEl.triggerEventHandler('click', null);
    plusBtnEl.triggerEventHandler('click', null);

    const minusBtnEl = fixture.debugElement.query(By.css('.quantity-picker .qp-actions a:nth-child(2)'));
    minusBtnEl.triggerEventHandler('click', null);

    const btnEl = fixture.debugElement.query(By.css('.btn-primary'));
    btnEl.triggerEventHandler('click', null);
    const store = TestBed.get(Store);
    expect(store.dispatch).toHaveBeenCalledWith(new cartActions.AddAction(new CartItem(testingModels.product1, 3)));
  });
});
