import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import * as product from './product.actions';
import { ProductService } from './product.service';
import { Product } from './product.model';


@Injectable()
export class ProductEffects {

    @Effect()
    search$: Observable<Action> = this.actions$
        .ofType(product.LOAD)
        .switchMap(() => this.productService.loadProducts()
            .map((products: Product[]) => new product.LoadSuccessAction(products))
            .catch(error => of(new product.LoadFailAction(error))));

    constructor(private actions$: Actions, private productService: ProductService) { }
}
