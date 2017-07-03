import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../shared/root.reducers';
import * as product from './shared/product.actions';
import { Product } from '../shared/product.model';

@Component({
  selector: 'sf-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product$: Observable<Product>;
  product: Product;
  quantity: number = 1;

  constructor(private route: ActivatedRoute, private store: Store<fromRoot.State>) {
    this.product$ = store.select(fromRoot.getProductSelect);
    this.product$.subscribe(p => this.product = p);
  }

  ngOnInit() {
    // load product by params slug
    if (!this.product) {
      this.route.params.subscribe(params => {
        // get product by slug
        this.store.dispatch(new product.SelectAction(params['slug']));
      });
    }
  }

  onQuantityChange(quantity: number) {
    if (typeof quantity === 'number') {
      this.quantity = quantity;
    }
  }

}
