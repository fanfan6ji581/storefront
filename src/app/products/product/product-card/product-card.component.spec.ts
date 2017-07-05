import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';

import { ProductCardComponent } from './product-card.component';
import { SfCurrencyPipe } from '../../../shared/sf-currency.pipe';
import { reducer } from '../../../shared/root.reducers';
import { Product } from '../../shared/product.model';
import { CartItem } from '../../../cart/shared/cart-item.model';
import * as cartActions from '../../../cart/shared/cart.actions';
import * as testingModels from '../../../shared/testing/models';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductCardComponent,
        SfCurrencyPipe,
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
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = testingModels.product1;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display different title if model changed', () => {
    component.product = testingModels.product2;
    fixture.detectChanges();
    const titltEl = fixture.debugElement.query(By.css('h5')).nativeElement;
    expect(titltEl.textContent).toContain(testingModels.product2.title);
  });

  it('should trigger add_to_cart action when click add_to_cart button', () => {
    fixture.detectChanges();
    const btnEl = fixture.debugElement.query(By.css('.actions .btn-inverse'));
    btnEl.triggerEventHandler('click', null);
    const store = TestBed.get(Store);
    expect(store.dispatch).toHaveBeenCalledWith(new cartActions.AddAction(new CartItem(testingModels.product1, 1)));
  });

});
