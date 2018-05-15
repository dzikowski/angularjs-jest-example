import angularTestApp from '../../test/angularTestApp';
import ProductModule from './product.module';
import { products } from '../dataMocks';

const [product] = products;

const ProductServicePromise = () => ({
  getProduct(productId) {
    return new Promise((resolve) => resolve(productId === product.id ? product : undefined));
  },
});

describe('productName.component', () => {
  let testApp;

  beforeEach(() => {
    testApp = angularTestApp(ProductModule)({ ProductService: () => ProductServicePromise() }, '$compile');
  });

  it('should render product name', () => {
    const element = testApp.$compile(`<product-name product-id="'${product.id}'" />`)(testApp.$scope);
    expect.assertions(1);
    Promise.resolve()
      .then(() => {
        testApp.$scope.$digest();
        expect(element.html()).toContain(product.name);
      });
  });
});
