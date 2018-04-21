import angular from 'angular';
import ProductModule from '../product/product.module';
import CartComponent from './cart.component';
import CartService from './cart.service';

export default angular
  .module('app.cart', [ProductModule])
  .component('cart', CartComponent)
  .service('CartService', CartService)
  .name;
