import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityPickerComponent } from './quantity-picker.component';
import { FormsModule } from '@angular/forms';

describe('QuantityPickerComponent', () => {
  let component: QuantityPickerComponent;
  let fixture: ComponentFixture<QuantityPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuantityPickerComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
