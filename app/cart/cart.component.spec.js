import angularTestApp from '../../test/angularTestApp';
import CartModule from './cart.module';
import { items, products, units } from '../dataMocks';

const CartServiceMock = ($q) => ({
  getCart() {
    return $q((resolve) => resolve(items));
  },
});

const ProductServiceMock = ($q) => ({
  getProduct(productId) {
    return $q((resolve) => resolve(products.find((p) => p.id === productId)));
  },
});

const UnitServiceMock = ($q) => ({
  getUnit(unitId) {
    return $q((resolve) => resolve(units.find((u) => u.id === unitId)));
  },
});

describe('cart.component', () => {
  let testApp;

  beforeEach(() => {
    testApp = angularTestApp(CartModule)({
      CartService: ($q) => CartServiceMock($q),
      ProductService: ($q) => ProductServiceMock($q),
      UnitService: ($q) => UnitServiceMock($q),
    });
  });

  it('should render cart', () => {
    const element = testApp.render('<cart />');
    expect(element).toMatchSnapshot();
  });
});
