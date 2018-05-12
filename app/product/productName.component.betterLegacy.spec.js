import angularTestApp from '../../test/angularTestApp';
import ProductModule from './product.module';

const product = { id: 'P-1', name: 'Copper wire 0.6 mm', unitId: 'U-1' };

const ProductServiceMock = ($q) => ({
  getProduct(productId) {
    return $q((resolve) => resolve(productId === product.id ? product : undefined));
  },
});

describe('productName.component', () => {
  let testApp;

  beforeEach(() => {
    testApp = angularTestApp(ProductModule)({ ProductService: ($q) => ProductServiceMock($q) }, '$compile');
  });

  it('should render product name', () => {
    const element = testApp.$compile(`<product-name product-id="'${product.id}'" />`)(testApp.$scope);
    testApp.$scope.$digest();
    expect(element.html()).toContain(product.name);
  });

  it('should render information about missing product', () => {
    const missingId = 'missing-product-id';
    const element = testApp.$compile(`<product-name product-id="'${missingId}'" />`)(testApp.$scope);
    testApp.$scope.$digest();

    expect(element.html()).toContain('Unknown product');
    expect(element.html()).toContain(missingId);
  });
});
