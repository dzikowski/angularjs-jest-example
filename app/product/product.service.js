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
          reject(`Product ${productId} not found.`);
        }
      }, 500);
    });
  }
}
