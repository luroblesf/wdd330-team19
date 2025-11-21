import { alertMessage } from "./utils.mjs";

document
  .querySelector("#checkoutSubmit")
  .addEventListener("click", async (e) => {
    e.preventDefault();

    const form = document.forms["checkout"];
    const cardNumber = form.cardNumber.value.trim();
    const expiration = form.expiration.value.trim();

    const isCardValid = /^\d{16}$/.test(cardNumber);
    const isExpirationValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiration);

    form.reportValidity();

    if (!isCardValid) {
      alertMessage("Your card number must be exactly 16 digits.");
      return;
    }

    if (!isExpirationValid) {
      alertMessage("Expiration date must be in MM/YY format.");
      return;
    }

    if (!form.checkValidity()) {
      alertMessage("Please complete all required fields.");
      return;
    }

    try {
      const response = { status: "ok" }; // Simulación de respuesta exitosa
      console.log("Checkout successful:", response);
      location.href = "/checkoutsuccess.html";
    } catch (err) {
      console.error("Checkout error:", err);
      alertMessage(
        "There was a problem processing your payment. Please try again.",
      );
    }
  });
