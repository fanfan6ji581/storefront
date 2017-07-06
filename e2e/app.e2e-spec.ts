import { CategoryPage, ProductPage, CartPage } from './app.po';

describe('category page', () => {
  let page: CategoryPage;

  beforeEach(() => {
    page = new CategoryPage();
  });

  it('should display page title', () => {
    page.navigateTo();
    page.getTitle().then(text => expect(text).toEqual('Plates'));
  });

  it('should display 6 products', () => {
    page.navigateTo();
    page.getProductCards().count().then((size: number) => expect(size).toEqual(6));
  });
});

describe('product page', () => {
  let page: ProductPage;

  beforeEach(() => {
    page = new ProductPage();
  });

  it('should display page title', () => {
    page.navigateTo();
    page.getTitle().then(text => expect(text).toEqual('Blue Stripe Stoneware Plate'));
  });
});


describe('cart page', () => {
  let page: CartPage;

  beforeEach(() => {
    page = new CartPage();
  });

  it('should display page title', () => {
    page.navigateTo();
    page.getTitle().then(text => expect(text).toEqual('Shopping Cart'));
  });

  it('should display empty cart msg title', () => {
    page.navigateTo();
    page.getEmptyCartMsg().then(text => expect(text).toEqual('Empty Shopping Cart'));
  });
});

describe('add to cart workflow', () => {
  let productPage: ProductPage;
  let cartPage: CartPage;

  beforeEach(() => {
    productPage = new ProductPage();
    cartPage = new CartPage();
  });

  it('when add product to cart, cart page should display it', () => {

    // goto productPage and click AddToCart
    productPage.navigateTo();
    const btn = productPage.getAddToCartBtn();
    btn.click();

    // goto cartPage to verify it
    cartPage.navigateTo();
    cartPage.getCartItemCount().then((size: number) => expect(size).toEqual(1));

    // click delete btn
    const deleteBtn = cartPage.getFirstCartItemDeleteBtn();
    deleteBtn.click();

    // varify empty msg shows
    cartPage.getEmptyCartMsg().then(text => expect(text).toEqual('Empty Shopping Cart'));

  });

});
