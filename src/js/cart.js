import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  //The initial code was just an object. With the update of the 'addtoCart', local storage now holds an array of object which is essential for the map function to work.
  //Get array objective from local storage.
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  //Add click listener for all "Remove" buttons after rendering the cart items
  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((btn) =>
    btn.addEventListener("click", removeItemFromCart),
  );
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button type="button" class="remove-button" data-id=${item.Id}>Remove</button>
</li>`;

  return newItem;
}

function removeItemFromCart(event) {
  //Identify which product was clicked
  const productId = event.target.dataset.id;

  const listItem = event.target.closest(".cart-card");

  listItem.classList.add("removing");
  setTimeout(() => {
    //Get current items
    let cartItems = getLocalStorage("so-cart") || [];

    //Find the index of the item to remove
    const itemIndex = cartItems.findIndex((item) => item.Id === productId);

    if (itemIndex !== -1) {
      cartItems.splice(itemIndex, 1);
    }

    //Save the new cart Items array back to local storage
    setLocalStorage("so-cart", cartItems);

    //Render new Cart Contents
    renderCartContents();
  }, 200);
}

renderCartContents();
