export default {
  template: `
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price per unit</th>
        </tr>
      </thead>
      <tbody>
        <tr ng-repeat="item in $ctrl.items">
          <td scope="row">{{ $index + 1 }}</td>
          <td><product-name product-id="item.productId"></product-name></td>
          <td><product-quantity product-id="item.productId" quantity="item.quantity"></product-quantity></td>
          <td><product-price product-id="item.productId"></product-price></td>
        </tr>
      </tbody>
    </table>
  `,
  controller(CartService) {
    this.$onInit = () =>
      CartService.getCart()
        .then((items) => {
          this.items = items;
        });
  },
};
