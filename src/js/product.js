import { setLocalStorage } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  //Since the inital code was just replacing the data in the localStorage as an object. Push an array of object to the localStorage instead. 
  //Create an empty array.
  let toCart = [];

  //Pull the items in the local storage and put them in another array. 
  const cartItems = getLocalStorage("so-cart") || [];

  //Clear the local storage
  localStorage.clear();
  //Push the old items in the cart to the new cart array. Using '...' to loop through each item to be pushed to the object array.
  toCart.push(...cartItems);

  //Push the current product into the cart. 
  toCart.push(product);

  //Save to the localstorage as an object array. 
  setLocalStorage("so-cart", toCart);

}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
