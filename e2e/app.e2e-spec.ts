import { StorefrontPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('storefront App', () => {
  let page: StorefrontPage;

  beforeEach(() => {
    page = new StorefrontPage();
  });

  it('should show notification when click add to cart', () => {
    page.navigateTo();

    const productCartImg = element(by.css('sf-root sf-product-card .product-card-cover'));
    // const btn = element(by.css('sf-root sf-product-card .actions .btn-primary'));
    browser.actions().mouseMove(productCartImg).perform();
    browser.wait(element(by.css('sf-root sf-product-card .btn-primary')).isPresent);

    // const btn = page.getFirstProductAddToCartBtn();
    // btn.click();
    // debugger
    // browser.wait(() => {
      let notification = page.getSuccessNotification();
      expect(notification.isPresent()).toBeTruthy();
    // }, 1000);
  });

  // it('should show navigate to another page', () => {
  //   // page.navigateTo();
  //   // const btn = page.getFirstProductGoToDetailBtn();
  //   // btn.click();
  //   // browser.wait(() => {
  //   //   let notification = page.getSuccessNotification();
  //   //   browser.getCurrentUrl().then(url => {
  //   //     expect(url.indexOf('product') != -1).toBeTruthy();
  //   //   });
  //   // }, 1000);
  // });

  // it('should display page title', () => {
  //   page.navigateTo();
  //   page.getTitle().then(text => expect(text).toEqual('Plates'));
  // });

  // it('should display 6 products', () => {
  //   page.navigateTo();
  //   page.getProductCardsCount().then((size: number) => expect(size).toEqual(6));
  // });



});
