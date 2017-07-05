import { browser, by, element, ExpectedConditions } from 'protractor';

export class StorefrontPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return element(by.css('sf-root h1')).getText();
  }

  getProductCardsCount() {
    return element.all(by.css('sf-root sf-product-card')).count();
  }

  getFirstProductGoToDetailBtn() {
    const productCartImg = element(by.css('sf-root sf-product-card .product-card-cover'));
    const btn = element(by.css('sf-root sf-product-card .actions .btn-primary'));
    browser.actions().mouseMove(productCartImg).perform();
    browser.wait(ExpectedConditions.visibilityOf(btn), 5000);
    return btn;
  }

  getFirstProductAddToCartBtn() {
    const productCartImg = element(by.css('sf-root sf-product-card .product-card-cover'));
    browser.actions().mouseMove(productCartImg).perform();
    browser.sleep(100);
    return element(by.css('sf-root sf-product-card .actions .btn-inverse'));
  }

  getSuccessNotification() {
    browser.getCurrentUrl()
    debugger
    return element(by.css('toast-container #toast-container .toast'));
  }

}
