import angularTestApp from '../../test/angularTestApp';
import ProductModule from './product.module';

const product = { id: 'P-1', name: 'Copper wire 0.6 mm', unitId: 'U-1' };

const ProductServiceMockPromise = () => ({
  getProduct(productId) {
    return new Promise((resolve) => resolve(productId === product.id ? product : undefined));
  },
});

describe('productName.component', () => {
  let testApp;

  beforeEach(() => {
    testApp = angularTestApp(ProductModule)({ ProductService: ($q) => ProductServiceMockPromise($q) }, '$compile');
  });

  it('should render product name', (done) => {
    const element = testApp.$compile(`<product-name product-id="'${product.id}'" />`)(testApp.$scope);
    Promise.resolve()
      .then(() => {
        testApp.$scope.$digest();
        expect(element.html()).toContain(product.name);
        done();
      });
  });
});
