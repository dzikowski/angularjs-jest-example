import angularTestApp from '../../test/angularTestApp';
import ProductModule from './product.module';
import { products } from '../dataMocks';
import { ProductServicePromise } from '../serviceMocks';

describe('productName.component', () => {
  const [product] = products;

  it('should render product name with service based on `$q`', () => {
    const ProductService = ($q) => ({
      getProduct: () => $q((resolve) => resolve(product)),
    });
    const testApp = angularTestApp(ProductModule)({ ProductService: ($q) => ProductService($q) });

    const element = testApp.render(`<product-name product-id="'${product.id}'" />`);
    expect(element.html()).toContain(product.name);
  });

  it('should NOT render product name with service based on `new Promise`', () => {
    const ProductService = () => ({
      getProduct: () => new Promise((resolve) => resolve(product)),
    });
    const testApp = angularTestApp(ProductModule)({ ProductService: ($q) => ProductService($q) });

    const element = testApp.render(`<product-name product-id="'${product.id}'" />`);
    expect(element.html()).toContain('Unknown product');
  });

  it('should NOT render product name with service based on `Promise.resolve`', () => {
    const ProductService = () => ({
      getProduct: () => Promise.resolve(product),
    });
    const testApp = angularTestApp(ProductModule)({ ProductService: ($q) => ProductService($q) });

    const element = testApp.render(`<product-name product-id="'${product.id}'" />`);
    expect(element.html()).toContain('Unknown product');
  });

  it('should NOT render product name with service based on `$q` with setTimeout', () => {
    const ProductService = ($q) => ({
      getProduct: () => $q((resolve) => setTimeout(() => resolve(product))),
    });
    const testApp = angularTestApp(ProductModule)({ ProductService: ($q) => ProductService($q) });

    const element = testApp.render(`<product-name product-id="'${product.id}'" />`);
    expect(element.html()).toContain('Unknown product');
  });

  it('should render "Unknown product" and then product name with service based on Promise', async () => {
    const testApp = angularTestApp(ProductModule)({ ProductService: () => ProductServicePromise() });
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
