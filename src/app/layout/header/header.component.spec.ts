import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';

import { HeaderComponent } from './header.component';
import { SfCurrencyPipe } from '../../shared/sf-currency.pipe';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { CartLiteComponent } from '../../cart/cart-lite/cart-lite.component';
import { reducer } from '../../shared/root.reducers';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
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
        HeaderComponent,
        SfCurrencyPipe,
        SpinnerComponent,
        CartLiteComponent,
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
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
