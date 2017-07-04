import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../shared/root.reducers';
import * as category from './shared/category.actions';
import { Product } from '../shared/product.model';

@Component({
  selector: 'sf-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  products$: Observable<Product[]>;
  loading$: Observable<Boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.products$ = store.select(fromRoot.getCategoryProducts);
    this.loading$ = store.select(fromRoot.getCategoryLoading);
  }

  ngOnInit() {
    this.store.dispatch(new category.LoadAction());
  }
}
