import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../shared/services';
import { Product } from './product.model';
// import { HqToolActions } from './hq-tool.actions';

@Injectable()
export class ProductService {

  private static MASTER = 0;
  private static SITES = 1;
  private static FAVORITE = 2;

  constructor(private api: ApiService,
    // private hqToolActions: HqToolActions
  ) {
  }

  loadProducts(): Observable<Product[]> {
    return this.api.get('/products.json')
      .catch((err, caught) => Observable.throw(err))
      .map(products => this.addData(products));
  }

  /**
   * assign id and slug for each product, for easier identify them
   * also add prefix url for product image
   * @param products
   */
  private addData(products: Product[]): Product[] {
    // use this dict to avoid duplicate product slug
    const productSlugs = [];

    products.forEach(product => {
      product.id = ++Product.counter;
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

  private slugify(text: string): string {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }

}
