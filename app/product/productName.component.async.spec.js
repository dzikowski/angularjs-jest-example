import angularTestApp from '../../test/angularTestApp';
import ProductModule from './product.module';
import { products } from '../dataMocks';

const [product] = products;

// works
const ProductServiceMock = ($q) => ({
  getProduct(productId) {
    return $q((resolve) => resolve(productId === product.id ? product : undefined));
  },
});

// does not work -- setTimeout escapes event loop
const ProductServiceMock2 = ($q) => ({ // eslint-disable-line no-unused-vars
  getProduct(productId) {
    return $q((resolve) => setTimeout(() => resolve(productId === product.id ? product : undefined)));
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
});
