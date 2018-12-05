import angularTestApp from '../../test/angularTestApp';
import ProductModule from './product.module';
import { products } from '../dataMocks';
import { ProductServicePromise } from '../serviceMocks';

describe('productName.component', () => {
  const [product] = products;

  const getTestAppWithProductService = (ProductService) => angularTestApp({
    modules: [ProductModule],
    mocks: { ProductService },
  });

  it('should render product name with service based on `$q`', () => {
    const testApp = getTestAppWithProductService(($q) => ({
      getProduct: () => $q((resolve) => resolve(product)),
    }));

    const element = testApp.render(`<product-name product-id="'${product.id}'" />`);
    expect(element.html()).toContain(product.name);
  });

  it('should NOT render product name with service based on `new Promise`', () => {
    const testApp = getTestAppWithProductService(() => ({
      getProduct: () => new Promise((resolve) => resolve(product)),
    }));

    const element = testApp.render(`<product-name product-id="'${product.id}'" />`);
    expect(element.html()).toContain('Unknown product');
  });

  it('should NOT render product name with service based on `Promise.resolve`', () => {
    const testApp = getTestAppWithProductService(() => ({
      getProduct: () => Promise.resolve(product),
    }));

    const element = testApp.render(`<product-name product-id="'${product.id}'" />`);
    expect(element.html()).toContain('Unknown product');
  });

  it('should NOT render product name with service based on `$q` with setTimeout', () => {
    const testApp = getTestAppWithProductService(($q) => ({
      getProduct: () => $q((resolve) => setTimeout(() => resolve(product))),
    }));

    const element = testApp.render(`<product-name product-id="'${product.id}'" />`);
    expect(element.html()).toContain('Unknown product');
  });

  it('should render "Unknown product" and then product name with service based on Promise', async () => {
    const testApp = getTestAppWithProductService(() => ProductServicePromise());
    const element = testApp.render(`<product-name product-id="'${product.id}'" />`);

    await testApp.eventually(() => {
      expect(element.html()).toContain('Unknown product');
      expect(element.html()).toContain(product.id);
    });

    await testApp.eventually(() => {
      expect(element.html()).toContain(product.name);
    });
  });
});
