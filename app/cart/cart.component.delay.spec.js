import angularTestApp from '../../test/angularTestApp';
import CartModule from './cart.module';
import {
  CartServiceDelay500,
  PriceServiceDelay500,
  ProductServicePromise,
  UnitServiceDelay200,
} from '../serviceMocks';


describe('cart.component', () => {
  const testAppWithDelays = () => angularTestApp(CartModule)({
    CartService: ($q) => CartServiceDelay500($q),
    ProductService: () => ProductServicePromise(),
    PriceService: ($q) => PriceServiceDelay500($q),
    UnitService: ($q) => UnitServiceDelay200($q),
  });

  const patience = { interval: 200, limit: 10 };
  const getText = (element) => element.text().replace(/\s+/g, ' ');
  const sampleRow = '3 Finishing coat 0.25 kg $ 1.99';

  it('should render cart', async () => {
    const testApp = testAppWithDelays();
    const element = testApp.render('<cart />');

    // wait until all information is loaded
    await testApp.eventually(() => expect(getText(element)).toContain(sampleRow), patience);

    expect(element).toMatchSnapshot();
  });
});
