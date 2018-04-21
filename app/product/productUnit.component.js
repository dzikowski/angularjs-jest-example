export default {
  template: '<unit-short-name unit-id=$ctrl.unitId />',
  controller(ProductService) {
    this.$onChanges = () =>
      ProductService.getProduct(this.productId)
        .then((product) => {
          this.unitId = product && product.unitId;
        });
  },
  bindings: {
    productId: '<',
  },
};
