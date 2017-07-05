import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';

import { ProductCardComponent } from './product-card.component';
import { SfCurrencyPipe } from '../../../shared/sf-currency.pipe';
import { reducer } from '../../../shared/root.reducers';
import { Product } from '../../shared/product.model';

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
        StoreModule.provideStore(reducer),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = {
      'id': 1,
      'title': 'Blue Stripe Stoneware Plate',
      'brand': 'Kiriko',
      'price': 40,
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget.',
      'image': 'blue-stripe-stoneware-plate.jpg',
      'slug': 'blue-stripe-stoneware-plate'
    } as Product;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
