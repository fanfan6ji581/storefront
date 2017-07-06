import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sf-quantity-picker',
  templateUrl: './quantity-picker.component.html',
})
export class QuantityPickerComponent implements OnInit {
  @Output() change: EventEmitter<number> = new EventEmitter<number>();
  @Input() quantity = 1;

  constructor() { }

  ngOnInit() {
  }

  increment() {
    this.quantity++;
    this.onChange();
  }

  decrement() {
    this.quantity--;
    this.onChange();
  }

  /**
   * validate quantity cannot go below 1
   */
  onChange() {
    if (this.quantity < 1) {
      this.quantity = 1;
    }
    this.change.emit(this.quantity);
  }
}
