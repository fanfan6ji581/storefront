import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';

import { CategoryComponent } from './category.component';
import { SfCurrencyPipe } from '../../shared/sf-currency.pipe';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { ProductCardComponent } from '../product/product-card/product-card.component';
import { reducer } from '../../shared/root.reducers';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryComponent,
        ProductCardComponent,
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
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
