import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

listing.init();

// Search functionality//

document.getElementById("search-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = document
    .getElementById("search-input")
    .value.trim()
    .toLowerCase();
  const titleSpan = document.querySelector(".title");

  if (!query) return;

  const allProducts = await dataSource.getData(category);

  const filteredProducts = allProducts.filter(
    (product) =>
      product.NameWithoutBrand.toLowerCase().includes(query) ||
      product.Brand.Name.toLowerCase().includes(query),
  );

  listing.listElement.innerHTML = "";

  titleSpan.textContent = `Results for "${query}"`;

  if (filteredProducts.length > 0) {
    listing.renderList(filteredProducts);
  } else {
    listing.listElement.innerHTML = `<li>No products found matching "${query}".</li>`;
  }
});
