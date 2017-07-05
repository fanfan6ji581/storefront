import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../shared/root.reducers';
import * as category from './shared/category.actions';
import { Product } from '../shared/product.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'sf-category',
  templateUrl: './category.component.html',
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
