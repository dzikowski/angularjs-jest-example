import angularTestApp from '../../test/angularTestApp';
import ProductModule from './product.module';
import { products } from '../dataMocks';
import { ProductServiceDelay200, UnitServiceDelay200 } from '../serviceMocks';

const [product] = products;

describe('productQuantity.component', () => {
  let testApp;

  beforeEach(() => {
    testApp = angularTestApp(ProductModule)({
      ProductService: ($q) => ProductServiceDelay200($q),
      UnitService: ($q) => UnitServiceDelay200($q),
    });
  });

  it('should render product quantity', (done) => {
    const patience = { interval: 100, limit: 10 };
    const element = testApp.render(`<product-quantity product-id="'${product.id}'" quantity="20" />`);
    testApp.eventually(() => {
      expect(element.text().replace(/\s/g, '')).toEqual('20.00m');
      done();
    }, patience);
  });
});
