import angular from 'angular';
import AppComponent from './app.component';
import CartModule from './cart/cart.module';
import ProductsModule from './products/products.module';

export default angular
  .module('app', [
    CartModule,
    ProductsModule,
  ])
  .component('app', AppComponent)
  .name;
