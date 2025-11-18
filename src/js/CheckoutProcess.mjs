import { getLocalStorage } from "../utils.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
        // calculate and display the total dollar amount of the items in the cart, and the number of items.

    let subtotal = 0;

    this.list.forEach(item => {
      subtotal += item.FinalPrice * item.quantity; 
    });

    this.itemTotal = subtotal;

    const subtotalEl = document.querySelector(`${this.outputSelector} #subtotal`);
    if (subtotalEl) {
      subtotalEl.innerText = `$${subtotal.toFixed(2)}`;
    }
  }

  calculateOrderTotal() {
    // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
    const itemCount = this.list.reduce((sum, item) => sum + item.quantity, 0);
    this.tax = this.itemTotal * 0.06;
    this.shipping = 10 + (itemCount - 1) * 2;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    
    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
 // once the totals are all calculated display them in the order summary page

    const tax = base.querySelector("#tax");
    const shipping = base.querySelector("#shipping");
    const orderTotal = base.querySelector("#orderTotal");

    tax.innerText = `$${this.tax.toFixed(2)}`;
    shipping.innerText = `$${this.shipping.toFixed(2)}`;
    orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
  }
}
