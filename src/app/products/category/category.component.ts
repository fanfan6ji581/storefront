import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Product } from '../shared/product.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../shared/root.reducers';
import * as product from '../shared/product.actions';

@Component({
  selector: 'sf-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  products$: Observable<Product[]>;
  products: Product[];

  constructor(private store: Store<fromRoot.State>) {
    // store.select(state => state.products.products).subscribe(n => this.products = n);

    this.products$ = store.select(fromRoot.getProductsProducts);
    // this.products$.subscribe(products => this.products = products);
  }

  ngOnInit() {
    this.store.dispatch(new product.LoadAction());
  }
}
