import angularTestApp from '../../test/angularTestApp';
import ProductModule from './product.module';
import { ProductServiceInstant } from '../serviceMocks';
import { products } from '../dataMocks';

describe('productName.component', () => {
  const [product] = products;
  let testApp;

  beforeEach(() => {
    testApp = angularTestApp(ProductModule)({ ProductService: ($q) => ProductServiceInstant($q) });
  });

  it('should render product name', () => {
    const element = testApp.render(`<product-name product-id="'${product.id}'" />`);
    expect(element.html()).toContain(product.name);
  });

  it('should render information about missing product', () => {
    const missingId = 'missing-product-id';
    const element = testApp.render(`<product-name product-id="'${missingId}'" />`);
    expect(element.html()).toContain('Unknown product');
    expect(element.html()).toContain(missingId);
  });
});
