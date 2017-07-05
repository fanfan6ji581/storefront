import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { StoreModule, Store } from '@ngrx/store';
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
        StoreModule.provideStore(reducer),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
