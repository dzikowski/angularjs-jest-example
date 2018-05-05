import { products } from '../dataMocks';

export default class ProductService {
  constructor($q) {
    this.$q = $q;
  }

  getProduct(productId) {
    return this.$q((resolve, reject) => {
      setTimeout(() => {
        const found = products.find((p) => p.id === productId);
        if (found) {
          resolve(found);
        } else {
          reject(ProductService.notFound(productId));
        }
      }, 500);
    });
  }
}

ProductService.notFound = (productId) =>
  `Product ${productId} not found.`;
