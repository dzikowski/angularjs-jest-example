import { items } from '../dataMocks';

export default class CartService {
  constructor($q) {
    this.$q = $q;
  }

  getCart() {
    return this.$q((resolve) => {
      setTimeout(() => {
        resolve(items);
      }, 500);
    });
  }
}
