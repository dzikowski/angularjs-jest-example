import angular from 'angular';
import 'angular-mocks';
import ProductModule from './product.module';

const product = { id: 'P-1', name: 'Copper wire 0.6 mm', unitId: 'U-1' };

const ProductServiceMock = ($q) => ({
  getProduct(productId) {
    return $q((resolve) => resolve(productId === product.id ? product : undefined));
  },
});

describe('productName.component', () => {
  let scope;
  let compile;

  beforeEach(() => {
    angular.mock.module(ProductModule);

    angular.mock.module(($provide) => {
      $provide.factory('ProductService', ($q) => ProductServiceMock($q));
    });

    angular.mock.inject(($rootScope, $compile) => {
      scope = $rootScope.$new();
      compile = $compile;
    });
  });

  it('should render product name', () => {
    for (let i = 0; i < 20; i++) {
      const element = compile(`<product-name product-id="'${product.id}'" />`)(scope);
      scope.$digest();
      expect(element.html()).toContain(product.name);
    }
  });

  it('should render information about missing product', () => {
    const missingId = 'missing-product-id';
    const element = compile(`<product-name product-id="'${missingId}'" />`)(scope);
    scope.$digest();

    expect(element.html()).toContain('Unknown product');
    expect(element.html()).toContain(missingId);
  });
});
