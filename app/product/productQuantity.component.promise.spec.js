import angularTestApp from '../../test/angularTestApp';
import ProductModule from './product.module';
import { products, units } from '../dataMocks';

const [product] = products;

const ProductServicePromise = () => ({
  getProduct(productId) {
    return new Promise((resolve) => resolve(productId === product.id ? product : undefined));
  },
});

const UnitServicePromise = () => ({
  getUnit(unitId) {
    return new Promise((resolve) => resolve(units.find((u) => u.id === unitId)));
  },
});

describe('productQuantity.component', () => {
  let testApp;

  beforeEach(() => {
    const mocks = {
      ProductService: () => ProductServicePromise(),
      UnitService: () => UnitServicePromise(),
    };
    testApp = angularTestApp(ProductModule)(mocks, '$compile');
  });

  it('should render product quantity', (done) => {
    const element = testApp.$compile(`<product-quantity product-id="'${product.id}'" quantity="20" />`)(testApp.$scope);
    Promise.resolve()
      .then(() => {
        testApp.$scope.$digest();
      })
      .then(() => {
        testApp.$scope.$digest();
        expect(element.text().replace(/\s/g, '')).toEqual('20.00m');
        done();
      });
  });
});
