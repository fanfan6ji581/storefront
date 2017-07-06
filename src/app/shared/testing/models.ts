import { Product } from '../../products/shared/product.model';
import { CartItem } from '../../cart/shared/cart-item.model';

export const rawProductsData = [
  {
    'title': 'Blue Stripe Stoneware Plate',
    'brand': 'Kiriko',
    'price': 40,
    'description': 'Lorem ipsum dolor sit amet',
    'image': 'blue-stripe-stoneware-plate.jpg'
  },
  {
    'title': 'Hand Painted Blue Flat Dish',
    'brand': 'Kiriko',
    'price': 28,
    'description': 'Lorem ipsum dolor sit amet',
    'image': 'hand-painted-blue-flat-dish.jpg'
  }
];

export const product1 = {
  'id': 1,
  'title': 'Blue Stripe Stoneware Plate',
  'brand': 'Kiriko',
  'price': 40,
  'description': 'Lorem ipsum dolor sit amet',
  'image': '/assets/images/blue-stripe-stoneware-plate.jpg',
  'slug': 'blue-stripe-stoneware-plate'
} as Product;

export const product2 = {
  'id': 2,
  'title': 'Hand Painted Blue Flat Dish',
  'brand': 'Kiriko',
  'price': 28,
  'description': 'Lorem ipsum dolor sit amet',
  'image': '/assets/images/hand-painted-blue-flat-dish.jpg',
  'slug': 'hand-painted-blue-flat-dish'
} as Product;

export const products = [product1, product2];

export const cartItem1 = new CartItem(product1, 1);
export const cartItem2 = new CartItem(product2, 2);
export const cartItems = [cartItem1, cartItem2];
