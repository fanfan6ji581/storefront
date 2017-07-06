import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { QuantityPickerComponent } from './quantity-picker.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('Component: QuantityPickerComponent', () => {
  let component: QuantityPickerComponent;
  let fixture: ComponentFixture<QuantityPickerComponent>;
  let de: DebugElement;

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
    de = fixture.debugElement;
    spyOn(component.change, 'emit');
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger quantity plus when click + btn', () => {
    const plusBtnEl = de.query(By.css('.qp-actions a'));
    plusBtnEl.triggerEventHandler('click', null);
    expect(component.change.emit).toHaveBeenCalledWith(2);
  });

  it('should trigger quantity minus when click - btn', () => {
    component.quantity = 3;
    const minusBtnEl = de.query(By.css('.qp-actions a:nth-child(2)'));
    minusBtnEl.triggerEventHandler('click', null);
    expect(component.change.emit).toHaveBeenCalledWith(2);
  });

  it('should keep min number 1 if quantity below 1', () => {
    component.quantity = 0;
    const minusBtnEl = de.query(By.css('.qp-actions a:nth-child(2)'));
    minusBtnEl.triggerEventHandler('click', null);
    expect(component.change.emit).toHaveBeenCalledWith(1);
  });
});
