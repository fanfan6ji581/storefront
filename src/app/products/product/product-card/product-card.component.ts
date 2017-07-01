import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../shared/root.reducers';
import * as product from '../shared/product.actions';
import { Product } from '../../shared/product.model';

@Component({
  selector: 'sf-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
  }

  onViewDetail() {
    this.store.dispatch(new product.SelectSuccessAction(this.product));
  }

}
