import angularTestApp from '../../test/angularTestApp';
import ProductModule from './product.module';
import { products } from '../dataMocks';
import { ProductServiceDelay200, UnitServiceDelay500 } from '../serviceMocks';

describe('productQuantity.component', () => {
  const [, product] = products;
  const patience = { interval: 200, limit: 10 };

  const testAppWithDelays = () => angularTestApp(ProductModule)({
    ProductService: ($q) => ProductServiceDelay200($q),
    UnitService: ($q) => UnitServiceDelay500($q),
  });

  it('should render product quantity', async () => {
    const testApp = testAppWithDelays();
    const element = testApp.render(`
      <product-name product-id="'${product.id}'"></product-name>
      <product-quantity product-id="'${product.id}'" quantity="20"></product-quantity>
    `);

    const start = new Date().getTime();

    await testApp.eventually(() => {
      const text = element.text().trim().replace(/\s+/g, ' ');
      console.log(`[${new Date().getTime() - start}ms] ${text}`);
      expect(text).toEqual('Pliers 20.00 pcs');
    }, patience);
  });
});
