import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");

const elementList = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSource, elementList);

productList.init();


function incrementCartCount() {
  const cartCountElement = document.querySelector(".cart-count");

  if (cartCountElement) {
    let currentCount = parseInt(localStorage.getItem("cartCount")) || 0;
    currentCount += 1;
    localStorage.setItem("cartCount", currentCount);
    cartCountElement.textContent = currentCount;
  }
}

// Initialize cart count on page load
function initializeCartCount() {
  const cartCountElement = document.querySelector(".cart-count");
  if (cartCountElement) {
    const savedCount = parseInt(localStorage.getItem("cartCount")) || 0;
    cartCountElement.textContent = savedCount;
  }
}

document.querySelectorAll("#addToCart").forEach((button) => {
  button.addEventListener("click", incrementCartCount);
});

initializeCartCount();