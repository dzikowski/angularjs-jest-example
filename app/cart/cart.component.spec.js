import angularTestApp from '../../test/angularTestApp';
import CartModule from './cart.module';
import { items } from '../dataMocks';


const CartServiceMock = ($q) => ({
  getCart() {
    return $q((resolve) => resolve(items));
  },
});

describe('cart.component', () => {
  let testApp;

  beforeEach(() => {
    testApp = angularTestApp(CartModule)({
      CartService: ($q) => CartServiceMock($q),
      // TODO other mocks
    });
  });

  it('should render cart', () => {
    const element = testApp.render('<cart />');
    expect(element.html()).toMatchSnapshot();
  });
});
