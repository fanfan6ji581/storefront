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

import * as productActions from './product.actions';
import { ProductService } from '../../shared/product.service';
import { Product } from '../../shared/product.model';


@Injectable()
export class ProductEffects {

    @Effect()
    search$: Observable<Action> = this.actions$
        .ofType(productActions.SELECT)
        .map(toPayload)
        .switchMap((slug: string) => this.productService.loadProductBySlug(slug)
            .map((product: Product) => new productActions.SelectSuccessAction(product))
            .catch(error => of(new productActions.SelectFailAction(error))));

    constructor(private actions$: Actions,
        private productService: ProductService) { }
}
