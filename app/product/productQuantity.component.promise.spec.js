import angularTestApp from '../../test/angularTestApp';
import ProductModule from './product.module';

const product = { id: 'P-1', name: 'Copper wire 0.6 mm', unitId: 'U-1' };
const unit = { id: 'U-1', shortName: 'm' };

const ProductServiceMock = () => ({
  getProduct(productId) {
    return new Promise((resolve) => resolve(productId === product.id ? product : undefined));
  },
});

const UnitServiceMock = () => ({
  getUnit(unitId) {
    return new Promise((resolve) => resolve(unitId === unit.id ? unit : undefined));
  },
});

describe('productQuantity.component', () => {
  let testApp;

  beforeEach(() => {
    const mocks = {
      ProductService: () => ProductServiceMock(),
      UnitService: () => UnitServiceMock(),
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
