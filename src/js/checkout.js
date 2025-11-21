import { loadHeaderFooter, initializeCartCount } from "./utils.mjs";
import CheckoutProcess from "./CheckOutProcess.mjs";







const order = new CheckoutProcess("so-cart", ".checkout-summary");
order.init();

// listening for blur on the state and zip inputs to recalculate the order total when they change
document.querySelector("#state")
document.querySelector("#zip")
document.addEventListener("blur", order.calculateOrderTotal.bind(order));

// listening for click on the button
document.querySelector('#checkoutSubmit').addEventListener("click", async (e) => {
    e.preventDefault();

    const myForm = document.forms[0];
    const isValid = myForm.checkValidity();
    myForm.reportValidity();

    if (isValid) {
        try {
            const response = await order.checkout();
            alert("Checkout successful:", response);

            // Redirect to success page
            window.location.href = "../cart/";
        } catch (err) {
            console.error("Checkout error:", err);
            alert("There was a problem with the payment. Please try again.");
        }
    }
});

loadHeaderFooter().then(() => {
  initializeCartCount();
});

