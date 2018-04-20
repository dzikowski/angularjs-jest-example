import angular from 'angular';
import ProductsModule from '../products/products.module';
import CartComponent from './cart.component';
import CartService from './cart.service';

export default angular
  .module('app.cart', [ProductsModule])
  .component('cart', CartComponent)
  .service('CartService', CartService)
  .name;
