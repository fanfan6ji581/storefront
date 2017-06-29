import { StorefrontPage } from './app.po';

describe('storefront App', () => {
  let page: StorefrontPage;

  beforeEach(() => {
    page = new StorefrontPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to sf!!');
  });
});
