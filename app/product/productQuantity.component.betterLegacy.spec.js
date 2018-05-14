import angularTestApp from '../../test/angularTestApp';
import ProductModule from './product.module';

const product = { id: 'P-1', name: 'Copper wire 0.6 mm', unitId: 'U-1' };
const unit = { id: 'U-1', shortName: 'm' };

const ProductServiceMock = ($q) => ({
  getProduct(productId) {
    return $q((resolve) => resolve(productId === product.id ? product : undefined));
  },
});

const UnitServiceMock = ($q) => ({
  getUnit(unitId) {
    return $q((resolve) => resolve(unitId === unit.id ? unit : undefined));
  },
});

describe('productQuantity.component', () => {
  let testApp;

  beforeEach(() => {
    const mocks = {
      ProductService: ($q) => ProductServiceMock($q),
      UnitService: ($q) => UnitServiceMock($q),
    };
    testApp = angularTestApp(ProductModule)(mocks, '$compile');
  });

  it('should render product name', () => {
    const element = testApp.$compile(`<product-quantity product-id="'${product.id}'" quantity="20" />`)(testApp.$scope);
    testApp.$scope.$digest();
    expect(element.text().replace(/\s/g, '')).toEqual('20.00m');
  });
});
