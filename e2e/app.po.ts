import { browser, by, element, ExpectedConditions } from 'protractor';

export class CategoryPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return element(by.css('sf-category h1')).getText();
  }

  getProductCards() {
    return element.all(by.css('sf-category sf-product-card'));
  }
}

export class ProductPage {
  navigateTo() {
    return browser.get('/#/product/blue-stripe-stoneware-plate');
  }

  getTitle() {
    return element(by.css('sf-product h1')).getText();
  }

  getAddToCartBtn() {
    return element(by.css('sf-product .btn-primary'));
  }

  getSuccessNotification() {
    return element(by.css('toast-container #toast-container .toast'));
  }
}


export class CartPage {
  navigateTo() {
    return browser.get('/#/cart');
  }

  getTitle() {
    return element(by.css('sf-cart h1')).getText();
  }

  getEmptyCartMsg() {
    return element(by.css('sf-cart h4')).getText();
  }

  getCartItemCount() {
    return element.all(by.css('sf-cart .product-cover-img')).count();
  }

  getFirstCartItemDeleteBtn() {
    return element(by.css('sf-cart .cartitem-cta'));
  }

}
