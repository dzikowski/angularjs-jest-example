import angularTestApp from '../../test/angularTestApp';
import ProductModule from './product.module';
import ProductService from './product.service';

const product = { id: 'P-1', name: 'Copper wire 0.6 mm', unitId: 'U-1' };

const ProductServiceMock = ($q) => ({
  getProduct: (productId) => $q((resolve, reject) => {
    if (productId === product.id) {
      resolve(product);
    } else {
      reject(ProductService.notFound(productId));
    }
  }),
});

describe('productName.component', () => {
  let testApp;

  beforeEach(() => {
    testApp = angularTestApp(ProductModule)({ ProductService: ProductServiceMock });
  });

  it('should render product name', (done) => {
    testApp
      .render(`<product-name product-id="'${product.id}'" />`)
      .then((element) => {
        expect(element.html()).toContain(product.name);
        done();
      });
  });

  it('should render information about missing product', (done) => {
    const missingId = 'missing-product-id';
    testApp
      .render(`<product-name product-id="'${missingId}'" />`)
      .then((element) => {
        expect(element.html()).toContain('Unknown product');
        expect(element.html()).toContain(missingId);
        done();
      });
  });
});
