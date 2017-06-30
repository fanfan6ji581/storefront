import { Component, OnInit } from '@angular/core';

import { ProductService } from '../shared/product.service';
import { Product } from '../shared/product.model';

@Component({
  selector: 'sf-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  products: Product[];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.loadProducts().subscribe(products => this.products = products);
  }

}
