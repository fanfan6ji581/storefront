import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sf-quantity-picker',
  templateUrl: './quantity-picker.component.html',
  styleUrls: ['./quantity-picker.component.scss']
})
export class QuantityPickerComponent implements OnInit {
  @Output() change: EventEmitter<number> = new EventEmitter<number>();
  @Input() quantity = 0;

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

  onChange() {
    if (this.quantity < 1) {
      this.quantity = 1;
    }
    this.change.emit(this.quantity);
  }
}
