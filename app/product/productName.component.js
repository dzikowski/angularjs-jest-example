export default {
  template: `
    <span ng-if="$ctrl.name">{{ $ctrl.name }}</span>
    <span ng-if="!$ctrl.name">Unknown product <span class="text-muted">({{ $ctrl.productId }})</span></span>
  `,
  controller(ProductService) {
    this.$onChanges = () =>
      ProductService.getProduct(this.productId)
        .then((product) => {
          console.log(product)
          this.name = product && product.name;
        })
        .catch((e) => {
          console.log('err', e)
          this.name = undefined;
        });
  },
  bindings: {
    productId: '<',
  },
};
