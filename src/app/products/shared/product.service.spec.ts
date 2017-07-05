import { TestBed, inject } from '@angular/core/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { ApiService } from '../../shared/services';
import * as testingModels from '../../shared/testing/models';

describe('Service: ProductService', () => {
  let service: ProductService = null;
  let backend: MockBackend = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        ProductService,
        ApiService
      ]
    });
  });

  beforeEach(inject([ProductService, MockBackend], (productService: ProductService, mockBackend: MockBackend) => {
    service = productService;
    backend = mockBackend;
  }));

  it('should call the load api and return the modified products', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify(testingModels.rawProductsData)
      });
      connection.mockRespond(new Response(options));
      expect(connection.request.method).toEqual(RequestMethod.Get);
      expect(connection.request.url).toEqual(`/assets/json/products.json`);
    });

    service
      .loadProducts()
      .subscribe((res) => {
        expect(res).toEqual(testingModels.products);
        done();
      });
  });

  it('should retrieve the product from the slug', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify(testingModels.rawProductsData)
      });
      connection.mockRespond(new Response(options));
      expect(connection.request.method).toEqual(RequestMethod.Get);
      expect(connection.request.url).toEqual(`/assets/json/products.json`);
    });

    service
      .loadProductBySlug('blue-stripe-stoneware-plate')
      .subscribe((res) => {
        expect(res).toEqual(testingModels.product1);
        done();
      });
  });

  it('should retrieve the products by product Id array', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify(testingModels.rawProductsData)
      });
      connection.mockRespond(new Response(options));
      expect(connection.request.method).toEqual(RequestMethod.Get);
      expect(connection.request.url).toEqual(`/assets/json/products.json`);
    });

    service
      .loadProductsByProudctIds([1, 2])
      .subscribe((res) => {
        expect(res).toEqual(testingModels.products);
        done();
      });
  });

});
