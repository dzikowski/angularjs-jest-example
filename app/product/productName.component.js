export default {
  template: '{{ $ctrl.name || $ctrl.productId }}',
  controller(ProductService) {
    this.$onChanges = () =>
      ProductService.getProduct(this.productId)
        .then((product) => {
          this.name = product && product.name;
        });
  },
  bindings: {
    productId: '<',
  },
};
