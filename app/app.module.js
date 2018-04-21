import angular from 'angular';
import AppComponent from './app.component';
import CartModule from './cart/cart.module';
import ProductModule from './product/product.module';

export default angular
  .module('app', [
    CartModule,
    ProductModule,
  ])
  .component('app', AppComponent)
  .name;