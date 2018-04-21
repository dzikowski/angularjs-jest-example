import angular from 'angular';
import PriceService from './price.service';
import ProductService from './product.service';
import ProductNameComponent from './productName.component';
import ProductPriceComponent from './productPrice.component';
import ProductQuantityComponent from './productQuantity.component';
import ProductUnitComponent from './productUnit.component';
import UnitService from './unit.service';
import UnitShortNameComponent from './unitShortName.component';

export default angular
  .module('app.product', [])
  .service('PriceService', PriceService)
  .service('ProductService', ProductService)
  .service('UnitService', UnitService)
  .component('productName', ProductNameComponent)
  .component('productPrice', ProductPriceComponent)
  .component('productQuantity', ProductQuantityComponent)
  .component('productUnit', ProductUnitComponent)
  .component('unitShortName', UnitShortNameComponent)
  .name;
