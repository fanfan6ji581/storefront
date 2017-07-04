import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../shared/services';
import { Product } from './product.model';
import * as _ from 'lodash';

@Injectable()
export class ProductService {

  constructor(private api: ApiService) {
  }

  loadProducts(): Observable<Product[]> {
    return this.api.get('/products.json')
      .catch((err, caught) => Observable.throw(err))
      .map(products => this.addData(products));
  }

  /**
   * similar API for get product by slug
   * @param slug
   */
  loadProductBySlug(slug: string): Observable<Product> {
    return this.api.get('/products.json')
      .catch((err, caught) => Observable.throw(err))
      .map(products => this.addData(products))
      .map((products: Product[]) => products.find(product => product.slug === slug));
  }

  /**
   * similar API for get products by product Id array
   * @param productIds
   */
  loadProductsByProudctIds(productIds: number[]): Observable<Product[]> {
    return this.api.get('/products.json')
      .catch((err, caught) => Observable.throw(err))
      .map(products => this.addData(products))
      .map((products: Product[]) => products.filter(product => _.includes(productIds, product.id)));
  }

  /**
   * assign id and slug for each product, for easier identify them
   * also add prefix url for product image
   * @param products
   */
  private addData(products: Product[]): Product[] {
    // use this dict to avoid duplicate product slug
    const productSlugs = [];

    products.forEach((product, index) => {
      product.id = index + 1;
      product.image = `/assets/images/${product.image}`;
      product.slug = this.slugify(product.title);
      // if such title exists, append the id
      if (product.slug in productSlugs) {
        product.slug = `${product.slug}-${product.id}`;
      }
      productSlugs[product.slug] = 1;
    });
    return products;
  }

  /**
   * helper method, convert a string into slug format
   * @param text
   */
  private slugify(text: string): string {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }

}
