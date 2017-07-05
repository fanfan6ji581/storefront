import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { ProductComponent } from './product.component';
import { SfCurrencyPipe } from '../../shared/sf-currency.pipe';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { QuantityPickerComponent } from '../../shared/quantity-picker/quantity-picker.component';
import { reducer } from '../../shared/root.reducers';
import { Product } from '../shared/product.model';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

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

  const product = {
    'id': 1,
    'title': 'Blue Stripe Stoneware Plate',
    'brand': 'Kiriko',
    'price': 40,
    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget.',
    'image': '/assets/images/blue-stripe-stoneware-plate.jpg',
    'slug': 'blue-stripe-stoneware-plate'
  } as Product;


  beforeEach(() => {
    setup({ storeSelectReturnValue: of(product) });
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
