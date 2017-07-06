import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { By } from '@angular/platform-browser';

import { CategoryComponent } from './category.component';
import { SfCurrencyPipe } from '../../shared/sf-currency.pipe';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { ProductCardComponent } from '../product/product-card/product-card.component';
import * as testingModels from '../../shared/testing/models';

describe('Component: CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryComponent,
        ProductCardComponent,
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
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
    component.loading$ = of(false);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    const store = TestBed.get(Store);
    expect(store.dispatch).toHaveBeenCalled();
  });


  it('should show 2 product card once model is loaded', () => {
    component.products$ = of(testingModels.products)
    expect(component).toBeTruthy();
    fixture.detectChanges();
    expect(de.queryAll(By.css('.product-card')).length).toBe(2);
  });

});
