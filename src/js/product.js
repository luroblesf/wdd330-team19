<<<<<<< HEAD
import { setLocalStorage } from './utils.mjs';
import ProductData from './ProductData.mjs';
=======
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
>>>>>>> f80d7cf2fb46dd6ca0b5b1871e79122f90b3e076

const dataSource = new ProductData('tents');

function addProductToCart(product) {
<<<<<<< HEAD
  setLocalStorage('so-cart', product);
=======
  let cartItems = getLocalStorage("so-cart");
  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
>>>>>>> f80d7cf2fb46dd6ca0b5b1871e79122f90b3e076
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
