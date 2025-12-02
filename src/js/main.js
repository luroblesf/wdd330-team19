// Load header and footer
import {
  loadHeaderFooter,
  incrementCartCount,
  initializeCartCount,
} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter().then(() => {
  initializeCartCount();
});

document.querySelectorAll("#addToCart").forEach((button) => {
  button.addEventListener("click", incrementCartCount);
});

const element = document.querySelector(".product-list");
if (element) {
  const dataSource = new ExternalServices("tents");

  const productList = new ProductList("Tents", dataSource, element);

  productList.init();
}

// Alert messages
import Alert from "./Alert.js";

const alertManager = new Alert();
alertManager.renderAlerts();

document.getElementById("newsletter-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("newsletter-email").value;

  alert(`Thanks for subscribing, ${email}!`);
});