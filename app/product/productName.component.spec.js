import angularTestApp from '../../test/angularTestApp';
import ProductModule from './product.module';

const product = { id: 'P-1', name: 'Copper wire 0.6 mm', unitId: 'U-1' };

// Note: in this case simple JS Promise would be enough. I just want to show
// that we have support for dependency injection.
const ProductServiceMock = ($q) => ({
  getProduct(productId) {
    return $q((resolve) => resolve(productId === product.id ? product : undefined));
  },
});

describe('productName.component', () => {
  let testApp;

  beforeEach(() => {
    testApp = angularTestApp(ProductModule)({
      ProductService: ($q) => ProductServiceMock($q),
    });
  });

  it('should render product name', async () => {
    expect.assertions(1);
    const element = await testApp.render(`<product-name product-id="'${product.id}'" />`);
    expect(element.html()).toContain(product.name);
  });

  it('should render information about missing product', async () => {
    expect.assertions(2);
    const missingId = 'missing-product-id';
    const element = await testApp.render(`<product-name product-id="'${missingId}'" />`);
    expect(element.html()).toContain('Unknown product');
    expect(element.html()).toContain(missingId);
  });
});
