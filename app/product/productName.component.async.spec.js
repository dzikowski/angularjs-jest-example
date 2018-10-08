import angularTestApp from '../../test/angularTestApp';
import ProductModule from './product.module';
import { products } from '../dataMocks';

const [product] = products;

describe('productName.component', () => {
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
});
