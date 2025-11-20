import { loadHeaderFooter } from "./utils.mjs";
import { CheckoutProcess } from "./CheckOutProcess.mjs";

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", ".checkout-summary");
order.init();

// listening for blur on the state and zip inputs to recalculate the order total when they change
document.querySelector("#state")
document.querySelector("#zip")
document.addEventListener("blur", order.calculateOrderTotal.bind(order));

// listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();
    order.checkout();
});