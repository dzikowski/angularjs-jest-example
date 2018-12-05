import angularTestApp from '../../test/angularTestApp';
import CartModule from './cart.module';
import {
  CartServiceInstant, PriceServiceInstant, ProductServiceInstant, UnitServiceInstant,
} from '../serviceMocks';

describe('cart.component', () => {
  const testAppWithInstants = () => angularTestApp({
    modules: [CartModule],
    mocks: {
      CartService: ($q) => CartServiceInstant($q),
      ProductService: ($q) => ProductServiceInstant($q),
      PriceService: ($q) => PriceServiceInstant($q),
      UnitService: ($q) => UnitServiceInstant($q),
    },
  });

  // this test works because we use $q(), which is synchronous
  it('should render cart', () => {
    const testApp = testAppWithInstants();
    const element = testApp.render('<cart />');
    expect(element).toMatchSnapshot();
  });
});
