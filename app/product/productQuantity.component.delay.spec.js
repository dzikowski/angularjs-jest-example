import angularTestApp from '../../test/angularTestApp';
import ProductModule from './product.module';

const product = { id: 'P-1', name: 'Copper wire 0.6 mm', unitId: 'U-1' };
const unit = { id: 'U-1', shortName: 'm' };

const ProductServiceMock = () => ({
  getProduct(productId) {
    return new Promise((resolve) => setTimeout(() => resolve(productId === product.id ? product : undefined), 200));
  },
});

const UnitServiceMock = () => ({
  getUnit(unitId) {
    return new Promise((resolve) => setTimeout(() => resolve(unitId === unit.id ? unit : undefined), 200));
  },
});

describe('productQuantity.component', () => {
  let testApp;

  beforeEach(() => {
    testApp = angularTestApp(ProductModule)({
      ProductService: () => ProductServiceMock(),
      UnitService: () => UnitServiceMock(),
    });
  });

  it('should render product quantity', (done) => {
    const patience = { interval: 100, limit: 10 };
    const element = testApp.render(`<product-quantity product-id="'${product.id}'" quantity="20" />`);
    testApp.eventually(() => {
      expect(element.normalizedText()).toEqual('20.00 m');
      done();
    }, patience);
  });
});
