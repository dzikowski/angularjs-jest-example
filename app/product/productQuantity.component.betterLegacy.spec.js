import angularTestApp from '../../test/angularTestApp';
import ProductModule from './product.module';
import { ProductServiceInstant, UnitServiceInstant } from '../serviceMocks';
import { products } from '../dataMocks';

const [product] = products;

describe('productQuantity.component', () => {
  let testApp;

  beforeEach(() => {
    const mocks = {
      ProductService: ($q) => ProductServiceInstant($q),
      UnitService: ($q) => UnitServiceInstant($q),
    };
    testApp = angularTestApp(ProductModule)(mocks, '$compile');
  });

  it('should render product name', () => {
    const element = testApp.$compile(`<product-quantity product-id="'${product.id}'" quantity="20" />`)(testApp.$scope);
    testApp.$scope.$digest();
    expect(element.text().replace(/\s/g, '')).toEqual('20.00m');
  });
});
