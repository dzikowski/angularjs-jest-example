import angularTestApp from '../../test/angularTestApp';
import CartModule from './cart.module';
import { CartServiceInstant, PriceServiceInstant, ProductServiceInstant, UnitServiceInstant } from '../serviceMocks';

describe('cart.component', () => {
  let testApp;

  beforeEach(() => {
    testApp = angularTestApp(CartModule)({
      CartService: ($q) => CartServiceInstant($q),
      ProductService: ($q) => ProductServiceInstant($q),
      PriceService: ($q) => PriceServiceInstant($q),
      UnitService: ($q) => UnitServiceInstant($q),
    });
  });

  it('should render cart', () => {
    const element = testApp.render('<cart />');
    expect(element).toMatchSnapshot();
  });
});
