import {
  getLocalStorage,
  loadHeaderFooter,
  incrementCartCount,
  initializeCartCount,
  setLocalStorage,
} from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  if (!cartItems || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = `
      <li class="cart-card empty">
        <p>Your cart is empty.</p>
      </li>`;

    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  //Add click listener for all "Remove" buttons after rendering the cart items
  const removeButton = document.querySelectorAll(".remove-button");
  removeButton.forEach((button) =>
    button.addEventListener("click", removeItemFromCart),
  );
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimaryLarge}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">Quantity: ${item.Quantity}</p>
    <p class="cart-card__price">${item.FinalPrice}</p>
    <button type="button" class="remove-button" data-id=${item.Id}>🗑️</button>
  </li>`;
}

//Remove Button Function
function removeItemFromCart(event) {
  //Identify which product was clicked
  const productId = event.target.dataset.id;

  const listItem = event.target.closest(".cart-card");

  listItem.classList.add("removing");
  setTimeout(() => {
    //Get current Items
    let cartItems = getLocalStorage("so-cart") || [];

    //Find the index of the item to remove
    const items = cartItems.find((item) => item.Id === productId);

    if (items) {
      if (items.Quantity > 1) {
        items.Quantity--;
      } else {
        cartItems = cartItems.filter((cartItem) => cartItem.Id !== productId);
      }
    }

    setLocalStorage("so-cart", cartItems);
    incrementCartCount();
    updateCartTotal();
    renderCartContents();
  }, 300);
}

function updateCartTotal() {
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotalElement = document.querySelector(".cart-total");
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];

  if (cartItems.length > 0) {
    cartFooter.classList.remove("hide");

    const total = cartItems.reduce(
      (sum, item) => sum + item.FinalPrice * item.Quantity,
      0,
    );
    cartTotalElement.innerHTML = `Total: $${total.toFixed(2)}`;
  } else {
    cartFooter.classList.add("hide");
  }
}

renderCartContents();
updateCartTotal();
loadHeaderFooter().then(() => {
  initializeCartCount();
});
