import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';

import { HeaderComponent } from './header.component';
import { SfCurrencyPipe } from '../../shared/sf-currency.pipe';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { CartLiteComponent } from '../../cart/cart-lite/cart-lite.component';
import { reducer } from '../../shared/root.reducers';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

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
        StoreModule.provideStore(reducer),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
