import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CartEffects } from './cart.effects';
import { ProductService } from '../../products/shared/product.service';
import { CartService } from './cart.service';
import { Product } from '../../products/shared/product.model';
import { CartItem } from './cart-item.model';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as cartActions from './cart.actions';

describe('CartEffects', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            EffectsTestingModule
        ],
        providers: [
            CartEffects,
            {
                provide: ProductService,
                useValue: jasmine.createSpyObj('ProductService', ['loadProductsByProudctIds'])
            },
            {
                provide: CartService,
                useValue: jasmine.createSpyObj('CartService', ['saveToStorage', 'loadFromStorage'])
            },
            {
                provide: ToastsManager,
                useValue: jasmine.createSpyObj('ToastsManager', ['success'])
            },
        ]
    }));

    function setup(params?: { loadProductByIdReturnValue?: any, loadFromStorageReturnValue?: any }) {
        const cartService = TestBed.get(CartService);
        const productService = TestBed.get(ProductService);
        const toastr = TestBed.get(ToastsManager);

        cartService.saveToStorage.and.returnValue(null);
        toastr.success.and.returnValue(new Promise<any>(() => { }));

        if (params) {
            if (params.loadProductByIdReturnValue) {
                productService.loadProductsByProudctIds.and.returnValue(params.loadProductByIdReturnValue);
            }

            if (params.loadFromStorageReturnValue) {
                cartService.loadFromStorage.and.returnValue(params.loadFromStorageReturnValue);
            }
        }

        return {
            toastr,
            runner: TestBed.get(EffectsRunner),
            cartEffects: TestBed.get(CartEffects)
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

    const localStorageProducts = [
        {
            productId: 1,
            quantity: 1
        },
        {
            productId: 2,
            quantity: 2
        }
    ];

    const cartItems = [
        {
            productId: 1,
            product: products[0],
            quantity: 1
        },
        {
            productId: 2,
            product: products[1],
            quantity: 2
        }
    ];

    describe('load$', () => {
        it('should return a cart items with product infomation in it with cartLoadAction', fakeAsync(() => {
            const { toastr, runner, cartEffects } = setup({
                loadProductByIdReturnValue: Observable.of(products),
                loadFromStorageReturnValue: localStorageProducts
            });

            const expectedResult = new cartActions.LoadSuccessAction(cartItems);
            runner.queue(new cartActions.LoadAction());

            let result = null;
            cartEffects.load$.subscribe(_result => result = _result);

            expect(result).toEqual(expectedResult);
        }));
    });

    describe('add$', () => {
        it('should call toast service success() method', fakeAsync(() => {
            const { toastr, runner, cartEffects } = setup({
                loadProductByIdReturnValue: Observable.of(products),
                loadFromStorageReturnValue: localStorageProducts
            });

            runner.queue(new cartActions.AddAction(cartItems[0]));

            cartEffects.add$.subscribe(_result => {
                expect(toastr.success).toHaveBeenCalled();
            });

        }));
    });

});
