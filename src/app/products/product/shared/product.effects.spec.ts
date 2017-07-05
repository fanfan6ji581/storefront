import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProductEffects } from './product.effects';
import { ProductService } from '../../shared/product.service';
import { Product } from '../../shared/product.model';
import { Observable } from 'rxjs/Observable';
import * as productActions from './product.actions';

describe('ProductEffects', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            EffectsTestingModule
        ],
        providers: [
            ProductEffects,
            {
                provide: ProductService,
                useValue: jasmine.createSpyObj('ProductService', ['loadProductBySlug'])
            }
        ]
    }));

    function setup(params?: { selectProductReturnValue: any }) {
        const productService = TestBed.get(ProductService);
        if (params) {
            productService.loadProductBySlug.and.returnValue(params.selectProductReturnValue);
        }

        return {
            runner: TestBed.get(EffectsRunner),
            productEffects: TestBed.get(ProductEffects)
        };
    }

    const product = {
        'id': 1,
        'title': 'Blue Stripe Stoneware Plate',
        'brand': 'Kiriko',
        'price': 40,
        'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget.',
        'image': 'blue-stripe-stoneware-plate.jpg',
        'slug': 'blue-stripe-stoneware-plate'
    } as Product;

    describe('select$', () => {
        it('should return a new product.SelectSuccessAction, with the product, on success', fakeAsync(() => {
            const { runner, productEffects } = setup({ selectProductReturnValue: Observable.of(product) });

            const expectedResult = new productActions.SelectSuccessAction(product);
            runner.queue(new productActions.SelectAction('blue-stripe-stoneware-plate'));

            let result = null;
            productEffects.select$.subscribe(_result => result = _result);

            expect(result).toEqual(expectedResult);
        }));

        it('should return a new product.SelectFailAction, with an error object, if the product service throws', fakeAsync(() => {
            const err = new Error();
            const { runner, productEffects } = setup({ selectProductReturnValue: Observable.throw(err) });

            const expectedResult = new productActions.SelectFailAction(err);
            runner.queue(new productActions.SelectAction('blue-stripe-stoneware-plate'));

            let result = null;
            productEffects.select$.subscribe(_result => result = _result);
            expect(result).toEqual(expectedResult);
        }));

    });
});

