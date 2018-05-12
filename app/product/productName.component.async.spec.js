import angularTestApp from '../../test/angularTestApp';
import ProductModule from './product.module';

const product = { id: 'P-1', name: 'Copper wire 0.6 mm', unitId: 'U-1' };

// works
const ProductServiceMock = ($q) => ({
  getProduct(productId) {
    return $q((resolve) => resolve(productId === product.id ? product : undefined));
  },
});

// does not work -- setTimeout escapes event loop
const ProductServiceMock2 = ($q) => ({
  getProduct(productId) {
    return $q((resolve) => setTimeout(() => resolve(productId === product.id ? product : undefined)));
  },
});

// works
const ProductServiceMock3 = () => ({
  getProduct(productId) {
    return Promise.resolve(productId === product.id ? product : undefined);
  },
});

// works
const ProductServiceMock4 = () => ({
  getProduct(productId) {
    return new Promise((resolve) => resolve(productId === product.id ? product : undefined));
  },
});

// does not work -- setTimeout escapes event loop
const ProductServiceMock5 = () => ({
  getProduct(productId) {
    return new Promise((resolve) => setTimeout(() => resolve(productId === product.id ? product : undefined)));
  },
});

describe('productName.component', () => {
  let testApp;

  beforeEach(() => {
    testApp = angularTestApp(ProductModule)({ ProductService: ($q) => ProductServiceMock($q) });
  });

  it('should render product name', async () => {
    expect.assertions(1);
    const element = await testApp.render(`<product-name product-id="'${product.id}'" />`);
    expect(element.html()).toContain(product.name);
  });
});
