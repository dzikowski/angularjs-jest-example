import { prices } from '../dataMocks';

export default class UnitService {
  constructor($q) {
    this.$q = $q;
  }

  getPrice(productId) {
    return this.$q((resolve, reject) => {
      setTimeout(() => {
        const found = prices.find((p) => p.productId === productId);
        if (found) {
          resolve(found.price);
        } else {
          reject(`Price for product ${productId} not found.`);
        }
      }, 500);
    });
  }
}
