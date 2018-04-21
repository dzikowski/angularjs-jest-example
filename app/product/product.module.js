import angular from 'angular';
import ProductService from './product.service';
import ProductNameComponent from './productName.component';

export default angular
  .module('app.product', [])
  .service('ProductService', ProductService)
  .component('productName', ProductNameComponent)
  .name;
