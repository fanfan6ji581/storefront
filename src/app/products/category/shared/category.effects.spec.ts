import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CategoryEffects } from './category.effects';
import { ProductService } from '../../shared/product.service';
import { Product } from '../../shared/product.model';
import { Observable } from 'rxjs/Observable';
import * as categoryActions from './category.actions';

describe('CategoryEffects', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            EffectsTestingModule
        ],
        providers: [
            CategoryEffects,
            {
                provide: ProductService,
                useValue: jasmine.createSpyObj('ProductService', ['loadProducts'])
            }
        ]
    }));

    function setup(params?: { loadProductsReturnValue: any }) {
        const categoryService = TestBed.get(ProductService);
        if (params) {
            categoryService.loadProducts.and.returnValue(params.loadProductsReturnValue);
        }

        return {
            runner: TestBed.get(EffectsRunner),
            categoryEffects: TestBed.get(CategoryEffects)
        };
    }

    const products = [
        {
            'id': 1,
            'title': 'Blue Stripe Stoneware Plate',
            'brand': 'Kiriko',
            'price': 40,
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget.',
            'image': 'blue-stripe-stoneware-plate.jpg',
            'slug': 'blue-stripe-stoneware-plate'
        } as Product,
        {
            'id': 2,
            'title': 'Hand Painted Blue Flat Dish',
            'brand': 'Kiriko',
            'price': 28,
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget arcu. Curabitur ac pharetra nisl, sit amet mattis dolor.',
            'image': 'hand-painted-blue-flat-dish.jpg',
            'slug': 'blue-stripe-stoneware-plate'
        } as Product
    ]

    describe('load$', () => {
        it('should return a new categoryActions.LoadAction, with all products, on success', fakeAsync(() => {
            const { runner, categoryEffects } = setup({ loadProductsReturnValue: Observable.of(products) });

            const expectedResult = new categoryActions.LoadSuccessAction(products);
            runner.queue(new categoryActions.LoadAction());

            let result = null;
            categoryEffects.load$.subscribe(_result => result = _result);

            expect(result).toEqual(expectedResult);
        }));

        it('should return a new category.LoadFailAction, with an error object, if the product service throws', fakeAsync(() => {
            const err = new Error();
            const { runner, categoryEffects } = setup({ loadProductsReturnValue: Observable.throw(err) });

            const expectedResult = new categoryActions.LoadFailAction(err);
            runner.queue(new categoryActions.LoadAction());

            let result = null;
            categoryEffects.load$.subscribe(_result => result = _result);
            expect(result).toEqual(expectedResult);
        }));
    });
});

